// const express = require('express');
import express from 'express';
import protectRoute from '../middleware/protectRoutes.js';
import { sendMessage, getMessages } from '../controllers/message.controller.js';
// const { sendMessage, getMessages } = require('../controllers/message.controller.js');

// const protectRoute = require('../middleware/protectRoutes.js');
const messageRoutes = express.Router();

messageRoutes.get("/:id",protectRoute,getMessages)
messageRoutes.post("/send/:id",protectRoute,sendMessage)

// module.exports = router;
export default messageRoutes