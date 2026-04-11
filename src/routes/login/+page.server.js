import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema.js';
import { redirect, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const username = data.get('username');
		const password = data.get('password');

		const result = await db
	.select()
	.from(users)
	.where(eq(users.username, username));

const user = result[0];
		if (!user || user.password !== password) {
			return fail(400, { message: 'Username atau password salah' });
		}
cookies.set('user', String(user.id), {
	path: '/',
	httpOnly: true,
	sameSite: 'lax',
    secure: false
});
		throw redirect(303, '/dashboard');
	}
};