import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema.js';
import { redirect, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const username = data.get('username');
		const password = data.get('password');

		const user = await db
			.select()
			.from(users)
			.where(eq(users.username, username))
			.get();

		if (!user || user.password !== password) {
			return fail(400, { message: 'Username atau password salah' });
		}

		throw redirect(303, '/dashboard');
	}
};