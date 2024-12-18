// const express = require('express');
import express from 'express';
import protectRoute from '../middleware/protectRoutes.js';
import {getUserForSidebar} from "../controllers/user.controllers.js"
// const { getUserForSidebar } = require('../controllers/user.controllers');
// const protectRoute = require('../middleware/protectRoutes');
const userRoutes = express.Router();

userRoutes.get("/",protectRoute,getUserForSidebar)

export default userRoutes