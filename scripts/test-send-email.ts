import dotenv from "dotenv";
import { sendEnquiryEmail } from "../src/lib/mail";

dotenv.config();

async function testEmail() {
  console.log("=== SENDING TEST ENQUIRY EMAIL ===");
  try {
    await sendEnquiryEmail({
      name: "Abhishek Jain Test",
      phone: "9713629770",
      email: "shreemahadevtravelsujjain@gmail.com",
      pickupLocation: "Ujjain Junction Railway Station",
      dropLocation: "Omkareshwar Temple Ghats",
      travelDate: "2026-09-01",
      travelTime: "07:30 AM",
      tripType: "Round Trip",
      carType: "Ertiga",
      message: "Please send clean AC cab with experienced driver for family darshan trip.",
    });
    console.log("-> SUCCESS: Email sent successfully via SMTP!");
  } catch (err: any) {
    console.error("-> FAILED to send email:", err.message);
  }
}

testEmail();
