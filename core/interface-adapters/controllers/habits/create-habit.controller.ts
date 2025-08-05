import { z } from "zod";

import { createHabitUseCase } from "~/core/application/use-cases/create-habit.use-case";
import { InputParseError } from "~/core/entities/errors/common";
import type { Habit } from "~/core/entities/models/habit";

function presenter(habit: Habit) {
	return {
		id: habit.id,
		habit: habit.habit,
	};
}

const inputSchema = z.object({ habit: z.string().min(1) });

// TODO: Add another parameter for session
export async function createHabitController(
	input: any /*, sessionId: string | undefined */,
): Promise<ReturnType<typeof presenter>> {
	// if (!sessionId) {
	// 	throw new UnauthenticatedError("Must be logged in to create a habit");
	// }
	//
	// const authenticatedService = getInjection("IAuthenicationService");
	// const { user } = await authenticatedService.validateSession(sessionId);

	const { data, error: inputParseError } = inputSchema.safeParse({
		habit: input,
	});

	if (inputParseError) {
		throw new InputParseError("Invalid data", { cause: inputParseError });
	}

	const habit = await createHabitUseCase(data.habit /*, user.id*/);

	return presenter(habit);
}
