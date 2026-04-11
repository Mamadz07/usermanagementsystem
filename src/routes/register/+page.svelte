<script>
	let username = '';
	let password = '';
</script>

<form method="POST" class="max-w-md mx-auto mt-10 space-y-4">
	<h1 class="text-2xl font-bold">Register</h1>

	<input
		type="text"
		name="username"
		placeholder="Username"
		bind:value={username}
		class="w-full border p-2 rounded"
		required
	/>

	<input
		type="password"
		name="password"
		placeholder="Password"
		bind:value={password}
		class="w-full border p-2 rounded"
		required
	/>

	<button class="bg-blue-500 text-white px-4 py-2 rounded w-full">
		Register
	</button>
</form>