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
    `Namaste ${data.name}! Thank you for your enquiry with Shree Mahadev Travels Ujjain for traveling from ${data.pickupLocation} to ${data.dropLocation} on ${data.travelDate}. We are happy to help you with your cab booking.`
  );

  const subject = `🚨 NEW TAXI ENQUIRY: ${data.name} (${data.pickupLocation} ➔ ${data.dropLocation})`;

  const adminHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Booking Enquiry</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; padding: 25px 10px;">
      <tr>
        <td align="center">
          <table width="100%" max-width="620" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; background-color: #1e293b; border-radius: 16px; overflow: hidden; border: 1px solid #334155; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
            
            <!-- TOP BRAND HEADER -->
            <tr>
              <td style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 25px 30px; text-align: center;">
                <h1 style="margin: 0; color: #0f172a; font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">
                  Shree Mahadev Travels Ujjain
                </h1>
                <div style="display: inline-block; margin-top: 8px; background-color: #0f172a; color: #fef08a; font-size: 12px; font-weight: 800; padding: 4px 14px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1.5px;">
                  🚨 NEW ENQUIRY RECEIVED
                </div>
              </td>
            </tr>

            <!-- MAIN BODY -->
            <tr>
              <td style="padding: 30px 25px;">
                
                <!-- ROUTE HIGHLIGHT BOX -->
                <div style="background-color: #0f172a; border-radius: 12px; padding: 20px; border: 1px solid #334155; margin-bottom: 25px;">
                  <div style="color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                    🚖 TRAVEL ROUTE DETAILS
                  </div>
                  <div style="color: #f8fafc; font-size: 18px; font-weight: 800; line-height: 1.4;">
                    📍 <span style="color: #fac710;">${data.pickupLocation}</span>
                    <span style="color: #64748b; margin: 0 10px;">➔</span>
                    🏁 <span style="color: #38bdf8;">${data.dropLocation}</span>
                  </div>
                </div>

                <!-- CUSTOMER INFORMATION TABLE -->
                <h3 style="margin: 0 0 12px 0; color: #fac710; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
                  👤 CUSTOMER INFORMATION
                </h3>
                <table width="100%" border="0" cellspacing="0" cellpadding="10" style="background-color: #0f172a; border-radius: 10px; margin-bottom: 25px; border: 1px solid #334155; font-size: 14px; color: #f1f5f9;">
                  <tr>
                    <td width="35%" style="color: #94a3b8; font-weight: 600; border-bottom: 1px solid #1e293b;">Customer Name</td>
                    <td style="color: #ffffff; font-weight: 800; font-size: 15px; border-bottom: 1px solid #1e293b;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; font-weight: 600; border-bottom: 1px solid #1e293b;">Mobile Number</td>
                    <td style="color: #ffffff; font-weight: 800; border-bottom: 1px solid #1e293b;">
                      <a href="tel:${data.phone}" style="color: #38bdf8; text-decoration: none; font-size: 16px;">📞 ${data.phone}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; font-weight: 600;">Email Address</td>
                    <td style="color: #ffffff; font-weight: 600;">
                      ${data.email ? `<a href="mailto:${data.email}" style="color: #38bdf8; text-decoration: none;">✉️ ${data.email}</a>` : '<span style="color: #64748b;">Not provided</span>'}
                    </td>
                  </tr>
                </table>

                <!-- TRIP SPECIFICATIONS TABLE -->
                <h3 style="margin: 0 0 12px 0; color: #fac710; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
                  📋 TRIP SPECIFICATIONS
                </h3>
                <table width="100%" border="0" cellspacing="0" cellpadding="10" style="background-color: #0f172a; border-radius: 10px; margin-bottom: 25px; border: 1px solid #334155; font-size: 14px; color: #f1f5f9;">
                  <tr>
                    <td width="35%" style="color: #94a3b8; font-weight: 600; border-bottom: 1px solid #1e293b;">Travel Date</td>
                    <td style="color: #ffffff; font-weight: 800; border-bottom: 1px solid #1e293b;">📅 ${data.travelDate}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; font-weight: 600; border-bottom: 1px solid #1e293b;">Travel Time</td>
                    <td style="color: #ffffff; font-weight: 800; border-bottom: 1px solid #1e293b;">⏰ ${data.travelTime || 'Flexible / As per schedule'}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; font-weight: 600; border-bottom: 1px solid #1e293b;">Trip Type</td>
                    <td style="color: #ffffff; font-weight: 800; border-bottom: 1px solid #1e293b;">🚘 ${data.tripType}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; font-weight: 600; border-bottom: 1px solid #1e293b;">Vehicle Preference</td>
                    <td style="color: #fac710; font-weight: 900; font-size: 15px; border-bottom: 1px solid #1e293b;">🏎️ ${data.carType}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; font-weight: 600; vertical-align: top;">Customer Requirements</td>
                    <td style="color: #cbd5e1; font-weight: 500; line-height: 1.5;">${data.message || 'No extra requirements specified.'}</td>
                  </tr>
                </table>

                <!-- ONE CLICK ACTION BUTTONS -->
                <div style="text-align: center; margin-top: 30px;">
                  <a href="tel:${data.phone}" target="_blank" style="display: inline-block; background-color: #22c55e; color: #ffffff; font-size: 15px; font-weight: 800; padding: 14px 24px; border-radius: 10px; text-decoration: none; margin-right: 8px; margin-bottom: 8px;">
                    📞 CALL CUSTOMER NOW
                  </a>
                  <a href="https://wa.me/${formattedPhone}?text=${whatsappMsg}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; font-size: 15px; font-weight: 800; padding: 14px 24px; border-radius: 10px; text-decoration: none; margin-bottom: 8px;">
                    💬 WHATSAPP CUSTOMER NOW
                  </a>
                </div>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background-color: #0f172a; padding: 16px 25px; text-align: center; border-top: 1px solid #334155; color: #64748b; font-size: 12px;">
                Instant Notification sent from <strong>${siteConfig.name}</strong> Website.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  // Send primary notification email to travel agency client
  await transporter.sendMail({
    from: `"${siteConfig.name} Website" <${process.env.SMTP_USER}>`,
    to: toEmail,
    replyTo: data.email || undefined,
    subject,
    html: adminHtml,
  });

  // Only send auto-acknowledgement email to customer if customer email is provided AND different from client email
  if (data.email && data.email.trim().toLowerCase() !== toEmail.trim().toLowerCase()) {
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
