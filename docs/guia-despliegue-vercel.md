# Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar la API de Alumnos (backend) en Vercel.

## ⚠️ Frontend y Backend en el Mismo Repositorio

Si tu proyecto tiene frontend y backend en el mismo repositorio:

- **Frontend y Backend son proyectos SEPARADOS en Vercel**
- Cada uno necesita su propio proyecto en Vercel con `Root Directory` diferente
- Backend: `Root Directory: backend`
- Frontend: `Root Directory: frontend`

## Requisitos Previos

- Cuenta en [Vercel](https://vercel.com)
- Repositorio Git (GitHub, GitLab o Bitbucket)
- MongoDB Atlas configurado

## Paso 1: Preparar el Proyecto

Los archivos necesarios ya están creados:

- ✅ `backend/vercel.json` - Configuración de Vercel
- ✅ `backend/src/api/index.js` - Punto de entrada para Vercel

No necesitas modificar nada, el proyecto ya está listo para desplegarse.

## Paso 2: Configurar Variables de Entorno

1. Ve a tu proyecto en Vercel (después de conectarlo)
2. Navega a **Settings → Environment Variables**
3. Añade las siguientes variables:

   | Variable       | Valor                            |
   | -------------- | -------------------------------- |
   | `MONGODB_URI`  | `mongodb+srv://...`              |
   | `FRONTEND_URL` | `https://tu-frontend.vercel.app` |
   | `NODE_ENV`     | `production`                     |

   **Nota:** En MongoDB Atlas, permite conexiones desde `0.0.0.0/0` en Network Access.

## Paso 3: Desplegar el Backend

1. **Conecta tu repositorio:**

   - Ve a [Vercel Dashboard](https://vercel.com/dashboard)
   - Haz clic en "Add New Project"
   - Selecciona tu repositorio Git

2. **Configura el proyecto:**

   - **Root Directory:** Selecciona `backend`
   - **Framework Preset:** Other
   - **Build Command:** (dejar vacío)
   - **Output Directory:** (dejar vacío)
   - **Install Command:** `npm install`

3. **Añade las variables de entorno** (Paso 2)

4. **Haz clic en "Deploy"**

   Vercel te dará una URL como: `https://api-alumnos-backend.vercel.app`

## Paso 4: Desplegar el Frontend (Opcional)

Si también quieres desplegar el frontend:

1. **Crea un nuevo proyecto en Vercel:**

   - Haz clic en "Add New Project"
   - Selecciona el **mismo repositorio**

2. **Configura el proyecto:**

   - **Root Directory:** Selecciona `frontend`
   - **Framework Preset:** Vite (se detecta automáticamente)
   - **Build Command:** (dejar vacío)
   - **Output Directory:** (dejar vacío)
   - **Install Command:** `npm install`

3. **Variables de entorno del Frontend:**

   - `VITE_API_URL`: URL de tu backend (ej: `https://tu-backend.vercel.app/api`)

4. **Haz clic en "Deploy"**

5. **Actualiza el Backend:**
   - Ve al proyecto backend en Vercel
   - Settings → Environment Variables
   - Actualiza `FRONTEND_URL` con la URL del frontend

## Paso 5: Verificar el Despliegue

Prueba los endpoints:

```bash
# Endpoint raíz
curl https://tu-proyecto.vercel.app/

# Obtener alumnos
curl https://tu-proyecto.vercel.app/api/alumnos
```

O abre la URL en tu navegador para ver el JSON de la API.

## Solución de Problemas Comunes

### Error: "Cannot find package.json"

**Solución:** Verifica que el `Root Directory` esté configurado correctamente:

- Backend: `backend`
- Frontend: `frontend`

### Error de conexión a MongoDB

**Solución:**

- Verifica que `MONGODB_URI` esté configurada en Vercel
- Asegúrate de que MongoDB Atlas permita conexiones desde `0.0.0.0/0`

### Error de CORS

**Solución:**

- Verifica que `FRONTEND_URL` en el backend coincida con la URL del frontend
- Asegúrate de incluir el protocolo: `https://`

## Comandos Útiles (CLI)

Si prefieres usar la CLI en lugar del dashboard:

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Desplegar backend
cd backend
vercel

# Desplegar frontend
cd frontend
vercel

# Desplegar a producción
vercel --prod

# Ver logs
vercel logs
```

## Resumen

1. Backend: Proyecto en Vercel con `Root Directory: backend`
2. Frontend: Proyecto separado en Vercel con `Root Directory: frontend`
3. Configurar variables de entorno en cada proyecto
4. Desplegar

## Recursos Adicionales

- [Documentación oficial de Vercel](https://vercel.com/docs)
- [Guía de Node.js en Vercel](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/node-js)
