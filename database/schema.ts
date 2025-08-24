import { pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: varchar().primaryKey(),
	email: varchar().notNull(),
});

export const sessionsTable = pgTable("sessions", {
	id: varchar().primaryKey(),
	userId: varchar().references(() => usersTable.id),
	expiresAt: varchar().notNull(),
});
