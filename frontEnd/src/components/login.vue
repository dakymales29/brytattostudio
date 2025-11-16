<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 bg-cover bg-center px-4">
    <div class="bg-gray-800/80 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md border-2 border-yellow-400 backdrop-blur-sm">
      <h1 class="text-2xl sm:text-3xl font-bold text-center mb-6 text-yellow-400">Iniciar Sesión</h1>

      <!-- Mensaje de error -->
      <p v-if="error" class="text-red-500 text-center mb-4 text-sm sm:text-base">{{ error }}</p>

      <form @submit.prevent="login">
        <!-- Correo -->
        <div class="mb-4">
          <label class="block text-yellow-400 mb-1 text-sm sm:text-base">Correo</label>
          <input
            v-model="correo"
            type="email"
            placeholder="correo@ejemplo.com"
            class="w-full p-2 sm:p-3 border border-gray-700 rounded bg-gray-900 text-yellow-50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        <!-- Contraseña -->
        <div class="mb-4">
          <label class="block text-yellow-400 mb-1 text-sm sm:text-base">Contraseña</label>
          <input
            v-model="password"
            type="password"
            placeholder="********"
            class="w-full p-2 sm:p-3 border border-gray-700 rounded bg-gray-900 text-yellow-50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        <!-- Botón Login -->
        <button
          type="submit"
          class="w-full bg-yellow-400 text-gray-900 py-2 sm:py-3 rounded hover:bg-yellow-500 transition font-bold text-sm sm:text-base"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      correo: "",
      password: "",
      error: null
    };
  },
  methods: {
    async login() {
      this.error = null;
      try {
        const res = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correo: this.correo, password: this.password })
        });

        const data = await res.json();

        if (!res.ok) {
          this.error = data.error || "Error al iniciar sesión";
          return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        this.$router.push("/admin");

      } catch (err) {
        this.error = "Error de conexión: " + err.message;
      }
    }
  }
};
</script>

<style scoped>
.transition {
  transition: all 0.2s ease-in-out;
}
</style>
