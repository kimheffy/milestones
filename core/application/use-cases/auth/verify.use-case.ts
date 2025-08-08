import { getInjection } from "~/di/container";
import { AuthenticationError } from "~/core/entities/errors/auth";

export async function verifyUseCase({
	userId,
	secretToken,
}: {
	userId: string;
	secretToken: string;
}) {
	try {
		const authService = getInjection("IAuthenticationService");

		const session = await authService
			.getAccount()
			.createSession(userId, secretToken);
	} catch (err) {
		throw new AuthenticationError("Unable to create a session", { cause: err });
	}
}
