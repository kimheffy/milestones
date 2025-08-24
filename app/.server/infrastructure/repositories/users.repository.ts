import type { IUsersRepository } from "~/core/application/repositories/users.repository.interface";

import { injectable } from "inversify";

import { database } from "~/database/context";
import { usersTable } from "~/database/schema";
import type { User } from "~/entities/models/user";

@injectable()
export class UsersRepository implements IUsersRepository {
	async createUser(userId: string, email: string): Promise<User> {
		const newUser = {
			id: userId,
			email,
		};
		const [created] = await database()
			.insert(usersTable)
			.values(newUser)
			.returning();

		console.log("users-repository -> ", created);

		if (!created) {
			throw new Error("User hasn't been created");
		}

		return created;
	}
}
