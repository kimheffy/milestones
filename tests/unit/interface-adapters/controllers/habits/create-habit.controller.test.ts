import "reflect-metadata";
import { afterEach, beforeEach, expect, it } from "vitest";

import { destroyContainer, initalizeContainer } from "~/di/container";
import { createHabitController } from "~/core/interface-adapters/controllers/habits/create-habit.controller";
import { InputParseError } from "~/entities/errors/common";

beforeEach(() => {
	initalizeContainer();
});

afterEach(() => {
	destroyContainer();
});

it("creates habit", async () => {
	await expect(createHabitController("hello test!")).resolves.toMatchObject({
		habit: "hello test!",
		id: "test-jeff",
	});
});

it("throw invalid input", async () => {
	await expect(createHabitController({})).rejects.toBeInstanceOf(
		InputParseError,
	);
	await expect(createHabitController("")).rejects.toBeInstanceOf(
		InputParseError,
	);
});

// TODO: Once auth has been implemented, revisit createHabitsController, and ensure this test passes
// it("throws for unauthenicated", () => {
// 	expect(createHabitController({ habit: "Anything" }, undefined)).rejects.toBeInstanceOf(UnauthenticatedError);
// });
