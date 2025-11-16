<template>
  <div class="relative min-h-screen bg-white font-sans text-gray-900">
    <!-- Navbar: solo se muestra si NO estamos en /login o /admin -->
    <nav v-if="$route.path !== '/login' && $route.path !== '/admin'" class="fixed top-0 w-full bg-amber-400 text-white shadow-md z-50 h-36">
      <div class="max-w-7xl mx-auto px-4 flex justify-between items-center h-full">
        <!-- Logo -->
        <img src="./assets/logo.png" alt="Logo" class="h-32 w-auto" />

        <!-- Desktop menu -->
        <div class="hidden md:flex space-x-6 items-center">
          <a href="https://www.facebook.com/profile.php?id=100081056576789" target="_blank">
            <img src="./assets/facebook.svg" alt="Facebook" class="w-10 hover:opacity-80 hover:w-11 transition-all" />
          </a>
          <a href="https://www.instagram.com/bry.tatto/" target="_blank">
            <img src="./assets/insta.svg" alt="Instagram" class="w-10 hover:opacity-80 hover:w-11 transition-all" />
          </a>
          <a href="https://www.tiktok.com/@bry.tattoo.studio?is_from_webapp=1&sender_device=pc" target="_blank">
            <img src="./assets/tiktok.svg" alt="TikTok" class="w-10 hover:opacity-80 hover:w-11 transition-all" />
          </a>
          <a href="https://wa.me/593990777944" target="_blank">
            <img src="./assets/wtsp.png" alt="WhatsApp" class="w-10 hover:opacity-80 hover:w-11 transition-all" />
          </a>

          <!-- Botón dinámico -->
          <button
            @click="manejarBoton"
            class="ml-4 px-4 py-2 text-gray-900 border border-gray-900 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
          >
            {{ botonTexto }}
          </button>
        </div>

        <!-- Mobile hamburger -->
        <div class="md:hidden flex items-center">
          <button @click="open = !open" class="focus:outline-none">
            <svg v-if="!open" class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu dropdown -->
      <div v-if="open" class="md:hidden bg-amber-400 flex flex-col items-center space-y-4 py-6">
        <a href="https://www.facebook.com/profile.php?id=100081056576789" target="_blank">
          <img src="./assets/facebook.svg" alt="Facebook" class="w-10 hover:opacity-80 hover:w-11 transition-all" />
        </a>
        <a href="https://www.instagram.com/bry.tatto/" target="_blank">
          <img src="./assets/insta.svg" alt="Instagram" class="w-10 hover:opacity-80 hover:w-11 transition-all" />
        </a>
        <a href="https://www.tiktok.com/@bry.tattoo.studio" target="_blank">
          <img src="./assets/tiktok.svg" alt="TikTok" class="w-10 hover:opacity-80 hover:w-11 transition-all" />
        </a>
        <a href="https://wa.me/593990777944" target="_blank">
          <img src="./assets/wtsp.png" alt="WhatsApp" class="w-10 hover:opacity-80 hover:w-11 transition-all" />
        </a>

        <!-- Botón dinámico móvil -->
        <button
          @click="manejarBoton"
          class="px-4 py-2 text-gray-900 border border-gray-900 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
        >
          {{ botonTexto }}
        </button>
      </div>
    </nav>

    <!-- Contenido principal -->
    <div :class="$route.path !== '/login' && $route.path !== '/admin' ? 'pt-28' : ''">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false
    };
  },
  computed: {
    botonTexto() {
      if (this.$route.path === '/login' || this.$route.path === '/admin') return '';
      if (this.$route.path === '/tienda') return 'Iniciar Sesión';
      return 'TIENDA ONLINE';
    }
  },
  methods: {
    manejarBoton() {
      if (this.$route.path === '/tienda') {
        this.$router.push('/login');
      } else {
        this.$router.push('/tienda');
      }
    }
  }
};
</script>
