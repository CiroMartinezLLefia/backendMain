import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import alumnosRoutes from '../routes/alumnos.routes.js';

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || '*';

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos (reutilizar conexión existente en serverless)
const connectDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      const MONGODB_URI = process.env.MONGODB_URI;
      if (!MONGODB_URI) {
        throw new Error('MONGODB_URI no está definida');
      }
      await mongoose.connect(MONGODB_URI);
      console.log('✅ Conectado a MongoDB Atlas');
    } catch (error) {
      console.error('❌ Error conectando a la base de datos:', error.message);
      throw error;
    }
  }
};

// Middleware para conectar DB antes de cada request
app.use(async (req, res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    res.status(500).json({ 
      error: 'Error de conexión a la base de datos',
      message: error.message 
    });
  }
});

// Rutas
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Gestión de Alumnos',
    version: '1.0.0',
    endpoints: {
      alumnos: '/api/alumnos',
    },
  });
});

app.use('/api/alumnos', alumnosRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Exportar para Vercel (serverless function)
export default app;
