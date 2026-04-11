export function load({ cookies }) {
	const user = cookies.get('user');

	console.log('COOKIE:', user);

	if (!user) {
		throw redirect(303, '/login');
	}
}