import { db } from '$lib/server/db';
import { users } from '$lib/server/schema';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const username = data.get('username');
		const password = data.get('password');

		try {
			await db.insert(users).values({
				username,
				password
			});
		} catch (err) {
			console.log('REGISTER ERROR:', err);
			return { error: 'Gagal register' };
		}

		throw redirect(303, '/login');
	}
};