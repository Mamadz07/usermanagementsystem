<script>
	function goTo(path) {
		window.location.href = path;
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
	<div class="bg-white p-10 rounded-2xl shadow-xl text-center w-full max-w-md">
		
		<h1 class="text-3xl font-bold text-gray-800 mb-4">
			User Management System
		</h1>

		<p class="text-gray-500 mb-8">
			Silakan masuk atau daftar untuk melanjutkan
		</p>

		<div class="flex flex-col gap-4">
			<button
				on:click={() => goTo('/login')}
				class="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
			>
				Login
			</button>

			<button
				on:click={() => goTo('/register')}
				class="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
			>
				Register
			</button>
		</div>

	</div>
</div>