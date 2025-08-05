import { z } from "zod";

export const habitSchema = z.object({
	id: z.uuid(),
	habit: z.string().min(1),
});

export type Habit = z.infer<typeof habitSchema>;
