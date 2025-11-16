//conexion a la base de datos
//pg es la libreria de postgreSQL en node.js ¨*IMPORTANTE INSATALAR pg*
const {Pool} = require('pg');//importamos Pool para conectarnos a la base de datos desde el paquete pg
require('dotenv').config();//para cargar las variables q tenemos en .env donde se encuentra la informacion de la bd, de esta forma cargamos los datos desde alla mas no escribirlos directamente por temas de seguridad

const pool = new Pool ({
    //usamos nuestras variables .env
    user: process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT
});

//exportamos para poder usar en otro archivo
module.exports = pool;