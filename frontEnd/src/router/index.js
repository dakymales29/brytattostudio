import { createRouter, createWebHistory } from 'vue-router';
// Importa tus componentes
import home from '../components/home.vue';
import login from '../components/login.vue';
import admin from '../components/admin.vue';
import tienda from '../components/tienda.vue';
import carrito from '../components/carrito.vue';


const routes = [
  { path: '/', redirect: '/home' },//ruta principal
  { path: '/home', component: home },
  { path: '/login', component: login },//ruta login|
  { path: '/admin', component: admin },//ruta admin
  { path: '/tienda', component: tienda},//ruta tienda
  { path: '/carrito', component: carrito}//ruta carrito
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protección básica de rutas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // obtenemos token del login

  if (to.path === '/admin' && !token) {
    next('/login'); // si no hay token y quiere entrar a admin, lo manda al login
  } else if (to.path === '/login' && token) {
    next('/admin'); // si ya está logeado, no puede volver a login
  } else {
    next(); // si no hay restricción, sigue
  }
});

export default router;
