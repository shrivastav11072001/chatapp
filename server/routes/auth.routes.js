const express = require('express');
const authRoutes = express.Router();
const {signup, login, logout} = require('../controllers/auth.controllers.js')

authRoutes.post("/signup", signup)
authRoutes.post("/login", login)
authRoutes.post("/logout", logout)

module.exports = authRoutes;