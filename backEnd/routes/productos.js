const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Para borrar archivos
const pool = require('../db');
const router = express.Router();
const auth = require('./auth'); 

// CONFIGURACIÓN DE ALMACENAMIENTO DE MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardan las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único
    }
});
const upload = multer({ storage: storage });

// OBTENER PRODUCTOS
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "tbl_Productos"');
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("ERROR AL OBTENER PRODUCTOS");
    }
});

// CREAR PRODUCTO
router.post('/', auth, upload.single("producto_imagen"), async (req, res) => {
    try {
        const { producto_Nombre, producto_Precio, producto_descripcion } = req.body;
        const producto_imagen = req.file ? `uploads/${req.file.filename}` : null;

        const result = await pool.query(
            'INSERT INTO "tbl_Productos"("producto_Nombre","producto_Precio","producto_descripcion","producto_imagen") VALUES ($1,$2,$3,$4) RETURNING *',
            [producto_Nombre, producto_Precio, producto_descripcion, producto_imagen]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("ERROR AL CREAR UN PRODUCTO");
    }
});

// ACTUALIZAR PRODUCTO
router.put('/:id', auth, upload.single("producto_imagen"), async (req, res) => {
    try {
        const { id } = req.params;
        const { producto_Nombre, producto_Precio, producto_descripcion } = req.body;
        const producto_imagen = req.file ? `uploads/${req.file.filename}` : req.body.producto_imagen;

        const result = await pool.query(
            'UPDATE "tbl_Productos" SET "producto_Nombre"=$1, "producto_Precio"=$2, "producto_descripcion"=$3, "producto_imagen"=$4 WHERE "id"=$5 RETURNING *',
            [producto_Nombre, producto_Precio, producto_descripcion, producto_imagen, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("PRODUCTO NO ENCONTRADO");
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("LLENAR TODOS LOS CAMPOS Y SUBIR LA FOTO DEL PRODUCTO");
    }
});

// ELIMINAR PRODUCTO
router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;

        // Primero obtenemos el producto para saber la ruta de la imagen
        const resultSelect = await pool.query(
            'SELECT * FROM "tbl_Productos" WHERE "id"=$1',
            [id]
        );

        if (resultSelect.rows.length === 0) {
            return res.status(404).send("PRODUCTO NO ENCONTRADO");
        }

        const producto = resultSelect.rows[0];

        // Ahora eliminamos el producto de la base de datos
        const resultDelete = await pool.query(
            'DELETE FROM "tbl_Productos" WHERE "id"=$1 RETURNING *',
            [id]
        );

        // Borrar la imagen física si existe
        if (producto.producto_imagen) {
            fs.unlink(producto.producto_imagen, (err) => {
                if (err) console.log("Error al eliminar imagen:", err.message);
            });
        }

        res.json({ mensaje: "Producto eliminado correctamente", producto: resultDelete.rows[0] });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("ERROR AL ELIMINAR PRODUCTO");
    }
});

module.exports = router;
