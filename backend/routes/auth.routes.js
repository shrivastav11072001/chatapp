import express from 'express';
const authRoutes = express.Router();

import { signup, login, logout } from '../controllers/auth.controllers.js';

authRoutes.post("/signup", signup)
authRoutes.post("/login", login)
authRoutes.post("/logout", logout)

export default authRoutes;