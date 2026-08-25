import dotenv from "dotenv";
import { sendEnquiryEmail } from "../src/lib/mail";

dotenv.config();

async function testEmail() {
  console.log("=== SENDING TEST ENQUIRY EMAIL TO CLIENT ===");
  try {
    await sendEnquiryEmail({
      name: "Rahul Sharma",
      phone: "9876543210",
      email: "rahul.sharma.test@gmail.com",
      pickupLocation: "Ujjain Junction Railway Station",
      dropLocation: "Omkareshwar Temple & Ghats",
      travelDate: "2026-09-05",
      travelTime: "08:00 AM",
      tripType: "Round Trip",
      carType: "Innova Crysta",
      message: "Need 7 seater Innova Crysta for 4 adults and 2 kids. Please share package price.",
    });
    console.log("-> SUCCESS: Full Customer Enquiry Email sent to client via SMTP!");
  } catch (err: any) {
    console.error("-> FAILED to send email:", err.message);
  }
}

testEmail();
