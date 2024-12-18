import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import connetToMongoDB from './db/connectToDb.js';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import { app, server } from './Socket/Socket.js';

dotenv.config();

app.use(cors());
app.use(express.json());

connetToMongoDB()


const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send("Hello from Express Server");
})

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);

server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    
})