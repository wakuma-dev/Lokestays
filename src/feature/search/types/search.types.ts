import { z } from "zod";
import { searchSchema } from "../schema/searchSchema";

export type SearchParams = z.infer<typeof searchSchema>;