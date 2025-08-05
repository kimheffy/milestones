import "reflect-metadata";
import { afterEach, beforeEach, expect, it } from "vitest";

import { destroyContainer, initalizeContainer } from "~/di/container";
import { createHabitUseCase } from "~/core/application/use-cases/create-habit.use-case";

beforeEach(() => {
	initalizeContainer();
});

afterEach(() => {
	destroyContainer();
});

it("creates habit", async () => {
	await expect(createHabitUseCase("hello test!")).resolves.toMatchObject({
		habit: "hello test!",
		id: "test-jeff",
	});
});
