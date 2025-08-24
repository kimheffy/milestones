import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";

import type { IUsersRepository } from "../../app/.server/application/repositories/users.repository.interface";

import { UsersRepository } from "../../app/.server/infrastructure/repositories/users.repository";
import { DI_SYMBOLS } from "../types";

const initializeModule = ({ bind }: ContainerModuleLoadOptions) => {
	bind<IUsersRepository>(DI_SYMBOLS.IUsersRepository).to(UsersRepository);
};

export const UsersModule = new ContainerModule(initializeModule);
