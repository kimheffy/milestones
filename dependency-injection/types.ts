import type { IHabitsRepository } from "~/core/application/repositories/habits.repository.interface";
import type { IAuthenticationService } from "~/core/application/services/authentication.service.interface";
import type { IUsersRepository } from "~/core/application/repositories/users.repository.interface";

export const DI_SYMBOLS = {
	// Services
	IAuthenticationService: Symbol.for("IAuthenticationService"),
	// Repositories
	IHabitsRepository: Symbol.for("IHabitsRepository"),
	IUsersRepository: Symbol.for("IUsersRepository"),
	// Use case
};

export interface DI_RETURN_TYPES {
	// Services
	IAuthenticationService: IAuthenticationService;
	// Repositories
	IHabitsRepository: IHabitsRepository;
	IUsersRepository: IUsersRepository;
	// Use case
}
