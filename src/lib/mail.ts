import nodemailer from "nodemailer";
import type { EnquiryInput } from "@/lib/validations/enquiry";
import { siteConfig } from "@/lib/site-config";

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error("Missing SMTP environment variables");
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

export async function sendEnquiryEmail(data: EnquiryInput) {
  const transporter = getTransporter();
  const toEmail = process.env.ENQUIRY_TO_EMAIL || siteConfig.email;

  // Clean phone number for tel: and wa.me links
  const digitsOnly = data.phone.replace(/\D/g, "");
  const formattedPhone = digitsOnly.length === 10 ? `91${digitsOnly}` : digitsOnly;
  const whatsappMsg = encodeURIComponent(
    `Namaste ${data.name}! Thank you for enquiring with Shree Mahadev Travels Ujjain regarding your trip from ${data.pickupLocation} to ${data.dropLocation} on ${data.travelDate}. We are happy to help you with the best rates.`
  );

  const subject = `🚖 NEW TAXI ENQUIRY: ${data.name} (${data.pickupLocation} ➔ ${data.dropLocation})`;

  const adminHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Booking Enquiry</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; padding: 20px 10px;">
      <tr>
        <td align="center">
          <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #1e293b; border-radius: 16px; overflow: hidden; border: 1px solid #334155; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
            
            <!-- HEADER BANNER -->
            <tr>
              <td style="background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%); padding: 25px 30px; text-align: center;">
                <h1 style="margin: 0; color: #0f172a; font-size: 22px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">
                  Shree Mahadev Travels Ujjain
                </h1>
                <p style="margin: 5px 0 0 0; color: #1e293b; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">
                  🚖 New Booking Enquiry Received
                </p>
              </td>
            </tr>

            <!-- CONTENT BODY -->
            <tr>
              <td style="padding: 30px 25px;">
                
                <!-- ROUTE CARD -->
                <div style="background-color: #0f172a; border-radius: 12px; padding: 18px 20px; border: 1px solid #334155; margin-bottom: 25px;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 6px;">
                        Trip Route
                      </td>
                    </tr>
                    <tr>
                      <td style="color: #f8fafc; font-size: 17px; font-weight: 800; line-height: 1.4;">
                        📍 <span style="color: #eab308;">${data.pickupLocation}</span> 
                        <span style="color: #64748b; margin: 0 8px;">➔</span> 
                        🏁 <span style="color: #38bdf8;">${data.dropLocation}</span>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- CUSTOMER INFO SECTION -->
                <h3 style="margin: 0 0 12px 0; color: #eab308; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
                  👤 Customer Contact Details
                </h3>
                <table width="100%" border="0" cellspacing="0" cellpadding="8" style="background-color: #334155; border-radius: 10px; margin-bottom: 25px; border-collapse: collapse; font-size: 14px; color: #f1f5f9;">
                  <tr>
                    <td width="35%" style="color: #94a3b8; font-weight: 600; border-bottom: 1px solid #475569;">Name</td>
                    <td style="color: #ffffff; font-weight: 700; border-bottom: 1px solid #475569;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; font-weight: 600; border-bottom: 1px solid #475569;">Mobile Number</td>
                    <td style="color: #ffffff; font-weight: 700; border-bottom: 1px solid #475569;">
                      <a href="tel:${data.phone}" style="color: #38bdf8; text-decoration: none;">📞 ${data.phone}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; font-weight: 600;">Email Address</td>
                    <td style="color: #ffffff; font-weight: 600;">
                      ${data.email ? `<a href="mailto:${data.email}" style="color: #38bdf8; text-decoration: none;">✉️ ${data.email}</a>` : '<span style="color: #64748b;">Not provided</span>'}
                    </td>
                  </tr>
                </table>

                <!-- TRIP DETAILS TABLE -->
                <h3 style="margin: 0 0 12px 0; color: #eab308; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
                  📋 Travel Specifications
                </h3>
                <table width="100%" border="0" cellspacing="0" cellpadding="8" style="background-color: #334155; border-radius: 10px; margin-bottom: 25px; border-collapse: collapse; font-size: 14px; color: #f1f5f9;">
                  <tr>
                    <td width="35%" style="color: #94a3b8; font-weight: 600; border-bottom: 1px solid #475569;">Travel Date</td>
                    <td style="color: #ffffff; font-weight: 700; border-bottom: 1px solid #475569;">📅 ${data.travelDate}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; font-weight: 600; border-bottom: 1px solid #475569;">Travel Time</td>
                    <td style="color: #ffffff; font-weight: 700; border-bottom: 1px solid #475569;">⏰ ${data.travelTime || 'Flexible / As per schedule'}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; font-weight: 600; border-bottom: 1px solid #475569;">Trip Type</td>
                    <td style="color: #ffffff; font-weight: 700; border-bottom: 1px solid #475569;">🚗 ${data.tripType}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; font-weight: 600; border-bottom: 1px solid #475569;">Vehicle Requested</td>
                    <td style="color: #eab308; font-weight: 800; border-bottom: 1px solid #475569;">🚘 ${data.carType}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; font-weight: 600; vertical-align: top;">Additional Message</td>
                    <td style="color: #cbd5e1; font-weight: 500; leading-height: 1.5;">${data.message || 'No additional notes'}</td>
                  </tr>
                </table>

                <!-- ACTION BUTTONS FOR DRIVER / OWNER -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 25px;">
                  <tr>
                    <td align="center">
                      <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="border-radius: 8px; background-color: #22c55e; padding: 12px 20px; text-align: center; margin-right: 10px; display: inline-block;">
                            <a href="tel:${data.phone}" target="_blank" style="color: #ffffff; font-size: 14px; font-weight: 800; text-decoration: none; display: inline-block;">
                              📞 Call Customer
                            </a>
                          </td>
                          <td width="10"></td>
                          <td style="border-radius: 8px; background-color: #25D366; padding: 12px 20px; text-align: center; display: inline-block;">
                            <a href="https://wa.me/${formattedPhone}?text=${whatsappMsg}" target="_blank" style="color: #ffffff; font-size: 14px; font-weight: 800; text-decoration: none; display: inline-block;">
                              💬 WhatsApp Customer
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background-color: #0f172a; padding: 18px 25px; text-align: center; border-top: 1px solid #334155; color: #64748b; font-size: 12px;">
                Sent automatically via <strong>${siteConfig.name}</strong> Website Enquiry Form.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  // Send main notification email to travel operator
  await transporter.sendMail({
    from: `"${siteConfig.name} Enquiry" <${process.env.SMTP_USER}>`,
    to: toEmail,
    replyTo: data.email || undefined,
    subject,
    html: adminHtml,
  });

  // Optional: Send auto-acknowledgement receipt email to customer if email address was provided
  if (data.email) {
    const customerHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: sans-serif;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding: 20px;">
        <tr>
          <td align="center">
            <table width="100%" max-width="560" style="max-width: 560px; background-color: #ffffff; border-radius: 12px; padding: 25px; border: 1px solid #e2e8f0;">
              <h2 style="color: #0f172a; margin-top: 0;">Namaste ${data.name}!</h2>
              <p style="color: #334155; font-size: 15px; line-height: 1.6;">
                Thank you for contacting <strong>${siteConfig.name}</strong>! We have received your booking enquiry for traveling from <strong>${data.pickupLocation}</strong> to <strong>${data.dropLocation}</strong> on <strong>${data.travelDate}</strong>.
              </p>
              <p style="color: #334155; font-size: 15px; line-height: 1.6;">
                Our team is reviewing your route and cab preferences (${data.carType}). We will call or WhatsApp you shortly on <strong>${data.phone}</strong> with the exact fare and details.
              </p>
              <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px; color: #475569;">
                  Need urgent confirmation? Feel free to call us anytime at 
                  <a href="tel:${siteConfig.phones[0]}" style="color: #d97706; font-weight: bold; text-decoration: none;">${siteConfig.phonesDisplay[0]}</a> or 
                  <a href="tel:${siteConfig.phones[1]}" style="color: #d97706; font-weight: bold; text-decoration: none;">${siteConfig.phonesDisplay[1]}</a>.
                </p>
              </div>
              <p style="color: #64748b; font-size: 13px; margin-bottom: 0;">Warm regards,<br><strong>Shree Mahadev Travels Ujjain Team</strong></p>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    try {
      await transporter.sendMail({
        from: `"${siteConfig.name}" <${process.env.SMTP_USER}>`,
        to: data.email,
        subject: `Taxi Booking Received - ${siteConfig.name}`,
        html: customerHtml,
      });
    } catch (custErr) {
      console.error("Failed to send customer confirmation email:", custErr);
    }
  }
}
