import type { Session } from "~/entities/models/session";

export interface IAuthenticationService {
	createMagicURL(email: string): Promise<void>;
	createSession(
		userId: string,
		secretToken: string,
	): Promise<Session & { email: string }>;
}
