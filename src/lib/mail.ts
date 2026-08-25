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
  const to = process.env.ENQUIRY_TO_EMAIL || siteConfig.email;

  const subject = `New Enquiry: ${data.pickupLocation} → ${data.dropLocation} (${data.name})`;

  const html = `
    <div style="font-family: Arial, sans-serif; font-size: 15px; color: #1a1a1a;">
      <h2 style="color:#c99a1a; margin-bottom: 4px;">New Booking Enquiry</h2>
      <p style="color:#555; margin-top:0;">${siteConfig.name}</p>
      <table cellpadding="6" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 480px;">
        <tr><td style="font-weight:bold; width:140px;">Name</td><td>${data.name}</td></tr>
        <tr><td style="font-weight:bold;">Phone</td><td>${data.phone}</td></tr>
        <tr><td style="font-weight:bold;">Email</td><td>${data.email || "-"}</td></tr>
        <tr><td style="font-weight:bold;">Pickup</td><td>${data.pickupLocation}</td></tr>
        <tr><td style="font-weight:bold;">Drop</td><td>${data.dropLocation}</td></tr>
        <tr><td style="font-weight:bold;">Travel Date</td><td>${data.travelDate}</td></tr>
        <tr><td style="font-weight:bold;">Travel Time</td><td>${data.travelTime || "-"}</td></tr>
        <tr><td style="font-weight:bold;">Trip Type</td><td>${data.tripType}</td></tr>
        <tr><td style="font-weight:bold;">Car Type</td><td>${data.carType}</td></tr>
        <tr><td style="font-weight:bold; vertical-align:top;">Message</td><td>${data.message || "-"}</td></tr>
      </table>
    </div>
  `;

  await transporter.sendMail({
    from: `"${siteConfig.name} Website" <${process.env.SMTP_USER}>`,
    to,
    replyTo: data.email || undefined,
    subject,
    html,
  });
}
