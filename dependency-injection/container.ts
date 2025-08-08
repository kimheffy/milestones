import { Container } from "inversify";

import { DI_SYMBOLS, type DI_RETURN_TYPES } from "~/di/types";

import { HabitsModule } from "~/di/modules/habits.module";
import { AuthenticationModule } from "~/di/modules/authentication.module";

const ApplicationContainer = new Container({
	defaultScope: "Singleton",
});

export const initalizeContainer = () => {
	ApplicationContainer.load(HabitsModule);
	ApplicationContainer.load(AuthenticationModule);
};

export const destroyContainer = () => {
	ApplicationContainer.unload(HabitsModule);
	ApplicationContainer.unload(AuthenticationModule);
};

if (process.env.NODE_ENV !== "test") {
	initalizeContainer();
}

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
	symbol: K,
): DI_RETURN_TYPES[K] {
	return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}

export { ApplicationContainer };
