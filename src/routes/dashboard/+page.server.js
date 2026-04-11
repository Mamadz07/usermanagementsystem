import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema.js';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const user = cookies.get('user');

	if (!user) {
		throw redirect(303, '/login');
	}

	// ambil semua user
	const allUsers = await db.select().from(users);

	return {
		users: allUsers
	};
}