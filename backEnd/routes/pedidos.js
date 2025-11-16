//pagos y payphone
//exportamos librerias que vamos a utilizar
const express = require('express');
const pool = require('../db');//conexion a la bd
const router = express.Router();//usar las rutas en server.js
//para proteger la ruta
const auth = require('./auth'); 


//obtenemos todos los pedidos
router.get('/',async (req,res)=>{
    try {
        //consulta SQL
        const result = await pool.query('SELECT * FROM "tbl_Pedidos"');
        //trasnformamos en formato json lo q nos trae la consulta
        res.json(result.rows);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error al mostrar pedidos");    
    }
});
//crear pedido (CUANDO EL USUARIO PAGA CON PAYPHONE)
router.post('/',auth,async (req,res)=>{
    try {
        const {usuario_id, productos, total, fecha, estado, payphone_id} = req.body;
        //consulta SQL
        const result = await pool.query(
            'INSERT INTO "tbl_Pedidos" (usuario_id, productos, total, fecha, estado, payphone_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [usuario_id, productos, total, fecha, estado, payphone_id]
        );
        //mostramos de inmediato lo creado 
        res.json(result.rows[0]);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("ERROR AL CREAR PEDIDO");
        
    }
});

//actualizar estado payphone_id
router.put('/:id',auth, async (req, res)=>{
    try {
        const {id} = req.params;
        const {estado, payphone_id} = req.body;//traemos SOLO los campos q queremos trabajar, en el anterior productos.js traimaso todo porq podemos hacerlo todo en este caso no por ello traemos solo 2 campos

        //consulta SQL
        const result = await pool.query(
            'UPDATE "tbl_Pedidos" SET estado=$1, payphone_id=$2 WHERE id=$3 RETURNING *',
            [estado, payphone_id, id]
        );
        //pedido inexistente
        if (result.rows.length === 0) return res.status(404).send("PEDIDO NO EXISTE");
        res.json(result.rows[0]);//mostrar lo q acabamos de ahcer
    } catch (error) {
         console.log(error.message);
        res.status(500).send("ERROR AL ACTUALIZAR PEDIDO");
    }
});

//exportamos las rutas para usarlas
module.exports= router;
