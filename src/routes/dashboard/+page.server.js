import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { redirect, fail } from '@sveltejs/kit';

export async function load() {
	const allUsers = await db.select().from(users);

	return {
		users: allUsers
	};
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const formAction = data.get('action');
		const id = data.get('id');

		//  CREATE
		if (formAction === 'create') {
			const username = data.get('username');
			const password = data.get('password');

			await db.insert(users).values({
				username,
				password
			});
		}

		//  UPDATE ALAMAT
		if (formAction === 'update') {
			const alamat = data.get('alamat');

			await db
				.update(users)
				.set({ alamat })
				.where(eq(users.id, Number(id)));
		}

		//  DELETE
		if (formAction === 'delete') {
			await db
				.delete(users)
				.where(eq(users.id, Number(id)));
		}

		//  UPLOAD FOTO 
		if (formAction === 'uploadFoto') {
	const file = data.get('foto');

	if (!file || file.size === 0) {
		return fail(400, { error: 'File tidak ada' });
	}

	const buffer = await file.arrayBuffer();

	// ✅ FIX DI SINI
	const base64 = Buffer.from(buffer).toString('base64');

	const mimeType = file.type;

	const fotoBase64 = `data:${mimeType};base64,${base64}`;

	await db
		.update(users)
		.set({ foto: fotoBase64 })
		.where(eq(users.id, Number(id)));
}
		throw redirect(303, '/dashboard');
	}
};