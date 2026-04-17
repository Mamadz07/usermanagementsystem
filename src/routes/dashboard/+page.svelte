<script>
	export let data;

	let selectedUser = null;

	function selectUser(user) {
		selectedUser = user;
	}
</script>
<form method="POST" action="?/logout">
	<button class="bg-red-500 text-white px-4 py-2 rounded">
		Logout
	</button>
</form>

<div class="p-6 bg-gray-100 min-h-screen">
	<div class="grid md:grid-cols-2 gap-6">

		<!-- 🔵 DETAIL USER -->
		<div class="bg-white p-6 rounded-xl shadow">
			{#if selectedUser}
				<h2 class="text-xl font-bold mb-4">Detail User</h2>
<!-- FOTO UPLOAD -->
<form method="POST" enctype="multipart/form-data" class="text-center">
	<input type="hidden" name="id" value={selectedUser.id} />
	<input type="hidden" name="action" value="uploadFoto" />

	<!-- LABEL TERHUBUNG KE INPUT -->
	<label for="fotoInput" class="cursor-pointer flex justify-center mb-4">
		{#if selectedUser.foto}
			<img 
				src={selectedUser.foto} 
				class="w-20 h-20 rounded-full object-cover border"
				alt="Foto User"
			/>
		{:else}
			<div class="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
				📷
			</div>
		{/if}
	</label>

	<!-- INPUT DISEMBUNYIKAN -->
	<input 
		id="fotoInput"
		type="file" 
		name="foto" 
		accept="image/*"
		class="hidden"
		required 
	/>

	<button class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded w-full transition">
		Upload Foto
	</button>
</form>


				<!-- UPDATE -->
				<form method="POST" class="space-y-3 mt-4">
					<input type="hidden" name="id" value={selectedUser.id} />
					<input type="hidden" name="action" value="update" />

					<input value={selectedUser.username} disabled class="w-full border p-2 rounded bg-gray-100" />

					<input name="alamat" placeholder="Alamat" class="w-full border p-2 rounded" />

					<button class="bg-yellow-500 text-white py-2 w-full rounded">
						Update
					</button>
				</form>

				<!-- DELETE -->
				<form method="POST" class="mt-3">
					<input type="hidden" name="id" value={selectedUser.id} />
					<input type="hidden" name="action" value="delete" />

					<button class="bg-red-500 text-white py-2 w-full rounded">
						Delete
					</button>
				</form>

			{:else}
				<div class="text-center text-gray-400">
					<h2>Pilih User</h2>
				</div>
			{/if}
		</div>

		<!-- 🟢 LIST USER -->
		<div class="bg-white p-6 rounded-xl shadow">
			<h2 class="text-xl font-bold mb-4">Users</h2>

			{#each data.users as user}
				<div 
					class="flex items-center gap-3 p-3 border rounded mb-2 cursor-pointer hover:bg-gray-100"
					on:click={() => selectUser(user)}
				>
					{#if user.foto}
						<img src={user.foto} class="w-10 h-10 rounded-full object-cover" />
					{:else}
						<div class="w-10 h-10 bg-gray-300 rounded-full"></div>
					{/if}

					<div>
						<p class="font-semibold">{user.username}</p>
						<p class="text-sm text-gray-500">{user.alamat || '-'}</p>
					</div>
				</div>
			{/each}
		</div>

	</div>
</div>