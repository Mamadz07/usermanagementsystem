import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const username = data.get('username');
		const password = data.get('password');

		try {
			const user = await db.query.users.findFirst({
				where: (u, { eq }) => eq(u.username, username)
			});

			if (user && user.password === password) {
				throw redirect(303, '/dashboard');
			}
		} catch (e) {
			console.log('LOGIN ERROR:', e);
		}

		return { error: 'Login gagal' };
	}
};