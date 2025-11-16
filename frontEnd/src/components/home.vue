<template>
  <div>
    <!-- Banner -->
    <div>
      <img
        :src="imagenActual"
        alt="Banner"
        class="transition-opacity duration-1000 lg:w-full lg:h-auto h-72"
        :class="opacidad === 0 ? 'opacity-0' : 'opacity-100'"
        loading="lazy"
      />
    </div>

    <!-- Sección Información -->
    <section
      class="relative bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${imgFondo})` }"
    >
      <div class="absolute inset-0 bg-black/60"></div>
      <div class="flex flex-col lg:flex-row justify-center items-center lg:space-x-40 py-16 lg:py-36 px-4">
        <!-- Texto -->
        <div class="w-full lg:w-96 text-center lg:text-left z-10">
          <h1 class="text-center py-4 text-2xl font-medium lg:text-2xl text-white">
            ¡¡...Conoce BryTatto Studio...!!
          </h1>
          <h2 class="text-amber-400 text-balance py-4 lg:text-base">
            "Donde cada trazo de tinta se convierte en una obra de arte única,
            rompiendo lo convencional sin límites"
          </h2>
          <p class="text-justify lg:text-xl text-white">
            "Bryan Carrasco es un tatuador apasionado que ha dedicado su vida a
            transformar ideas en arte para la piel. Su habilidad para capturar
            la esencia de cada persona lo ha convertido en un referente para
            quienes buscan diseños únicos y significativos. En BryTatto Studio,
            cada tatuaje es más que una imagen: es una obra maestra creada con
            pasión, precisión y amor al arte. ¡Tu piel es el lienzo y él el
            artista!"
          </p>

          <div class="hidden lg:block text-white">
            <a
              href="https://wa.me/593990777944"
              class="px-6 py-3 mt-8 block text-center mx-auto w-max border border-amber-400 rounded-full 
              hover:bg-amber-400 hover:text-white hover:border-amber-400 transition-all duration-500 lg:text-xl"
            >
              Agenda tu cita
            </a>
          </div>
        </div>

        <!-- Imagen -->
        <div class="mt-8 lg:mt-0 z-10">
          <img
            :src="imgInfo"
            class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg"
            loading="lazy"
          />
        </div>

        <div class="lg:hidden mt-4 text-white z-10">
          <a
            href="https://wa.me/593990777944"
            class="px-6 py-3 block text-center mx-auto w-max border border-amber-400 rounded-full 
            hover:bg-amber-400 hover:text-white hover:border-amber-400 transition-all duration-500"
          >
            AGENDA TU CITA
          </a>
        </div>
      </div>
    </section>

    <!-- Sección Tatuajes -->
    <section
      class="relative bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${imgTatuajesFondo})` }"
    >
      <div class="absolute inset-0 bg-black/60 z-0"></div>

      <div class="relative text-white text-center z-10 py-10">
        <h1 class="py-7 text-2xl font-extrabold lg:text-3xl text-white">Tatuajes Personalizados</h1>
        <p class="lg:text-xl max-w-3xl mx-auto">
          "Descubre tu estilo y lleva en tu piel un diseño único con trazos impecables,
          marcando tu esencia con arte que trasciende."
        </p>

        <!-- Primera fila -->
        <div class="flex flex-col justify-center items-center text-center lg:flex-row lg:justify-around mt-10">
          <div class="py-7 z-10" v-for="(img, index) in fila1" :key="index">
            <img :src="img.src" :alt="img.alt" loading="lazy" class="w-72 h-80 object-cover py-5" />
            <p class="text-white text-2xl font-extrabold">{{ img.titulo }}</p>
          </div>
        </div>

        <!-- Segunda fila -->
        <div class="flex flex-col justify-center items-center text-center lg:flex-row lg:justify-around mt-10">
          <div class="py-7 z-10" v-for="(img, index) in fila2" :key="index">
            <img :src="img.src" :alt="img.alt" loading="lazy" class="w-72 h-80 object-cover py-5" />
            <p class="text-white text-2xl font-extrabold">{{ img.titulo }}</p>
          </div>
        </div>

        <!-- Tercera fila -->
        <div class="flex flex-col justify-center items-center text-center lg:flex-row lg:justify-around mt-10">
          <div class="py-7 z-10" v-for="(img, index) in fila3" :key="index">
            <img :src="img.src" :alt="img.alt" loading="lazy" class="w-72 h-80 object-cover py-5" />
            <p class="text-white text-2xl font-extrabold">{{ img.titulo }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección Perforaciones -->
<section class="bg-black text-white text-center py-7">
  <h1 class="text-2xl font-extrabold lg:text-3xl">Perforaciones y Expansiones</h1>
  <p class="lg:text-xl px-4 py-7 text-balance">
    "Realizamos perforaciones y expansiones de manera profesional, garantizando la máxima seguridad y calidad en cada procedimiento,
    para que luzcas un estilo único y personalizado con total confianza."
  </p>

  <div class="overflow-x-auto flex gap-4 px-4 py-4 scrollbar-hide snap-x snap-mandatory">
    <div 
      v-for="(img, index) in perforaciones" 
      :key="index"
      class="flex-shrink-0 snap-center"
    >
      <img 
        :src="img" 
        alt="Perforación" 
        class="w-72 sm:w-80 md:w-72 lg:w-60 xl:w-72 h-80 sm:h-96 md:h-80 lg:h-80 xl:h-80 object-cover rounded-lg shadow-lg"
      />
    </div>
  </div>
</section>
<!-- Sección Suministros -->
<section
  class="bg-black text-white py-10 relative bg-cover bg-center bg-no-repeat"
  :style="{ backgroundImage: `url(${fondoSuministros})` }"
>
  <div class="container mx-auto text-center">
    <h2 class="text-2xl font-extrabold lg:text-3xl">
      Suministros para Tatuadores Profesionales
    </h2>
    <p class="lg:text-xl px-4 py-7 text-balance">
      Todo lo que necesitas para llevar tu arte al siguiente nivel:
      máquinas, tintas, agujas y más.
    </p>

    <!-- Botón TIENDA ONLINE -->
<div class="mb-10">
  <router-link
    to="/tienda"
    class="px-6 py-3 block mx-auto w-max border border-amber-400 rounded-full 
           hover:bg-amber-400 hover:text-white hover:border-amber-400 transition-all duration-500 lg:text-xl"
  >
    TIENDA ONLINE
  </router-link>
</div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 lg:px-0">
      <div class="p-5 rounded-lg">
        <img
          :src="imgMaquina"
          alt="Máquinas de Tatuaje"
          class="w-full h-48 object-cover mb-4 rounded-lg"
        />
        <h3 class="text-xl font-bold">Máquinas de Tatuaje</h3>
        <p>Alta calidad y precisión para un trabajo impecable.</p>
      </div>

      <div class="p-5 rounded-lg">
        <img
          :src="imgTinta"
          alt="Tintas para Tatuajes"
          class="w-full h-48 object-cover mb-4 rounded-lg"
        />
        <h3 class="text-xl font-bold">Tintas para Tatuajes</h3>
        <p>Colores vibrantes que durarán mucho tiempo.</p>
      </div>

      <div class="p-5 rounded-lg">
        <img
          :src="imgKit"
          alt="Kits de Tatuaje"
          class="w-full h-48 object-cover mb-4 rounded-lg"
        />
        <h3 class="text-xl font-bold">Kits de Tatuaje</h3>
        <p>Todo lo necesario para comenzar a tatuar, en un solo paquete.</p>
      </div>
    </div>
  </div>
</section>
<!-- Sección Pie de Página -->
<footer class="bg-amber-400 w-full py-4 flex flex-col sm:flex-row items-center justify-between px-6 space-y-6 sm:space-y-0">
  <!-- Datos de Contacto -->
  <div class="text-center sm:text-left">
    <h4 class="font-semibold">Contáctanos</h4>
    <p>Celular: +593 99 077 7944</p>
  </div>

  <!-- Redes Sociales -->
  <div class="flex flex-col items-center space-y-2">
    <h4 class="font-semibold">SIGUENOS EN:</h4>
    <div class="flex space-x-5">
      <a href="https://www.facebook.com/profile.php?id=100081056576789" target="_blank">
        <img src="../assets/facebook.svg" alt="facebook" class="w-10 cursor-pointer transition-opacity-all hover:opacity-80 hover:w-11 transition-all"/>
      </a>
      <a href="https://www.instagram.com/bry.tatto/" target="_blank">
        <img src="../assets/insta.svg" alt="instagram" class="w-10 cursor-pointer transition-opacity-all hover:opacity-80 hover:w-11 transition-all"/>
      </a>
      <a href="https://www.tiktok.com/@bry.tattoo.studio?is_from_webapp=1&sender_device=pc" target="_blank">
        <img src="../assets/tiktok.svg" alt="tiktok" class="w-10 cursor-pointer transition-opacity-all hover:opacity-80 hover:w-11 transition-all"/>
      </a>
      <a href="https://wa.me/593990777944" target="_blank">
        <img src="../assets/wtsp.png" alt="whatsapp" class="w-9 hover:opacity-80 hover:w-11 transition-all"/>
      </a>
    </div>
  </div>

  <!-- Logo y Derechos Reservados -->
  <div class="flex flex-col items-center space-y-2">
    <img src="../assets/logo.png" alt="logo" class="w-52"/>
    <p class="text-sm">©2025 BryTattoStudio, Derechos Reservados.</p>
  </div>
</footer>
  </div>
</template>

<script>
import img1 from "../assets/fondo2.jpg";
import infoto from "../assets/fotoTatuando.png";
import img2 from "../assets/fondo3.jpg";
import img3 from "../assets/fondo.jpg";
import fondoTatuajes from "../assets/cuerpo2.jpg";

// Tatuajes
import minimalista1 from "../assets/minimalista1.jpg";
import minimalista2 from "../assets/minimalista2.jpg";
import minimalista3 from "../assets/minimalista3.jpg";
import minimalista4 from "../assets/minimalista4.jpg";
import minimalista5 from "../assets/minimalista5.jpg";

import fineline1 from "../assets/lineal1.jpg";
import fineline2 from "../assets/lineal2.jpg";
import fineline3 from "../assets/lineal3.jpg";
import fineline4 from "../assets/lineal4.jpg";
import fineline5 from "../assets/lineal5.jpg";
import fineline6 from "../assets/lineal6.jpg";

import blackgray1 from "../assets/bg1.jpg";
import blackgray2 from "../assets/bg2.jpg";
import blackgray3 from "../assets/bg3.jpg";
import blackgray4 from "../assets/bg4.jpg";
import blackgray5 from "../assets/bg5.jpg";
import blackgray6 from "../assets/bg6.jpg";

import lettering1 from "../assets/letra1.jpg";
import lettering2 from "../assets/letra2.jpg";
import lettering3 from "../assets/letra3.jpg";
import lettering4 from "../assets/letra4.jpg";
import lettering5 from "../assets/letra5.jpg";

import anime1 from "../assets/anime1.jpg";
import anime2 from "../assets/anime2.jpg";
import anime3 from "../assets/anime3.jpg";
import anime4 from "../assets/anime4.jpg";
import anime5 from "../assets/anime5.jpg";

import acolor1 from "../assets/color1.jpg";
import acolor2 from "../assets/color2.jpg";
import acolor3 from "../assets/color3.jpg";
import acolor4 from "../assets/color4.jpg";

import blackout1 from "../assets/negro1.jpg";
import blackout2 from "../assets/negro2.jpg";
import blackout3 from "../assets/negro3.jpg";
import blackout4 from "../assets/negro4.jpg";
import blackout5 from "../assets/negro5.jpg";

import mandala1 from "../assets/Mandala1.jpg";
import mandala2 from "../assets/Mandala2.jpg";
import mandala3 from "../assets/Mandala3.jpg";

// Perforaciones
import perforacion1 from "../assets/perforacion1.jpg";
import perforacion2 from "../assets/perforacion2.jpg";
import perforacion3 from "../assets/perforacion3.jpg";
import perforacion4 from "../assets/perforacion4.jpg";
import perforacion5 from "../assets/perforacion5.jpg";

//Suministros
import maquina from "../assets/maquina.jpg";
import tinta from "../assets/tinta.jpeg";
import kit from "../assets/kit.jpeg";
import fondoSuministros from "../assets/cuerpo2.jpg";

export default {
  data() {
    return {
      // Banner
      imagenes: [img2, img3],
      imagenActual: img2,
      opacidad: 100,
      intervalo: null,
      imgFondo: img1,
      imgInfo: infoto,

      // Tatuajes
      imgTatuajesFondo: fondoTatuajes,
      fila1: [
        { src: minimalista1, alt: "Diseño Minimalista", titulo: "Diseño Minimalista" },
        { src: fineline1, alt: "Fine Line", titulo: "Fine Line" },
        { src: blackgray1, alt: "Black & Gray", titulo: "Black & Gray" },
      ],
      fila2: [
        { src: lettering1, alt: "Lettering", titulo: "Lettering" },
        { src: anime1, alt: "Anime", titulo: "Anime" },
        { src: acolor1, alt: "Diseños a Color", titulo: "Diseños a Color" },
      ],
      fila3: [
        { src: blackout1, alt: "Diseños BlackOut", titulo: "Diseños BlackOut" },
        { src: mandala1, alt: "Mandalas", titulo: "Mandalas" },
      ],

      // Perforaciones
      perforaciones: [perforacion1, perforacion2, perforacion3, perforacion4, perforacion5],

      // índices para el cambio de tatuajes
      indiceMinimalista: 0,
      indiceFineLine: 0,
      indiceBlackGray: 0,
      indiceLettering: 0,
      indiceAnime: 0,
      indiceAColor: 0,
      indiceBlackout: 0,
      indiceMandalas: 0,
      //Suministros
      imgMaquina: maquina,
      imgTinta: tinta,
      imgKit: kit,
      fondoSuministros,
    };
  },
  methods: {
    cambiarOpacidad() {
      this.opacidad = 0;
    },
    siguienteImagen() {
      const indiceActual = (this.imagenes.indexOf(this.imagenActual) + 1) % this.imagenes.length;
      this.imagenActual = this.imagenes[indiceActual];
      this.opacidad = 100;
    },
    cambiarTatuajes() {
      this.fila1[0].src = [minimalista1, minimalista2, minimalista3, minimalista4, minimalista5][this.indiceMinimalista];
      this.fila1[1].src = [fineline1, fineline2, fineline3, fineline4, fineline5, fineline6][this.indiceFineLine];
      this.fila1[2].src = [blackgray1, blackgray2, blackgray3, blackgray4, blackgray5, blackgray6][this.indiceBlackGray];

      this.fila2[0].src = [lettering1, lettering2, lettering3, lettering4, lettering5][this.indiceLettering];
      this.fila2[1].src = [anime1, anime2, anime3, anime4, anime5][this.indiceAnime];
      this.fila2[2].src = [acolor1, acolor2, acolor3, acolor4][this.indiceAColor];

      this.fila3[0].src = [blackout1, blackout2, blackout3, blackout4, blackout5][this.indiceBlackout];
      this.fila3[1].src = [mandala1, mandala2, mandala3][this.indiceMandalas];
    },
  },
  mounted() {
    this.intervalo = setInterval(() => {
      this.cambiarOpacidad();
      setTimeout(() => {
        this.siguienteImagen();

        this.indiceMinimalista = (this.indiceMinimalista + 1) % 5;
        this.indiceFineLine = (this.indiceFineLine + 1) % 6;
        this.indiceBlackGray = (this.indiceBlackGray + 1) % 6;
        this.indiceLettering = (this.indiceLettering + 1) % 5;
        this.indiceAnime = (this.indiceAnime + 1) % 5;
        this.indiceAColor = (this.indiceAColor + 1) % 4;
        this.indiceBlackout = (this.indiceBlackout + 1) % 5;
        this.indiceMandalas = (this.indiceMandalas + 1) % 3;

        this.cambiarTatuajes();
      }, 1000);
    }, 8000);
  },
  beforeUnmount() {
    clearInterval(this.intervalo);
  },
};
</script>
