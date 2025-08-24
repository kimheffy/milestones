import { Account, Client, ID, Users } from "node-appwrite";
import { injectable } from "inversify";

import type { Session } from "~/entities/models/session";

import type { IAuthenticationService } from "~/core/application/services/authentication.service.interface";
import { createCookieSessionStorage } from "react-router";

const REDIRECT_URL = "http://localhost:3000/verify";

@injectable()
export class AuthenticationService implements IAuthenticationService {
	private _client;
	private _account;
	private _users; // to get the userEmail from userId

	constructor() {
		this._client = new Client()
			.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
			.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
			.setKey(import.meta.env.VITE_APPWRITE_API_KEY);

		this._account = new Account(this._client);
		this._users = new Users(this._client);
	}

	async createMagicURL(email: string): Promise<void> {
		await this._account.createMagicURLToken(ID.unique(), email, REDIRECT_URL);
	}

	async createSession(
		userId: string,
		secretToken: string,
	): Promise<Session & { email: string }> {
		const session = await this._account.createSession(userId, secretToken);

		createCookieSessionStorage({
			cookie: {
				name: "__session",
				path: "/",
				httpOnly: true,
				sameSite: "strict",
				secrets: [session.secret],
				secure: true,
				maxAge: Number(session.expire),
			},
		});

		this._client.setSession(secretToken);
		const currentUser = await this._users.get(session.userId);

		return {
			id: session.$id,
			userId: session.userId,
			expiresAt: session.expire,
			email: currentUser.email,
		};
	}
}
