import { z } from "zod"
const dateSchema = z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine((value) => {
        const [year, month, day] = value.split("-").map(Number);
        const date = new Date(Date.UTC(year, month - 1, day));
        return (
            date.getUTCFullYear() === year &&
            date.getUTCMonth() === month && 
            date.getUTCDate() === day
        )
    });
export const searchSchema = z.object({
     destination: z.string().trim().max(100).optional(),
     checkIn: dateSchema.optional(),
     checkOut: dateSchema.optional(),
     infants: z.coerce.number().min(0).max(5).catch(0),
     children: z.coerce.number().min(0).max(15).catch(0),
     adults: z.coerce.number().min(0).max(13).catch(1),
}).superRefine((values, context) => {
    if(values.checkIn && values.checkOut && values.checkOut <= values.checkIn){
        context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["checkOut"]
        });
    }
    if(values.adults + values.children > 15){
        context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["children"]
        });
    }
})