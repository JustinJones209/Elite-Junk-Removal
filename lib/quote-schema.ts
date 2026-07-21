import { z } from "zod";

/** Service types offered in the quote form dropdown. */
export const SERVICE_TYPES = [
  "Furniture Removal",
  "Appliance Removal",
  "Garage / Attic Cleanout",
  "Estate Cleanout",
  "Storage / Shed Cleanout",
  "Construction Debris",
  "Yard Waste",
  "Eviction Cleanout",
  "Other / Not Sure",
] as const;

/**
 * Shared validation schema for the quote request form. Used by React Hook Form
 * on the client AND re-validated inside the Server Action on the server.
 */
export const quoteSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number.")
    .regex(/^[0-9()+\-.\s]+$/, "Please enter a valid phone number."),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .optional()
    .or(z.literal("")),
  zip: z
    .string()
    .regex(/^\d{5}$/, "Please enter a valid 5-digit ZIP code."),
  serviceType: z.enum(SERVICE_TYPES, {
    message: "Please choose a service type.",
  }),
  description: z
    .string()
    .min(10, "Please tell us a little about the job (10+ characters).")
    .max(1000, "Please keep the description under 1000 characters."),
  preferredDate: z.string().optional().or(z.literal("")),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;

/** Shape returned by the submit Server Action. */
export interface QuoteActionResult {
  success: boolean;
  message: string;
}
