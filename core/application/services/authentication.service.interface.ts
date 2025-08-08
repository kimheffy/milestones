import type { Account, Databases } from "appwrite";

export interface IAuthenticationService {
	getAccount(): Account;
	getDatabase(): Databases;
}
