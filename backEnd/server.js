//Server.js es el corazon de nuestro backend
//importamos express en nuestro archivo
const express = require('express');
require('dotenv').config();//importamos la libreria dotenv y cargamos las variables de dicho archivo
const pool = require('./db');//improtamos el archivo db.js para conectar el servidor a la BD y asi poder hacer consultas a la bd desde server.js

const app = express();//crea una aplicacion de express, ES NUESTRO SEVIDOR EN SI
const PORT = process.env.PORT || 3000;//puerto de conexion el cual lo tenemos en .env
//cors -> sirve para conectar de forma local el front con el back
const cors = require("cors");
app.use(cors());

//midleware para manejar JSON()
//un midleware es 
app.use(express.json());
// odo lo que esté dentro de la carpeta uploads puede ser accesible públicamente.”
app.use('/uploads',express.static('uploads'));

//IMPORTAMOS RUTAS PRODUCTOS
const productosRouter = require('./routes/productos');
app.use('/productos', productosRouter);
//IMPROTAMOS RUTAS DE PEDIDOS
const pedidosRouter = require('./routes/pedidos');
app.use('/pedidos',pedidosRouter);
//IMPORTAMOS RUTAS LOGIN
const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

//RUTAS de prueba (local)
app.get('/',(req,res)=>{
    res.send('SERVIDOR FUNCIONANDO...');
})



//CORRER EL SERVIDOR
app.listen(PORT,()=>{
    console.log(`SERVIDOR CORRIENDO EN http://localhost:${PORT}`);
});
