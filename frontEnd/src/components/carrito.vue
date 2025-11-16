<template>
  <div class="p-12">
    <h1 class="text-3xl font-bold text-center mb-6">Carrito de Compras</h1>

    <!-- Mensaje si carrito vacío -->
    <p v-if="carrito.length === 0" class="text-center text-gray-500 text-lg py-6">
      Tu carrito está vacío
    </p>

    <!-- Lista de productos en carrito -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="producto in carrito"
        :key="producto.id"
        class="bg-white rounded-lg shadow p-4 flex flex-col items-center"
      >
        <img
          :src="`/${producto.producto_imagen}`"
          alt="Producto"
          class="w-full h-48 object-cover rounded mb-4"
        />
        <p class="font-medium text-lg text-center mb-1">{{ producto.producto_Nombre }}</p>
        <p class="text-gray-600 mb-2">Precio: ${{ producto.producto_Precio }}</p>

        <!-- Contador de cantidad -->
        <div class="flex items-center gap-2 mb-2">
          <button 
            @click="disminuirCantidad(producto.id)"
            class="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400 transition"
          >-</button>
          <span class="px-2">{{ producto.cantidad }}</span>
          <button 
            @click="aumentarCantidad(producto.id)"
            class="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400 transition"
          >+</button>
        </div>

        <p class="font-bold text-xl text-amber-600 mb-2">Subtotal: ${{ subtotal(producto) }}</p>

        <!-- Botón eliminar -->
        <button
          @click="eliminarProducto(producto.id)"
          class="mt-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Eliminar
        </button>
      </div>
    </div>

    <!-- Total del carrito -->
    <div v-if="carrito.length > 0" class="mt-6 text-right text-xl font-bold">
      Total: ${{ totalCarrito }}
    </div>

    <!-- Botón Pagar con PayPhone -->
    <div v-if="carrito.length > 0" class="mt-4 text-right">
      <button
        @click="pagarConPayPhone"
        class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Pagar con PayPhone
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Carrito",
  data() {
    return {
      carrito: JSON.parse(localStorage.getItem("carrito")) || [],
    };
  },
  methods: {
    // Calcula subtotal de un producto
    subtotal(producto) {
      return (producto.cantidad * parseFloat(producto.producto_Precio)).toFixed(2);
    },

    // Eliminar producto
    eliminarProducto(id) {
      this.carrito = this.carrito.filter(p => p.id !== id);
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
    },

    // Aumentar cantidad
    aumentarCantidad(id) {
      const prod = this.carrito.find(p => p.id === id);
      if (prod) {
        prod.cantidad++;
        localStorage.setItem("carrito", JSON.stringify(this.carrito));
      }
    },

    // Disminuir cantidad
    disminuirCantidad(id) {
      const prod = this.carrito.find(p => p.id === id);
      if (prod && prod.cantidad > 1) {
        prod.cantidad--;
      } else if (prod && prod.cantidad === 1) {
        this.eliminarProducto(id);
      }
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
    },

    // Pagar con PayPhone y guardar en tbl_Pedidos
    async pagarConPayPhone() {
      if (this.carrito.length === 0) return alert("Carrito vacío");

      // Preparar pedido
      const pedido = {
        usuario_id: 1, // reemplaza con tu usuario logueado
        productos: this.carrito.map(p => ({
          producto_id: p.id,
          cantidad: p.cantidad
        })),
        total: this.totalCarrito,
        fecha: new Date().toISOString(),
        estado: "pendiente",
        payphone_id: null // aquí luego se agregará el ID de pago real desde PayPhone
      };

      try {
        const respuesta = await fetch("http://localhost:3000/pedidos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pedido)
        });
        const datos = await respuesta.json();
        alert("Pago generado! Pedido creado con ID: " + datos.id);

        // Limpiar carrito
        this.carrito = [];
        localStorage.removeItem("carrito");
      } catch (err) {
        alert("Error al procesar el pago: " + err.message);
      }
    }
  },
  computed: {
    totalCarrito() {
      return this.carrito
        .reduce((acc, p) => acc + p.cantidad * parseFloat(p.producto_Precio), 0)
        .toFixed(2);
    },
  },
};
</script>

<style scoped>
.transition {
  transition: transform 0.2s ease-in-out;
}
</style>
