import { z } from "zod";
import { InputParseError } from "~/core/entities/errors/common";
import { verifyUseCase } from "~/core/application/use-cases/auth/verify.use-case";

const inputSchema = z.object({
	userId: z.string().min(1),
	secretToken: z.string().min(1),
});

export async function verifyController(
	userId: string | null,
	secretToken: string | null,
) {
	const { data, error: inputParseError } = inputSchema.safeParse({
		userId,
		secretToken,
	});

	if (inputParseError) {
		throw new InputParseError("Invalid data", { cause: inputParseError });
	}

	await verifyUseCase(data);
}
