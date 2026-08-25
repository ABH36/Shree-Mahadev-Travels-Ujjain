import dotenv from "dotenv";
import { sendEnquiryEmail } from "../src/lib/mail";

dotenv.config();

async function testEmail() {
  console.log("=== SENDING PROFESSIONAL EXECUTIVE TEST EMAIL ===");
  try {
    await sendEnquiryEmail({
      name: "abhishek jain test",
      phone: "9713629770",
      email: "abhishek.test@gmail.com",
      pickupLocation: "ujjain junction railway station",
      dropLocation: "omkareshwar temple ghats",
      travelDate: "2026-09-01",
      travelTime: "14:30",
      tripType: "round trip" as any,
      carType: "ertiga",
      message: "Please provide clean AC Ertiga cab with experienced driver.",
    });
    console.log("-> SUCCESS: Professional Executive Email sent to client via SMTP!");
  } catch (err: any) {
    console.error("-> FAILED to send email:", err.message);
  }
}

testEmail();
