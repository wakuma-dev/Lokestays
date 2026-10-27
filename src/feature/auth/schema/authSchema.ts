// src/feature/auth/schemas/authSchema.ts
import { z } from "zod";
import { accountModeSchema } from "./userProfileSchema";

export const registerSchema = z.object({
  fullName: z.string().trim().min(1, { message: "Full name is required" }),
  email: z.string().trim().superRefine((value, ctx) => {
    if (!value) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email address is required",
      });
      return;
    }
    // Fixed: check z.string().email() correctly using safeParse or string validation
    if (!z.string().email().safeParse(value).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid email address",
      });
    }
  }),
  password: z.string().trim().superRefine((value, ctx) => {
    if (!value) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is required",
      });
      return;
    }
    if (value.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least 8 characters",
      });
    }
  }),
  confirmPassword: z.string().trim().min(1, { message: "Please confirm password" }),
  initialRole: accountModeSchema,
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password do not match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().trim().superRefine((value, ctx) => {
    if (!value) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email is required",
      });
      return;
    }
    if (!z.string().email().safeParse(value).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid email address",
      });
    }
  }),
  password: z.string().trim().superRefine((value, ctx) => {
    if (!value) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is required",
      });
      return;
    }
    if (value.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least 8 characters",
      });
    }
  }),
});

export type RegisterDataType = z.infer<typeof registerSchema>;
export type LoginDataType = z.infer<typeof loginSchema>;