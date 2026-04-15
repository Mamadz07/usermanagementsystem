import { db } from '$lib/server/db';
import { users } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const username = data.get('username');
		const password = data.get('password');

		try {
			const result = await db
				.select()
				.from(users)
				.where(eq(users.username, username));

			const user = result[0];

			if (user && user.password === password) {
				throw redirect(303, '/dashboard');
			}

			return { error: 'Username atau password salah' };
		} catch (err) {
			console.log('LOGIN ERROR:', err);
			return { error: 'Server error' };
		}
	}
};