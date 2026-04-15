import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	username: text('username').notNull,
	password: text('password').notNull,
	alamat: text('alamat'),
	foto: text('foto')
});
