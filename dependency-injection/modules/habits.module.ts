import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";

import { HabitsRepository } from "../../app/.server/infrastructure/repositories/habits.repository";
import type { IHabitsRepository } from "../../app/.server/application/repositories/habits.repository.interface";
import { DI_SYMBOLS } from "../types";

const initalizeModule = ({ bind }: ContainerModuleLoadOptions) => {
	// if (process.env.NODE_ENV === "test") {
	// 	bind<IHabitsRepository>();
	// }

	bind<IHabitsRepository>(DI_SYMBOLS.IHabitsRepository).to(HabitsRepository);
};

export const HabitsModule = new ContainerModule(initalizeModule);
