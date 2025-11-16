const express = require('express');
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req,res)=>{
    try {
        const { correo, password } = req.body;

        const userResult = await pool.query(
            'SELECT * FROM "tbl_Usuario" WHERE usuario_email=$1',
            [correo]
        );

        if (userResult.rows.length === 0) {
            return res.status(400).json({ error:'USUARIO NO ENCONTRADO' });
        }

        const user = userResult.rows[0];

        const validPassword = await bcrypt.compare(password, user.usuario_password);
        if(!validPassword){
            return res.status(400).json({ error:'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.usuario_email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message:'Login Exitoso',
            token,
            usuario:{ id: user.id, email: user.usuario_email, nombre: user.usuario_nombre }
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error en el login');
    }
});

module.exports = router;
