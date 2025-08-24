import { z } from "zod";

const userSchema = z.object({
	id: z.string(),
	email: z.email(),
});

export type User = z.infer<typeof userSchema>;
