<template>
  <div class="p-12 relative">
    <h1 class="text-3xl font-bold text-center mb-6">Tienda Online</h1>

    <!-- Mensaje de carga -->
    <p v-if="cargando" class="text-center text-lg py-6">Cargando productos...</p>

    <!-- Mensaje de error -->
    <p v-if="error" class="text-center text-red-500 py-6">{{ error }}</p>

    <!-- Controles: búsqueda y orden con carrito al lado -->
    <div class="flex flex-col md:flex-row md:justify-between gap-4 mb-6 items-center">
      <!-- Input búsqueda -->
      <input
        v-model="titulo"
        placeholder="Buscar por nombre"
        class="p-2 border rounded w-full md:w-1/2"
      />

      <!-- Select Orden + Carrito -->
      <div class="flex items-center gap-4 w-full md:w-1/2 justify-end">
        <select v-model="orden" class="p-2 border rounded w-1/2 md:w-auto">
          <option value="">Orden</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <!-- Botón Carrito -->
        <router-link to="/carrito" class="relative bg-gray-900 text-white px-4 py-2 rounded-md">
          🛒 Carrito
          <span 
            v-if="totalCantidad > 0" 
            class="absolute -top-2 -right-2 bg-red-500 w-5 h-5 text-xs flex items-center justify-center rounded-full">
            {{ totalCantidad }}
          </span>
        </router-link>
      </div>
    </div>

    <!-- Mensaje si no hay productos -->
    <div v-if="!cargando && productosFiltrados.length === 0" class="text-center text-gray-500">
      No hay productos disponibles
    </div>

    <!-- Productos -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="producto in productosFiltrados"
        :key="producto.id"
        class="bg-white rounded-lg shadow p-4 hover:scale-105 transition transform"
      >
        <!-- Imagen actualizada -->
        <img
          :src="`http://localhost:3000/${producto.producto_imagen}`"
          alt="Producto"
          class="w-full h-52 object-cover rounded mb-4"
        />
        <p class="font-medium text-lg text-center mb-2">{{ producto.producto_Nombre }}</p>
        <p class="font-bold text-xl text-center text-amber-600">${{ producto.producto_Precio }}</p>
        <p class="text-sm text-gray-500 mt-2">{{ producto.producto_descripcion }}</p>

        <!-- Botón añadir al carrito -->
        <button
          @click="agregarAlCarrito(producto)"
          class="mt-4 w-full border border-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productos: [],
      cargando: true,
      error: null,
      titulo: "",
      orden: "",
      carrito: [] // carrito de compras
    };
  },
  async mounted() {
    try {
      const conexion = await fetch("http://localhost:3000/productos");
      if (!conexion.ok) throw new Error("Error al conectar con la API");
      this.productos = await conexion.json();

      // Cargar carrito desde localStorage
      const carritoGuardado = localStorage.getItem("carrito");
      if (carritoGuardado) this.carrito = JSON.parse(carritoGuardado);
    } catch (err) {
      this.error = "ERROR AL OBTENER DATOS";
    } finally {
      this.cargando = false;
    }
  },
  computed: {
    productosFiltrados() {
      let lista = this.productos;

      // Filtrar por búsqueda
      if (this.titulo) {
        lista = lista.filter((p) =>
          p.producto_Nombre.toLowerCase().includes(this.titulo.toLowerCase())
        );
      }

      // Ordenar A-Z
      if (this.orden === "asc") {
        lista = lista.slice().sort((a, b) => a.producto_Nombre.localeCompare(b.producto_Nombre));
      }
      // Orden Z-A
      if (this.orden === "desc") {
        lista = lista.slice().sort((a, b) => b.producto_Nombre.localeCompare(a.producto_Nombre));
      }

      return lista;
    },
    // Cantidad total de productos en el carrito
    totalCantidad() {
      return this.carrito.reduce((acc, item) => acc + item.cantidad, 0);
    }
  },
  methods: {
    agregarAlCarrito(producto) {
      const existe = this.carrito.find(p => p.id === producto.id);
      if (existe) {
        existe.cantidad++;
      } else {
        this.carrito.push({ ...producto, cantidad: 1 });
      }

      // Guardar carrito en localStorage
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
    }
  }
};
</script>

<style scoped>
.transition {
  transition: transform 0.2s ease-in-out;
}
</style>
