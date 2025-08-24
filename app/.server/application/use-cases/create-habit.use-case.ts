import { getInjection } from "~/di/container";

import type { Habit } from "~/core/entities/models/habit";

// TODO: I have removed userId from the parameters
export async function createHabitUseCase(habit: string): Promise<Habit> {
	const habitsRepository = getInjection("IHabitsRepository");

	// NOTE: this is where you'll do authorization checks - is this user authorized
	// to create this habit? (i.e. free users are only allowed 5 habits, throw an Unauthorized if more than 5)

	const newHabit = await habitsRepository.createHabit(habit, "");

	return newHabit;
}
