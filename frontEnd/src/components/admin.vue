<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Header -->
    <header class="bg-black text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">Panel de Admin</h1>
      <button @click="logout" class="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition">
        Logout
      </button>
    </header>

    <!-- Contenido principal -->
    <main class="flex-1 p-6">
      <h2 class="text-2xl font-semibold mb-4">Bienvenido, {{ usuario.nombre }}</h2>

      <div class="p-12 relative">
        <h1 class="text-3xl font-bold text-center mb-6">PANEL DE CONTROL</h1>

        <!-- Mensaje de carga -->
        <p v-if="cargando" class="text-center text-lg py-6">Cargando productos...</p>

        <!-- Mensaje de error -->
        <p v-if="error" class="text-center text-red-500 py-6">{{ error }}</p>

        <!-- Controles: búsqueda, orden y crear -->
        <div class="flex flex-col md:flex-row md:justify-between gap-4 mb-6 items-center">
          <input
            v-model="titulo"
            placeholder="Buscar por nombre"
            class="p-2 border rounded w-full md:w-1/2"
          />
          <div class="flex items-center gap-4 w-full md:w-1/2 justify-end">
            <select v-model="orden" class="p-2 border rounded w-1/2 md:w-auto">
              <option value="">Orden</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
            <button @click="abrirModalCrear" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Crear
            </button>
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
            <img
              :src="`http://localhost:3000/${producto.producto_imagen}`"
              alt="Producto"
              class="w-full h-52 object-cover rounded mb-4"
            />
            <p class="font-medium text-lg text-center mb-2">{{ producto.producto_Nombre }}</p>
            <p class="font-bold text-xl text-center text-amber-600">${{ producto.producto_Precio }}</p>
            <p class="text-sm text-gray-500 mt-2">{{ producto.producto_descripcion }}</p>

            <!-- Botones -->
            <div class="flex justify-around mt-4">
              <button @click="editarProducto(producto)" class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">
                Actualizar
              </button>
              <button @click="eliminarProducto(producto.id)" class="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition">
                Eliminar
              </button>
            </div>
          </div>
        </div>

        <!-- Modal de edición -->
        <div v-if="mostrarModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div class="bg-white p-6 rounded shadow w-96">
            <h2 class="text-xl font-bold mb-4">{{ modalTipo === 'editar' ? 'Actualizar Producto' : 'Crear Producto' }}</h2>
            <input v-model="productoEdit.producto_Nombre" placeholder="Nombre" class="w-full p-2 border rounded mb-2" />
            <input v-model="productoEdit.producto_Precio" placeholder="Precio" class="w-full p-2 border rounded mb-2" />
            <textarea v-model="productoEdit.producto_descripcion" placeholder="Descripción" class="w-full p-2 border rounded mb-2"></textarea>
            <input type="file" @change="cambiarImagen" class="mb-4" />

            <div class="flex justify-end gap-2">
              <button v-if="modalTipo === 'editar'" @click="actualizarProducto" class="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition">Guardar</button>
              <button v-else @click="crearProducto" class="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition">Crear</button>
              <button @click="cerrarModal" class="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500 transition">Cancelar</button>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      usuario: JSON.parse(localStorage.getItem("usuario")) || { nombre: "Admin" },
      productos: [],
      cargando: true,
      error: null,
      titulo: "",
      orden: "",
      mostrarModal: false,
      modalTipo: 'editar', // 'editar' o 'crear'
      productoEdit: {},
      nuevaImagen: null,
    };
  },
  async mounted() {
    await this.cargarProductos();
  },
  computed: {
    productosFiltrados() {
      let lista = this.productos;
      if (this.titulo) {
        lista = lista.filter(p =>
          p.producto_Nombre.toLowerCase().includes(this.titulo.toLowerCase())
        );
      }
      if (this.orden === "asc") lista = lista.slice().sort((a, b) => a.producto_Nombre.localeCompare(b.producto_Nombre));
      if (this.orden === "desc") lista = lista.slice().sort((a, b) => b.producto_Nombre.localeCompare(a.producto_Nombre));
      return lista;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      this.$router.push("/home");
    },
    async cargarProductos() {
      try {
        const res = await fetch("http://localhost:3000/productos");
        this.productos = await res.json();
      } catch (err) {
        this.error = "ERROR AL OBTENER DATOS";
      } finally {
        this.cargando = false;
      }
    },
    editarProducto(producto) {
      this.productoEdit = { ...producto };
      this.mostrarModal = true;
      this.modalTipo = 'editar';
      this.nuevaImagen = null;
    },
    abrirModalCrear() {
      this.productoEdit = { producto_Nombre: '', producto_Precio: '', producto_descripcion: '', producto_imagen: '' };
      this.mostrarModal = true;
      this.modalTipo = 'crear';
      this.nuevaImagen = null;
    },
    cambiarImagen(event) {
      this.nuevaImagen = event.target.files[0];
    },
    cerrarModal() {
      this.mostrarModal = false;
      this.productoEdit = {};
      this.nuevaImagen = null;
    },
   async actualizarProducto() {
  try {
    const formData = new FormData();
    formData.append("producto_Nombre", this.productoEdit.producto_Nombre);
    formData.append("producto_Precio", this.productoEdit.producto_Precio);
    formData.append("producto_descripcion", this.productoEdit.producto_descripcion);

    // Si hay nueva imagen, se envía
    if (this.nuevaImagen) {
      formData.append("producto_imagen", this.nuevaImagen);
    } else {
      // Si NO hay nueva imagen, enviar la ruta actual
      formData.append("producto_imagen", this.productoEdit.producto_imagen);
    }

    const res = await fetch(`http://localhost:3000/productos/${this.productoEdit.id}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Error al actualizar producto");
    }

    await this.cargarProductos();
    this.cerrarModal();
  } catch (err) {
    alert(err.message);
  }
},
    async crearProducto() {
      try {
        const formData = new FormData();
        formData.append("producto_Nombre", this.productoEdit.producto_Nombre);
        formData.append("producto_Precio", this.productoEdit.producto_Precio);
        formData.append("producto_descripcion", this.productoEdit.producto_descripcion);
        if (this.nuevaImagen) formData.append("producto_imagen", this.nuevaImagen);

        const res = await fetch(`http://localhost:3000/productos`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || "Error al crear producto");
        }

        await this.cargarProductos();
        this.cerrarModal();
      } catch (err) {
        alert(err.message);
      }
    },
    async eliminarProducto(id) {
  if (!confirm("¿Estás seguro de eliminar este producto?")) return;
  try {
    const res = await fetch(`http://localhost:3000/productos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Error al eliminar producto");
    }

    await this.cargarProductos();
  } catch (err) {
    alert(err.message);
  }
}
  },
};
</script>

<style scoped>
.transition {
  transition: transform 0.2s ease-in-out;
}
button {
  transition: all 0.2s ease-in-out;
}
</style>
