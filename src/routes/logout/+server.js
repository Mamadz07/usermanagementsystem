import { redirect } from '@sveltejs/kit';

export function POST({ cookies }) {
	cookies.delete('user', { path: '/' });
	throw redirect(303, '/login');
}