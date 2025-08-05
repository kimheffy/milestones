import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";

import type { IHabitsRepository } from "../../core/application/repositories/habits.repository.interface";
import { HabitsRepository } from "../../core/infrastructure/repositories/habits.repository";
import { DI_SYMBOLS } from "../types";

const initalizeModule = ({ bind }: ContainerModuleLoadOptions) => {
	// if (process.env.NODE_ENV === "test") {
	// 	bind<IHabitsRepository>();
	// }

	bind<IHabitsRepository>(DI_SYMBOLS.IHabitsRepository).to(HabitsRepository);
};

export const HabitsModule = new ContainerModule(initalizeModule);
