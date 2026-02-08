# Guía de Uso de Postman y REST Client

Esta guía te ayudará a probar la API de Alumnos usando Postman o REST Client directamente en Cursor.

## Opción 1: Usar Postman

### Importar la Colección

1. Abre Postman
2. Haz clic en **Import** (arriba a la izquierda)
3. Selecciona el archivo `API-Alumnos.postman_collection.json`
4. La colección se importará con todos los endpoints configurados

### Configurar Variables

La colección usa la variable `base_url` que puedes modificar en:

- **Collection Variables** → `base_url` → Cambia a tu URL si es diferente a `http://localhost:3000`

### Endpoints Disponibles

- **GET** `/api/alumnos` - Obtener todos los alumnos
- **GET** `/api/alumnos/:id` - Obtener alumno por ID
- **GET** `/api/alumnos/buscar?q=nombre` - Buscar alumnos
- **GET** `/api/alumnos/promocion/:promocion` - Filtrar por promoción
- **POST** `/api/alumnos` - Crear nuevo alumno
- **PUT** `/api/alumnos/:id` - Actualizar alumno
- **DELETE** `/api/alumnos/:id` - Eliminar alumno

### Ejemplo de Body para POST/PUT

```json
{
	"nombre": "Juan",
	"apellidos": "Pérez García",
	"promocion": "2024",
	"ciclo": "DAW",
	"urlImagen": "https://via.placeholder.com/150"
}
```

**Nota:** El campo `ciclo` debe ser uno de: `DAW`, `SMX`, `ARI`, o `IEA`

---

## Opción 2: Usar REST Client en Cursor

### Instalación

1. Abre Cursor
2. Ve a **Extensions** (Ctrl+Shift+X)
3. Busca **"REST Client"** de Huachao Mao
4. Instala la extensión

### Uso

1. Abre el archivo `api-alumnos.http`
2. Verás botones **"Send Request"** sobre cada petición
3. Haz clic en el botón para ejecutar la petición
4. Los resultados se mostrarán en una nueva pestaña

### Ventajas de REST Client

- ✅ No necesitas salir de Cursor
- ✅ Puedes guardar las peticiones en el repositorio
- ✅ Fácil de compartir con el equipo
- ✅ Soporte para variables y scripts

### Personalizar la URL Base

Edita la variable al inicio del archivo `.http`:

```http
@baseUrl = http://localhost:3000
```

---

## Iniciar el Servidor

Antes de probar los endpoints, asegúrate de que el servidor esté corriendo:

```bash
cd backend
npm run dev
```

El servidor debería estar disponible en `http://localhost:3000` (o el puerto configurado en tu `.env`)

---

## Respuestas Esperadas

### Éxito (200/201)

```json
{
	"_id": "...",
	"nombre": "Juan",
	"apellidos": "Pérez García",
	"promocion": "2024",
	"ciclo": "DAW",
	"urlImagen": "https://via.placeholder.com/150",
	"createdAt": "2024-01-01T00:00:00.000Z",
	"updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Error (400/404/500)

```json
{
	"error": "Mensaje de error descriptivo"
}
```

---

## Consejos

1. **Obtén un ID real**: Primero ejecuta `GET /api/alumnos` para obtener IDs reales y usarlos en otras peticiones
2. **Valida los datos**: Asegúrate de que todos los campos requeridos estén presentes
3. **Revisa los logs**: Si algo falla, revisa la consola del servidor para más detalles
4. **Ciclos válidos**: Solo se aceptan: `DAW`, `SMX`, `ARI`, `IEA`
