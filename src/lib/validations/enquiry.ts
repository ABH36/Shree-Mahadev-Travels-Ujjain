import { z } from "zod";

export const tripTypes = ["One Way", "Round Trip"] as const;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Enter a valid email address").optional().or(z.literal("")),
  pickupLocation: z.string().trim().min(2, "Enter pickup location").max(150),
  dropLocation: z.string().trim().min(2, "Enter drop location").max(150),
  travelDate: z.string().trim().min(1, "Select a travel date"),
  travelTime: z.string().trim().optional().or(z.literal("")),
  tripType: z.enum(tripTypes),
  carType: z.string().trim().min(1, "Select a car type"),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
