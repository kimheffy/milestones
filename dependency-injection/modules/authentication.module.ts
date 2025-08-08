import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";

import type { IAuthenticationService } from "../../core/application/services/authentication.service.interface";
import { AuthenticationService } from "../../core/infrastructure/services/authentication.service";
import { DI_SYMBOLS } from "../types";

const initalizeModule = ({ bind }: ContainerModuleLoadOptions) => {
	// if (process.env.NODE_ENV === "test") {
	// 	bind<IHabitsRepository>();
	// }

	bind<IAuthenticationService>(DI_SYMBOLS.IAuthenticationService).to(
		AuthenticationService,
	);
};

export const AuthenticationModule = new ContainerModule(initalizeModule);
