import { z } from "zod";
export const redirectSchema = z.object({
    redirect: z.string().optional()
});
export type RedirectSearch = z.infer<typeof redirectSchema>;