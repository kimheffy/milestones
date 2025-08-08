import { z } from "zod";
import { InputParseError } from "~/core/entities/errors/common";
import { signUpUseCase } from "~/core/application/use-cases/auth/sign-up.use-case";

const inputSchema = z.email();

export async function signUpController(input: any) {
	const { data, error: inputParseError } = inputSchema.safeParse(input);

	if (inputParseError) {
		throw new InputParseError("Invalid data", { cause: inputParseError });
	}

	const { cookie } = await signUpUseCase(data);
	return cookie;
}
