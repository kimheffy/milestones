import type { IHabitsRepository } from "~/core/application/repositories/habits.repository.interface";
import type { IAuthenticationService } from "~/core/application/services/authentication.service.interface";

export const DI_SYMBOLS = {
	// Services
	IAuthenticationService: Symbol.for("IAuthenticationService"),
	// Repositories
	IHabitsRepository: Symbol.for("IHabitsRepository"),
	// Use case
};

export interface DI_RETURN_TYPES {
	// Services
	// Repositories
	IHabitsRepository: IHabitsRepository;
	IAuthenticationService: IAuthenticationService;
	// Use case
}
