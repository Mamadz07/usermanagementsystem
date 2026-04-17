import { db } from '$lib/server/db';
import { users } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const username = data.get('username');
		const password = data.get('password');

		const user = await db
			.select()
			.from(users)
			.where(eq(users.username, username))
			.get();

		if (user && user.password === password) {
			// ✅ SET COOKIE LOGIN
			cookies.set('session', user.id, {
				path: '/',
				httpOnly: true
			});

			throw redirect(303, '/dashboard');
		}

		return { error: 'Username atau password salah' };
	}
};