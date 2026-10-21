import { z } from "zod";
export const registerSchema = z.object({
    firstName: z.string().trim().min(1, {message: "First name is required"}),
    lastName: z.string().trim().min(1, {message: "Last name is required"}),
    email: z.string().trim().superRefine((value, ctx) => {
        if(!value){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Email address is required"
            });
            return;
        }
        if(!z.string().email){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Invalid email address"
            });
        }
    }),
    password: z.string().trim().superRefine((value, ctx) => {
        if(!value){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password is required"
            });
            return;
        }
        if(value.length < 8){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password must contain at 8 least characters"
            })
        }
    }),
    confirmPassword: z.string().trim().min(1, {message: "Please confirm password"}),
    agreeTerms: z.boolean().refine((val) => val === true, {
        message: "You must accept terms and condition"
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"]
});
export const loginSchema = z.object({
    email: z.string().trim().superRefine((value, ctx) => {
        if(!value){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Email is required"
            });
            return
        }
        if(!z.string().email()){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Invalid email address"
            });
        }
    }),
    password: z.string().trim().superRefine((value, ctx) => {
        if(!value){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password is required"
            });
            return
        }
        if(value.length < 8){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password must be contain at least 8 characters"
            })
        }
    })
});
export type RegisterDataType = z.infer<typeof registerSchema>;
export type LoginDataType = z.infer<typeof loginSchema>