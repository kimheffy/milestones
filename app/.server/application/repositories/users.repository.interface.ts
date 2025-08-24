import type { User } from "~/entities/models/user";

export interface IUsersRepository {
	createUser(userId: string, email: string): Promise<User>;
}
