import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { redirect, fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const username = data.get('username')?.toString();
		const password = data.get('password')?.toString();

		// 🔥 DEBUG (penting)
		console.log('LOGIN INPUT:', username, password);

		const result = await db
			.select()
			.from(users)
			.where(eq(users.username, username));

		console.log('DB RESULT:', result);

		const user = result[0];

		if (!user) {
			return fail(400, { error: 'User tidak ditemukan' });
		}

		if (user.password !== password) {
			return fail(400, { error: 'Password salah' });
		}

		// ✅ kalau lolos semua
		throw redirect(303, '/dashboard');
	}
};