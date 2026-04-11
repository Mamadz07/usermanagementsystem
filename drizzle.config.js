export default {
	schema: './src/lib/server/db/schema.js',
	out: './drizzle',
	dialect: 'sqlite',
	dbCredentials: {
		url: 'file:./dev.db'
	}
};