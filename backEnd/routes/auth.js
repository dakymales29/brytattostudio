//este archivo sirve para protejer rutas en el backend, mientras el usuario no se logee no podra acceder a las url asi las sepa
const jwt = require('jsonwebtoken');//usamos la libreria jsonwebtoken
require('dotenv').config();//usar archivo .env

function authenticateToken(req, res, next) {
  // Revisamos si el token viene en el header
  const authHeader = req.headers['authorization']; 
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });

    req.user = user; // guardamos la info del usuario para usarla después
    next(); // dejamos pasar a la siguiente función de la ruta
  });
}

module.exports = authenticateToken;