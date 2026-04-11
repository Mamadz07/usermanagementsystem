<script>
	export let data;
</script>

<h1 class="text-2xl font-bold mb-5">Dashboard</h1>

<table class="w-full border">
	<tr class="bg-gray-200">
		<th>ID</th>
		<th>Username</th>
		<th>Alamat</th>
		<th>Aksi</th>
	</tr>

	{#each data.users as user}
	<tr class="border">
		<td>{user.id}</td>
		<td>{user.username}</td>
		<td>{user.alamat || '-'}</td>
		<td>
			<form method="POST" action="/dashboard/delete">
				<input type="hidden" name="id" value={user.id} />
				<button class="bg-red-500 text-white px-2 py-1 rounded">
					Hapus
				</button>
			</form>
		</td>
	</tr>
	{/each}
</table>