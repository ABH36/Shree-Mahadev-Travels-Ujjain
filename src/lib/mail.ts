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

/**
 * Capitalizes the first letter of each word in a string (Title Case).
 */
function toTitleCase(str: string): string {
  if (!str) return "";
  return str
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Formats YYYY-MM-DD or ISO date strings to DD/MM/YYYY format.
 */
function formatDate(dateStr: string): string {
  if (!dateStr) return "-";
  const trimmed = dateStr.trim();
  
  // Check if format is YYYY-MM-DD
  const ymdMatch = trimmed.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
  if (ymdMatch) {
    const [, yyyy, mm, dd] = ymdMatch;
    return `${dd.padStart(2, "0")}/${mm.padStart(2, "0")}/${yyyy}`;
  }

  // Check if format is already DD/MM/YYYY
  const dmyMatch = trimmed.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (dmyMatch) {
    const [, dd, mm, yyyy] = dmyMatch;
    return `${dd.padStart(2, "0")}/${mm.padStart(2, "0")}/${yyyy}`;
  }

  return trimmed;
}

/**
 * Formats 24-hour time strings (HH:mm) into 12-hour AM/PM format.
 */
function formatTime(timeStr?: string): string {
  if (!timeStr || !timeStr.trim()) return "Flexible / Unspecified";
  const trimmed = timeStr.trim();

  // If already contains AM/PM, format cleanly
  if (/am|pm/i.test(trimmed)) {
    return trimmed.toUpperCase();
  }

  // Parse HH:mm format
  const timeMatch = trimmed.match(/^(\d{1,2}):(\d{2})$/);
  if (timeMatch) {
    let hours = parseInt(timeMatch[1], 10);
    const minutes = timeMatch[2];
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Hour 0 should be 12
    return `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
  }

  return trimmed;
}

export async function sendEnquiryEmail(data: EnquiryInput) {
  const transporter = getTransporter();
  const toEmail = process.env.ENQUIRY_TO_EMAIL || siteConfig.email;

  // Formatting inputs for professional appearance
  const formattedName = toTitleCase(data.name);
  const formattedPickup = toTitleCase(data.pickupLocation);
  const formattedDrop = toTitleCase(data.dropLocation);
  const formattedDate = formatDate(data.travelDate);
  const formattedTime = formatTime(data.travelTime);
  const formattedTripType = toTitleCase(data.tripType);
  const formattedCarType = toTitleCase(data.carType);
  const formattedMessage = data.message?.trim() ? data.message.trim() : "No special instructions provided.";

  // Clean phone number for tel: and wa.me links
  const digitsOnly = data.phone.replace(/\D/g, "");
  const formattedPhone = digitsOnly.length === 10 ? `91${digitsOnly}` : digitsOnly;

  const whatsappMsg = encodeURIComponent(
    `Namaste ${formattedName}! Thank you for enquiring with Shree Mahadev Travels Ujjain for your trip from ${formattedPickup} to ${formattedDrop} on ${formattedDate}. We are pleased to provide you with our best cab rates.`
  );

  const subject = `Booking Enquiry: ${formattedName} — ${formattedPickup} to ${formattedDrop}`;

  const adminHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Enquiry</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; padding: 30px 12px;">
      <tr>
        <td align="center">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid #334155; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);">
            
            <!-- BRAND HEADER -->
            <tr>
              <td style="background: #d97706; padding: 24px 30px; text-align: center;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center">
                      <div style="color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase;">
                        ${siteConfig.name}
                      </div>
                      <div style="display: inline-block; margin-top: 6px; background-color: rgba(15, 23, 42, 0.85); color: #fbbf24; font-size: 11px; font-weight: 700; padding: 3px 12px; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px;">
                        New Booking Enquiry Notification
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- MAIN BODY -->
            <tr>
              <td style="padding: 28px 24px;">
                
                <!-- ROUTE BANNER -->
                <div style="background-color: #0f172a; border-radius: 8px; padding: 18px 20px; border: 1px solid #334155; margin-bottom: 24px;">
                  <div style="color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">
                    Trip Route Overview
                  </div>
                  <div style="color: #f8fafc; font-size: 16px; font-weight: 700; line-height: 1.5;">
                    <span style="color: #fbbf24;">${formattedPickup}</span> 
                    <span style="color: #64748b; margin: 0 8px;">&rarr;</span> 
                    <span style="color: #38bdf8;">${formattedDrop}</span>
                  </div>
                </div>

                <!-- CUSTOMER INFORMATION SECTION -->
                <div style="color: #fbbf24; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
                  Customer Details
                </div>
                <table width="100%" border="0" cellspacing="0" cellpadding="10" style="background-color: #0f172a; border-radius: 8px; border: 1px solid #334155; margin-bottom: 24px; font-size: 14px; color: #f1f5f9;">
                  <tr>
                    <td width="36%" style="color: #94a3b8; font-weight: 600; border-bottom: 1px solid #1e293b;">Full Name</td>
                    <td style="color: #ffffff; font-weight: 700; border-bottom: 1px solid #1e293b;">${formattedName}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; font-weight: 600; border-bottom: 1px solid #1e293b;">Phone Number</td>
                    <td style="color: #ffffff; font-weight: 700; border-bottom: 1px solid #1e293b;">
                      <a href="tel:${data.phone}" style="color: #38bdf8; text-decoration: none; font-weight: 700;">${data.phone}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; font-weight: 600;">Email Address</td>
                    <td style="color: #ffffff; font-weight: 500;">
                      ${data.email ? `<a href="mailto:${data.email}" style="color: #38bdf8; text-decoration: none;">${data.email}</a>` : '<span style="color: #64748b;">Not provided</span>'}
                    </td>
                  </tr>
                </table>

                <!-- TRIP SPECIFICATIONS SECTION -->
                <div style="color: #fbbf24; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
                  Trip Requirements
                </div>
                <table width="100%" border="0" cellspacing="0" cellpadding="10" style="background-color: #0f172a; border-radius: 8px; border: 1px solid #334155; margin-bottom: 24px; font-size: 14px; color: #f1f5f9;">
                  <tr>
                    <td width="36%" style="color: #94a3b8; font-weight: 600; border-bottom: 1px solid #1e293b;">Travel Date</td>
                    <td style="color: #ffffff; font-weight: 700; border-bottom: 1px solid #1e293b;">${formattedDate}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; font-weight: 600; border-bottom: 1px solid #1e293b;">Travel Time</td>
                    <td style="color: #ffffff; font-weight: 700; border-bottom: 1px solid #1e293b;">${formattedTime}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; font-weight: 600; border-bottom: 1px solid #1e293b;">Trip Type</td>
                    <td style="color: #ffffff; font-weight: 700; border-bottom: 1px solid #1e293b;">${formattedTripType}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; font-weight: 600; border-bottom: 1px solid #1e293b;">Vehicle Category</td>
                    <td style="color: #fbbf24; font-weight: 800; border-bottom: 1px solid #1e293b;">${formattedCarType}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; font-weight: 600; vertical-align: top;">Additional Message</td>
                    <td style="color: #cbd5e1; font-weight: 400; line-height: 1.5;">${formattedMessage}</td>
                  </tr>
                </table>

                <!-- EXECUTIVE CALL TO ACTION BUTTONS -->
                <div style="text-align: center; margin-top: 24px;">
                  <a href="tel:${data.phone}" target="_blank" style="display: inline-block; background-color: #16a34a; color: #ffffff; font-size: 14px; font-weight: 700; padding: 12px 22px; border-radius: 6px; text-decoration: none; margin-right: 6px; margin-bottom: 6px;">
                    Call Customer
                  </a>
                  <a href="https://wa.me/${formattedPhone}?text=${whatsappMsg}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; font-size: 14px; font-weight: 700; padding: 12px 22px; border-radius: 6px; text-decoration: none; margin-bottom: 6px;">
                    WhatsApp Customer
                  </a>
                </div>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background-color: #0f172a; padding: 16px 24px; text-align: center; border-top: 1px solid #334155; color: #64748b; font-size: 12px;">
                This is an automated enquiry notification from the ${siteConfig.name} website.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  // Send main notification email to travel agency client
  await transporter.sendMail({
    from: `"${siteConfig.name} Website" <${process.env.SMTP_USER}>`,
    to: toEmail,
    replyTo: data.email || undefined,
    subject,
    html: adminHtml,
  });

  // Optional: Send auto-acknowledgement email to customer if customer email is provided AND different from client email
  if (data.email && data.email.trim().toLowerCase() !== toEmail.trim().toLowerCase()) {
    const customerHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="utf-8"></head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding: 24px 12px;">
        <tr>
          <td align="center">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color: #ffffff; border-radius: 10px; padding: 28px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
              <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">Namaste ${formattedName},</h2>
              <p style="color: #334155; font-size: 15px; line-height: 1.6;">
                Thank you for contacting <strong>${siteConfig.name}</strong>. We have received your booking enquiry for traveling from <strong>${formattedPickup}</strong> to <strong>${formattedDrop}</strong> on <strong>${formattedDate}</strong>.
              </p>
              <p style="color: #334155; font-size: 15px; line-height: 1.6;">
                Our team is reviewing your trip requirements (${formattedCarType}). We will call or WhatsApp you shortly on <strong>${data.phone}</strong> with full fare details and vehicle availability.
              </p>
              <div style="background-color: #f1f5f9; padding: 14px 18px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #d97706;">
                <p style="margin: 0; font-size: 14px; color: #334155; line-height: 1.5;">
                  Need immediate confirmation? Contact us anytime at 
                  <a href="tel:${siteConfig.phones[0]}" style="color: #d97706; font-weight: 700; text-decoration: none;">${siteConfig.phonesDisplay[0]}</a> or 
                  <a href="tel:${siteConfig.phones[1]}" style="color: #d97706; font-weight: 700; text-decoration: none;">${siteConfig.phonesDisplay[1]}</a>.
                </p>
              </div>
              <p style="color: #64748b; font-size: 13px; margin-bottom: 0; line-height: 1.5;">
                Warm regards,<br>
                <strong>${siteConfig.name} Team</strong>
              </p>
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
        subject: `Enquiry Received: ${formattedPickup} to ${formattedDrop} — ${siteConfig.name}`,
        html: customerHtml,
      });
    } catch (custErr) {
      console.error("Failed to send customer confirmation email:", custErr);
    }
  }
}
