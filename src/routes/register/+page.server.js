import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
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
		} catch (e) {
			console.log('REGISTER ERROR:', e);
		}

		throw redirect(303, '/login');
	}
};