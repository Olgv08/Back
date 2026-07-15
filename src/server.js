import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';


import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'

const app= express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ok: true, name: 'Todo API'}));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const { PORT = 4000, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {
    family: 4 // Esto manténlo para evitar problemas con IPv6 de Infinitum
})
.then(() => {
    // Forzamos a que imprima el nombre de la base de datos real a la que conectó
    console.log('¡Conectado exitosamente a MongoDB Atlas!');
    app.listen(PORT, () => console.log(`Servidor ejecutandose por el puerto: ${PORT}`));
})
.catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
});