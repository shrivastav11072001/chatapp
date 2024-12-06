const express = require('express');
const { getUserForSidebar } = require('../controllers/user.controllers');
const protectRoute = require('../middleware/protectRoutes');
const routes = express.Router();

routes.get("/",protectRoute,getUserForSidebar)

module.exports = routes