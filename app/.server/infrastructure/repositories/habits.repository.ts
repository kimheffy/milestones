import { injectable } from "inversify";
import type { IHabitsRepository } from "~/core/application/repositories/habits.repository.interface";

import type { Habit } from "~/core/entities/models/habit";

@injectable()
export class HabitsRepository implements IHabitsRepository {
	constructor() {}

	async createHabit(habit: string, userId: string): Promise<Habit> {
		console.group("habits-repository");
		console.log({ habit, userId });
		console.groupEnd();

		return new Promise((resolve) => {
			resolve({ habit, id: "test-jeff" });
		});
	}
}
