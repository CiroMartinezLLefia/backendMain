# Tutorial Ejercicio 3: API Node.js + MongoDB Atlas

## Objetivos

En este ejercicio aprenderás a:
- Crear una API REST con Node.js y Express
- Conectar con MongoDB Atlas
- Implementar operaciones CRUD en el backend
- Integrar el frontend con la API
- Configurar variables de entorno

## Estructura del Ejercicio

### 1. Configuración de MongoDB Atlas

#### Paso 1: Crear cuenta en MongoDB Atlas

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta gratuita
3. Crea un nuevo cluster (elige el tier gratuito M0)

#### Paso 2: Configurar acceso

1. **Network Access**: Agrega tu IP (o `0.0.0.0/0` para desarrollo)
2. **Database Access**: Crea un usuario con contraseña

#### Paso 3: Obtener connection string

1. Ve a "Connect" → "Connect your application"
2. Copia la connection string
3. Reemplaza `<password>` con tu contraseña

### 2. Configuración del Backend

**Archivo `.env`:**
```env
PORT=3000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/alumnos?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:5173
```

**Archivo `package.json`:**
```json
{
  "dependencies": {
    "express": "^4.21.1",
    "mongoose": "^8.8.4",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7"
  }
}
```

### 3. Modelo de Datos

**Archivo `models/Alumno.js`:**
```javascript
import mongoose from 'mongoose';

const alumnoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  promocion: { type: String, required: true },
  ciclo: { type: String, enum: ['DAW', 'SMX', 'ARI', 'IEA'], required: true },
  urlImagen: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Alumno', alumnoSchema);
```

**Conceptos clave:**
- Schema de Mongoose
- Validación de campos
- Enums para valores permitidos
- Timestamps automáticos

### 4. Controladores

**Archivo `controllers/alumnos.controller.js`:**

Cada función maneja una operación CRUD:

```javascript
export const getAllAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.find().sort({ createdAt: -1 });
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAlumno = async (req, res) => {
  try {
    const nuevoAlumno = new Alumno(req.body);
    const alumnoGuardado = await nuevoAlumno.save();
    res.status(201).json(alumnoGuardado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

**Conceptos clave:**
- Async/await
- Manejo de errores
- Códigos de estado HTTP
- Validación con Mongoose

### 5. Rutas

**Archivo `routes/alumnos.routes.js`:**
```javascript
router.get('/', getAllAlumnos);
router.get('/:id', getAlumnoById);
router.post('/', createAlumno);
router.put('/:id', updateAlumno);
router.delete('/:id', deleteAlumno);
router.get('/promocion/:promocion', getAlumnosByPromocion);
router.get('/buscar', searchAlumnos);
```

**Orden importante:** Las rutas específicas (`/buscar`, `/promocion/:promocion`) deben ir antes de las rutas con parámetros (`/:id`).

### 6. Servidor Express

**Archivo `server.js`:**
```javascript
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database.js';
import alumnosRoutes from './routes/alumnos.routes.js';

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Rutas
app.use('/api/alumnos', alumnosRoutes);

// Iniciar servidor
const startServer = async () => {
  await connectDB();
  app.listen(process.env.PORT, () => {
    console.log(`Servidor en http://localhost:${process.env.PORT}`);
  });
};

startServer();
```

**Conceptos clave:**
- CORS para permitir peticiones del frontend
- Middleware de parsing JSON
- Conexión a MongoDB antes de iniciar servidor
- Manejo de errores global

### 7. Integración Frontend

**Modificar `alumnosService.js`:**

Agregamos soporte para API además de localStorage:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const USE_API = import.meta.env.VITE_USE_API === 'true';

export const getAll = async () => {
  if (USE_API) {
    try {
      const response = await fetch(`${API_URL}/alumnos`);
      return await response.json();
    } catch (error) {
      // Fallback a localStorage
      return getAllLocalStorage();
    }
  }
  return getAllLocalStorage();
};
```

**Archivo `.env` del frontend:**
```env
VITE_API_URL=http://localhost:3000/api
VITE_USE_API=true
```

**Actualizar `App.jsx`:**
- Cambiar funciones síncronas a async/await
- Manejar errores de API
- Mostrar estados de carga

## Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/alumnos` | Obtener todos los alumnos |
| GET | `/api/alumnos/:id` | Obtener un alumno por ID |
| POST | `/api/alumnos` | Crear un nuevo alumno |
| PUT | `/api/alumnos/:id` | Actualizar un alumno |
| DELETE | `/api/alumnos/:id` | Eliminar un alumno |
| GET | `/api/alumnos/promocion/:promocion` | Filtrar por promoción |
| GET | `/api/alumnos/buscar?q=texto` | Buscar por nombre/apellidos |

## Pruebas con Postman/Thunder Client

1. **GET todos los alumnos:**
   - Método: GET
   - URL: `http://localhost:3000/api/alumnos`

2. **POST crear alumno:**
   - Método: POST
   - URL: `http://localhost:3000/api/alumnos`
   - Body (JSON):
   ```json
   {
     "nombre": "Juan",
     "apellidos": "Pérez",
     "promocion": "2024/2025",
     "ciclo": "DAW",
     "urlImagen": "https://i.pravatar.cc/150?img=1"
   }
   ```

3. **PUT actualizar:**
   - Método: PUT
   - URL: `http://localhost:3000/api/alumnos/:id`
   - Body: Datos a actualizar

4. **DELETE eliminar:**
   - Método: DELETE
   - URL: `http://localhost:3000/api/alumnos/:id`



## Resumen

En este ejercicio has aprendido:
- ✅ Crear una API REST con Express
- ✅ Conectar con MongoDB Atlas
- ✅ Implementar operaciones CRUD en el backend
- ✅ Configurar CORS y middleware
- ✅ Integrar frontend con API
- ✅ Manejar errores y validaciones

