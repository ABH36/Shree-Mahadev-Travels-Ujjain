import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

async function testSMTP() {
  console.log("=== TESTING SMTP CONNECTION ===");
  console.log("Host:", process.env.SMTP_HOST);
  console.log("Port:", process.env.SMTP_PORT);
  console.log("User:", process.env.SMTP_USER);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log("-> SUCCESS: SMTP credentials & server connection verified!");
  } catch (err: any) {
    console.error("-> FAILED SMTP Verification:", err.message);
  }
}

testSMTP();
