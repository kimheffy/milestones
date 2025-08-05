import type { Habit } from "~/core/entities/models/habit";

export interface IHabitsRepository {
	createHabit(habit: string, userId: string): Promise<Habit>;
}
