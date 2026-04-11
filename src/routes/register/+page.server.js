import { db } from '$lib/db';
import { users } from '$lib/server\db/schema';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const username = data.get('username');
		const password = data.get('password');

		await db.insert(users).values({
			username,
			password
		});

		return { success: true };
	}
};