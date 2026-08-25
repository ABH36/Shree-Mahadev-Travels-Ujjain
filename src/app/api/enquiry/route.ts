import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validations/enquiry";
import { getDb } from "@/lib/mongodb";
import { sendEnquiryEmail } from "@/lib/mail";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    const db = await getDb();
    await db.collection("enquiries").insertOne({
      ...data,
      createdAt: new Date(),
      source: "website",
    });
  } catch (error) {
    console.error("Failed to save enquiry to database:", error);
  }

  try {
    await sendEnquiryEmail(data);
  } catch (error) {
    console.error("Failed to send enquiry email:", error);
    return NextResponse.json(
      { error: "Enquiry saved, but failed to send email notification." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
