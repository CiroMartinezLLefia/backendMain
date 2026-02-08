# Guía de Instalación

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior): [Descargar Node.js](https://nodejs.org/)
- **npm** (viene con Node.js) o **yarn**
- **Git**: [Descargar Git](https://git-scm.com/)
- **Editor de código**: Recomendado VS Code

## Instalación del Proyecto

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd api-alumnos
```

### 2. Instalar Dependencias del Frontend

```bash
cd frontend
npm install
```

**Dependencias principales:**

- React 18
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide React (iconos)

### 3. Instalar Dependencias del Backend

```bash
cd ../backend
npm install
```

**Dependencias principales:**

- Express
- Mongoose
- CORS
- dotenv

## Configuración

### Frontend

1. Copia el archivo de ejemplo de variables de entorno:

   ```bash
   cp .env.example .env
   ```

2. Edita `.env` según tus necesidades:
   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_USE_API=false  # true para usar API, false para localStorage
   ```

### Backend

1. Copia el archivo de ejemplo:

   ```bash
   cd backend
   cp .env.example .env
   ```

2. Edita `.env` con tus credenciales de MongoDB Atlas:

   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/alumnos?retryWrites=true&w=majority
   FRONTEND_URL=http://localhost:5173
   ```

3. **Configurar MongoDB Atlas:**
   - Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Crea un cluster gratuito (M0)
   - Configura Network Access (permite tu IP o `0.0.0.0/0` para desarrollo)
   - Crea un usuario de base de datos
   - Obtén la connection string y reemplázala en `.env`

## Ejecución

### Modo Desarrollo

**Frontend (Terminal 1):**

```bash
cd frontend
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

**Backend (Terminal 2):**

```bash
cd backend
npm run dev
```

El backend estará disponible en `http://localhost:3000`

### Modo Producción

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

**Backend:**

```bash
cd backend
npm start
```

## Verificación

1. **Frontend**: Abre `http://localhost:5173` en tu navegador
2. **Backend**: Visita `http://localhost:3000` - deberías ver un JSON con información de la API
3. **API**: Prueba `http://localhost:3000/api/alumnos` - debería devolver un array (vacío si no hay datos)

## Solución de Problemas Comunes

### Error: "Cannot find module"

**Solución:** Asegúrate de haber ejecutado `npm install` en ambas carpetas (frontend y backend).

### Error de conexión a MongoDB

**Solución:**

- Verifica que la connection string en `.env` sea correcta
- Asegúrate de que tu IP esté permitida en MongoDB Atlas Network Access
- Verifica que el usuario y contraseña sean correctos

### Error de CORS

**Solución:**

- Verifica que `FRONTEND_URL` en el backend `.env` coincida con la URL del frontend
- Asegúrate de que el backend esté corriendo antes que el frontend

### Puerto ya en uso

**Solución:**

- Cambia el puerto en el archivo `.env`
- O termina el proceso que está usando el puerto:

  ```bash
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F

  # Linux/Mac
  lsof -ti:3000 | xargs kill
  ```

### Variables de entorno no se cargan

**Solución:**

- Asegúrate de que los archivos `.env` estén en la raíz de cada proyecto
- Reinicia el servidor después de cambiar `.env`
- En Vite, las variables deben empezar con `VITE_`

### Imágenes no se muestran

**Solución:**

- Verifica que las URLs de las imágenes sean válidas
- Algunas URLs pueden requerir HTTPS
- Usa servicios como [pravatar.cc](https://pravatar.cc) para imágenes de prueba

## Estructura de Carpetas

```
api-alumnos/
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── data/           # Datos JSON
│   │   ├── services/       # Servicios (API/localStorage)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── config/         # Configuración (DB)
│   │   ├── controllers/    # Controladores
│   │   ├── models/         # Modelos Mongoose
│   │   ├── routes/         # Rutas
│   │   └── server.js
│   ├── package.json
│   └── .env
└── docs/                    # Documentación
```

## Comandos Útiles

```bash
# Ver logs del backend
cd backend && npm run dev

# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# Verificar versión de Node.js
node --version

# Verificar versión de npm
npm --version
```

## Próximos Pasos

Una vez instalado y funcionando:

1. Lee el [README principal](../README.md)
2. Sigue los tutoriales de cada ejercicio:
   - [Ejercicio 1: Filtros y Visualización](./ejercicio1.md)
   - [Ejercicio 2: CRUD y Autenticación](./ejercicio2.md)
   - [Ejercicio 3: API Node.js + MongoDB](./ejercicio3.md)
3. Consulta la [Guía de Git](./guia-git.md) para entender el flujo de trabajo
4. Para desplegar en producción, consulta la [Guía de Despliegue en Vercel](./guia-despliegue-vercel.md)