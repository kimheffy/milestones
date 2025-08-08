import { ID } from "appwrite";
import { getInjection } from "~/di/container";
import { AuthenticationError } from "~/core/entities/errors/auth";

const REDIRECT_URL = "http://localhost:3000/verify";

export async function signUpUseCase(email: string) {
	try {
		const authService = getInjection("IAuthenticationService");
		await authService
			.getAccount()
			.createMagicURLToken(ID.unique(), email, REDIRECT_URL);
	} catch (err) {
		// TODO: Create an entities/error for auth errors
		console.error("Unable to sign up...", err);
		throw new AuthenticationError("Unable to sign up", { cause: err });
	}
}
