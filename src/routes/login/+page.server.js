import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export async function load() {
	// biar halaman login bisa dibuka tanpa error
	return {};
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const username = data.get('username');
		const password = data.get('password');

		try {
			const result = await db.run(
				`SELECT * FROM users WHERE username = ?`,
				[username]
			);

			const user = result.rows?.[0];

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