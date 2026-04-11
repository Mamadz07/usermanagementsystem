import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

if (action === 'uploadFoto') {
	const file = data.get('foto');
	const id = data.get('id');

	if (file && file.name) {
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

export async function POST({ request }) {
	const data = await request.formData();

	const id = data.get('id');
	const alamat = data.get('alamat');

	await db
		.update(users)
		.set({ alamat })
		.where(eq(users.id, Number(id)));

	throw redirect(303, '/dashboard');
}