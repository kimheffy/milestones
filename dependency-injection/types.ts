import type { IHabitsRepository } from "~/core/application/repositories/habits.repository.interface";

export const DI_SYMBOLS = {
	// Services
	// Repositories
	IHabitsRepository: Symbol.for("IHabitsRepository"),
	// Use case
};

export interface DI_RETURN_TYPES {
	// Services
	// Repositories
	IHabitsRepository: IHabitsRepository;
	// Use case
}
