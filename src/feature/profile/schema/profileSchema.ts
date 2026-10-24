import { z } from "zod";
export const userSchema = z.object({
  uid: z.string().trim().min(1, {
    error: "UID is required",
  }),
  firstName: z.string().trim().min(1, {
    error: "First name is required",
  }),
  lastName: z.string().trim().min(1, {
    error: "Last name is required",
  }),
  email: z.email({
    error: "Invalid email address",
  }),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\+[1-9]\d{1,14}$/, {
      error: "Invalid phone number format",
    })
    .or(z.literal("")),
});

export const updateUserSchema = userSchema
  .pick({
    firstName: true,
    lastName: true,
    phoneNumber: true,
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    error: "Provide at least one field to update",
  });
