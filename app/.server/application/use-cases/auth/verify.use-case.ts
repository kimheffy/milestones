import { getInjection } from "~/di/container";
import { AuthenticationError } from "~/entities/errors/auth";

import type { Session } from "~/entities/models/session";
import type { User } from "~/entities/models/user";

export async function verifyUseCase({
	userId,
	secretToken,
}: {
	userId: string;
	secretToken: string;
}): Promise<{ session: Session; user?: User }> {
	try {
		const authService = getInjection("IAuthenticationService");

		const session = await authService.createSession(userId, secretToken);

		const userRepository = getInjection("IUsersRepository");
		const createdUser = await userRepository.createUser(
			session.userId,
			session.email,
		);

		return { session, user: createdUser };
	} catch (err) {
		throw new AuthenticationError("Unable to create a session", { cause: err });
	}
}
