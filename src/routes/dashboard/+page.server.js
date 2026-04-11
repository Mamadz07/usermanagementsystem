import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export async function load() {
	const allUsers = await db.select().from(users);

	return {
		users: allUsers
	};
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const action = data.get('action');
		const id = data.get('id');

		// 🔵 CREATE
		if (action === 'create') {
			const username = data.get('username');
			const password = data.get('password');

			await db.insert(users).values({
				username,
				password
			});
		}

		// 🟡 UPDATE ALAMAT
		if (action === 'update') {
			const alamat = data.get('alamat');

			await db
				.update(users)
				.set({ alamat })
				.where(eq(users.id, Number(id)));
		}

		// 🔴 DELETE
		if (action === 'delete') {
			await db
				.delete(users)
				.where(eq(users.id, Number(id)));
		}

		// 🟣 UPLOAD FOTO
		if (action === 'uploadFoto') {
			const file = data.get('foto');

			if (file && file.size > 0) {
				const bytes = await file.arrayBuffer();
				const buffer = Buffer.from(bytes);

				const fileName = Date.now() + '-' + file.name;
				const filePath = path.join('static/uploads', fileName);

				fs.writeFileSync(filePath, buffer);

				const fileUrl = '/uploads/' + fileName;

				await db
					.update(users)
					.set({ foto: fileUrl })
					.where(eq(users.id, Number(id)));
			}
		}

		throw redirect(303, '/dashboard');
	}
};