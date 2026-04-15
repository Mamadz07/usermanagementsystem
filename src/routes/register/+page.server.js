import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const username = data.get('username');
		const password = data.get('password');

		try {
			await db.run(
				`INSERT INTO users (username, password) VALUES (?, ?)`,
				[username, password]
			);
		} catch (err) {
			console.log('REGISTER ERROR:', err);
		}

		throw redirect(303, '/login');
	}
};