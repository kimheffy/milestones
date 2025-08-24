import { z } from "zod";

const sessionSchema = z.object({
	id: z.string(),
	userId: z.string(),
	expiresAt: z.string(),
});

export type Session = z.infer<typeof sessionSchema>;
