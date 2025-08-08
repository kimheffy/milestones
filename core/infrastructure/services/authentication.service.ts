import { Account, Client, Databases } from "appwrite";
import { injectable } from "inversify";

import type { IAuthenticationService } from "~/core/application/services/authentication.service.interface";

@injectable()
export class AuthenticationService implements IAuthenticationService {
	private _client;
	private _account;
	private _database;

	constructor() {
		this._client = new Client()
			.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
			.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

		this._account = new Account(this._client);
		this._database = new Databases(this._client);
	}

	getAccount() {
		return this._account;
	}

	getDatabase() {
		return this._database;
	}
}
