import { db } from '$lib/server/db';
import { users } from '$lib/server/schema';
import { redirect, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

//  HANYA 1 LOAD
export async function load({ cookies }) {
	const session = cookies.get('session');

	if (!session) {
		throw redirect(303, '/login');
	}

	const allUsers = await db.select().from(users);

	return {
		users: allUsers
	};
}

export const actions = {
	// LOGOUT
	logout: async ({ cookies }) => {
		cookies.delete('session', { path: '/' });
		throw redirect(303, '/login');
	},

	default: async ({ request }) => {
		const data = await request.formData();

		const formAction = data.get('action');
		const id = data.get('id');

		if (formAction === 'create') {
			const username = data.get('username');
			const password = data.get('password');

			await db.insert(users).values({
				username,
				password
			});
		}

		if (formAction === 'update') {
			const alamat = data.get('alamat');

			await db
				.update(users)
				.set({ alamat })
				.where(eq(users.id, Number(id)));
		}

		if (formAction === 'delete') {
			await db
				.delete(users)
				.where(eq(users.id, Number(id)));
		}

		if (formAction === 'uploadFoto') {
			const file = data.get('foto');

			if (!file || file.size === 0) {
				return fail(400, { error: 'File tidak ada' });
			}

			const buffer = await file.arrayBuffer();

			let binary = '';
			const bytes = new Uint8Array(buffer);

			for (let i = 0; i < bytes.length; i++) {
				binary += String.fromCharCode(bytes[i]);
			}

			const base64 = btoa(binary);
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