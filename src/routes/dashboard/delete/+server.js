import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export async function POST({ request }) {
	const data = await request.formData();
	const id = data.get('id');

	await db.delete(users).where(eq(users.id, Number(id)));

	throw redirect(303, '/dashboard');
}