import { z } from "zod";

/** Shared by the contact form (client) and /api/contact (server). */
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(100),
  email: z.string().trim().email("Enter a valid work email.").max(254),
  company: z.string().trim().min(1, "Enter your company.").max(120),
  role: z.string().trim().min(1, "Enter your role.").max(100),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters).").max(2000),
  /** Honeypot: real users leave this empty. */
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = "name" | "email" | "company" | "role" | "message";
