import { getInjection } from "~/di/container";
import { AuthenticationError } from "~/entities/errors/auth";

export async function signUpUseCase(email: string) {
	try {
		const authService = getInjection("IAuthenticationService");
		await authService.createMagicURL(email);
	} catch (err) {
		// TODO: Create an entities/error for auth errors
		console.error("Unable to sign up...", err);
		throw new AuthenticationError("Unable to sign up", { cause: err });
	}
}
