# Tutorial: Probar la API con REST Client

## Objetivos

En este tutorial aprenderás a:
- Instalar y configurar REST Client en VSCode
- Crear y ejecutar peticiones HTTP directamente desde el editor
- Probar todos los endpoints de la API de Alumnos
- Usar variables y personalizar peticiones
- Trabajar con respuestas y manejo de errores

## ¿Qué es REST Client?

REST Client es una extensión que te permite hacer peticiones HTTP directamente desde tu editor de código, sin necesidad de usar herramientas externas como Postman. Es perfecto para probar APIs mientras desarrollas.

**Ventajas:**
- ✅ No necesitas salir de tu editor
- ✅ Puedes guardar las peticiones en el repositorio
- ✅ Fácil de compartir con el equipo
- ✅ Soporte para variables y scripts
- ✅ Integración perfecta con tu flujo de trabajo

## Instalación

### Paso 1: Instalar la Extensión

1. Abre VS Code
2. Presiona `Ctrl+Shift+X` (o `Cmd+Shift+X` en Mac) para abrir el panel de extensiones
3. Busca **"REST Client"** de **Huachao Mao**
4. Haz clic en **Install**

![REST Client Extension](https://marketplace.visualstudio.com/_apis/public/gallery/publishers/HuachaoMao/vsextensions/restclient/latest/vspackage/assets/icon.png)

### Paso 2: Verificar la Instalación

Una vez instalada, verás que los archivos `.http` y `.rest` tienen iconos especiales y botones para ejecutar peticiones.

## Estructura del Tutorial

### 1. Abrir el Archivo de Peticiones

El proyecto ya incluye un archivo con todas las peticiones configuradas:

**Ubicación:** `backend/api-alumnos.http`

Abre este archivo en Cursor. Verás algo como esto:

```http
@baseUrl = http://localhost:3000
@contentType = application/json

### Obtener todos los alumnos
GET {{baseUrl}}/api/alumnos
```

### 2. Entender la Sintaxis

#### Variables

Las variables se definen con `@` y se usan con `{{}}`:

```http
@baseUrl = http://localhost:3000
@contentType = application/json

GET {{baseUrl}}/api/alumnos
```

**Ventaja:** Puedes cambiar la URL base en un solo lugar.

#### Separadores de Peticiones

Cada petición debe estar separada por `###` (tres almohadillas):

```http
### Primera petición
GET http://localhost:3000/api/alumnos

### Segunda petición
POST http://localhost:3000/api/alumnos
```

#### Comentarios

Los comentarios ayudan a organizar las peticiones:

```http
### ============================================
### OBTENER ALUMNOS
### ============================================
```

### 3. Ejecutar tu Primera Petición

#### Paso 1: Iniciar el Servidor

Antes de probar, asegúrate de que el servidor esté corriendo:

```bash
cd backend
npm run dev
```

Deberías ver:
```
🚀 Servidor corriendo en http://localhost:3000
```

#### Paso 2: Ejecutar una Petición GET

1. Abre `backend/api-alumnos.http`
2. Busca la petición:
   ```http
   ### Obtener todos los alumnos
   GET {{baseUrl}}/api/alumnos
   ```
3. Verás un botón **"Send Request"** sobre la petición
4. Haz clic en el botón o presiona `Ctrl+Alt+R` (o `Cmd+Alt+R` en Mac)

#### Paso 3: Ver la Respuesta

La respuesta se mostrará en una nueva pestaña a la derecha con:
- **Status Code** (200, 404, 500, etc.)
- **Headers** de la respuesta
- **Body** con los datos JSON

### 4. Probar Todos los Endpoints

#### GET - Obtener Todos los Alumnos

```http
### Obtener todos los alumnos
GET {{baseUrl}}/api/alumnos
```

**Respuesta esperada:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Juan",
    "apellidos": "Pérez García",
    "promocion": "2024",
    "ciclo": "DAW",
    "urlImagen": "https://via.placeholder.com/150",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET - Obtener Alumno por ID

```http
### Obtener alumno por ID
GET {{baseUrl}}/api/alumnos/507f1f77bcf86cd799439011
```

**Nota:** Reemplaza el ID con un ID real de tu base de datos.

#### GET - Buscar Alumnos

```http
### Buscar alumnos por nombre o apellidos
GET {{baseUrl}}/api/alumnos/buscar?q=Juan
```

**Parámetros:**
- `q`: Término de búsqueda (nombre o apellidos)

#### GET - Filtrar por Promoción

```http
### Filtrar alumnos por promoción
GET {{baseUrl}}/api/alumnos/promocion/2024
```

**Parámetros:**
- `promocion`: Año de la promoción (ej: "2024", "2023")

#### POST - Crear Nuevo Alumno

```http
### Crear nuevo alumno
POST {{baseUrl}}/api/alumnos
Content-Type: {{contentType}}

{
  "nombre": "Juan",
  "apellidos": "Pérez García",
  "promocion": "2024",
  "ciclo": "DAW",
  "urlImagen": "https://via.placeholder.com/150"
}
```

**Campos requeridos:**
- `nombre`: String (obligatorio)
- `apellidos`: String (obligatorio)
- `promocion`: String (obligatorio)
- `ciclo`: String - Debe ser uno de: `DAW`, `SMX`, `ARI`, `IEA`
- `urlImagen`: String (obligatorio)

**Respuesta esperada (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nombre": "Juan",
  "apellidos": "Pérez García",
  "promocion": "2024",
  "ciclo": "DAW",
  "urlImagen": "https://via.placeholder.com/150",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### PUT - Actualizar Alumno

```http
### Actualizar alumno
PUT {{baseUrl}}/api/alumnos/507f1f77bcf86cd799439011
Content-Type: {{contentType}}

{
  "nombre": "Juan Carlos",
  "apellidos": "Pérez García",
  "promocion": "2024",
  "ciclo": "DAW",
  "urlImagen": "https://via.placeholder.com/150"
}
```

**Nota:** Reemplaza el ID con un ID real. Todos los campos son opcionales, pero si envías un campo, debe ser válido.

#### DELETE - Eliminar Alumno

```http
### Eliminar alumno
DELETE {{baseUrl}}/api/alumnos/507f1f77bcf86cd799439011
```

**Respuesta esperada (200):**
```json
{
  "message": "Alumno eliminado correctamente",
  "alumno": { ... }
}
```

### 5. Trabajar con Variables Dinámicas

Puedes crear variables personalizadas para facilitar el trabajo:

```http
@baseUrl = http://localhost:3000
@contentType = application/json
@alumnoId = 507f1f77bcf86cd799439011

### Usar variable de ID
GET {{baseUrl}}/api/alumnos/{{alumnoId}}
```

**Ventaja:** Cambia el ID en un solo lugar y se actualiza en todas las peticiones.

### 6. Personalizar la URL Base

Si tu servidor corre en otro puerto o dominio:

```http
@baseUrl = http://localhost:3000
```

Cambia a:
```http
@baseUrl = http://localhost:5000
```

O para producción:
```http
@baseUrl = https://api-tu-dominio.com
```

### 7. Manejo de Errores

#### Error 400 - Bad Request

Si faltan campos requeridos:
```json
{
  "error": "Todos los campos son obligatorios"
}
```

#### Error 404 - Not Found

Si el alumno no existe:
```json
{
  "error": "Alumno no encontrado"
}
```

#### Error 500 - Server Error

Si hay un error en el servidor:
```json
{
  "error": "Error interno del servidor",
  "message": "Detalles del error (solo en desarrollo)"
}
```

### 8. Flujo de Trabajo Recomendado

1. **Primero:** Obtén todos los alumnos para ver qué hay en la base de datos
   ```http
   GET {{baseUrl}}/api/alumnos
   ```

2. **Segundo:** Copia un ID real de la respuesta

3. **Tercero:** Usa ese ID para probar GET, PUT y DELETE

4. **Cuarto:** Crea nuevos alumnos con POST

5. **Quinto:** Prueba las búsquedas y filtros

### 9. Consejos y Trucos

#### Guardar Respuestas

Puedes copiar las respuestas directamente desde el panel de resultados para usarlas en otras peticiones.

#### Múltiples Entornos

Crea diferentes archivos para diferentes entornos:

- `api-alumnos.local.http` - Para desarrollo local
- `api-alumnos.prod.http` - Para producción

#### Organizar Peticiones

Usa comentarios para organizar tus peticiones:

```http
### ============================================
### OBTENER ALUMNOS
### ============================================

### ============================================
### CREAR ALUMNO
### ============================================
```

#### Validar Datos

Antes de hacer POST o PUT, verifica que:
- Todos los campos requeridos estén presentes
- El campo `ciclo` sea uno de: `DAW`, `SMX`, `ARI`, `IEA`
- Las URLs de imágenes sean válidas

### 10. Ejemplos Prácticos

#### Crear Alumno de Cada Ciclo

```http
### Crear alumno - Ciclo DAW
POST {{baseUrl}}/api/alumnos
Content-Type: {{contentType}}

{
  "nombre": "Juan",
  "apellidos": "Pérez García",
  "promocion": "2024",
  "ciclo": "DAW",
  "urlImagen": "https://via.placeholder.com/150"
}

### Crear alumno - Ciclo SMX
POST {{baseUrl}}/api/alumnos
Content-Type: {{contentType}}

{
  "nombre": "María",
  "apellidos": "González López",
  "promocion": "2023",
  "ciclo": "SMX",
  "urlImagen": "https://via.placeholder.com/150"
}

### Crear alumno - Ciclo ARI
POST {{baseUrl}}/api/alumnos
Content-Type: {{contentType}}

{
  "nombre": "Carlos",
  "apellidos": "Martínez Ruiz",
  "promocion": "2024",
  "ciclo": "ARI",
  "urlImagen": "https://via.placeholder.com/150"
}

### Crear alumno - Ciclo IEA
POST {{baseUrl}}/api/alumnos
Content-Type: {{contentType}}

{
  "nombre": "Ana",
  "apellidos": "Sánchez Torres",
  "promocion": "2023",
  "ciclo": "IEA",
  "urlImagen": "https://via.placeholder.com/150"
}
```

#### Búsquedas Avanzadas

```http
### Buscar por nombre
GET {{baseUrl}}/api/alumnos/buscar?q=Juan

### Buscar por apellidos
GET {{baseUrl}}/api/alumnos/buscar?q=García

### Buscar por promoción
GET {{baseUrl}}/api/alumnos/promocion/2024
```

## Solución de Problemas

### El botón "Send Request" no aparece

1. Verifica que la extensión REST Client esté instalada
2. Asegúrate de que el archivo tenga extensión `.http` o `.rest`
3. Reinicia Cursor

### Error de conexión

1. Verifica que el servidor esté corriendo
2. Comprueba que el puerto sea correcto (por defecto 3000)
3. Revisa que no haya errores en la consola del servidor

### Error 404 en todas las peticiones

1. Verifica que la ruta base sea correcta: `/api/alumnos`
2. Asegúrate de que el servidor esté configurado correctamente
3. Revisa los logs del servidor

### Error de validación

1. Verifica que todos los campos requeridos estén presentes
2. Asegúrate de que `ciclo` sea uno de los valores permitidos
3. Comprueba que los tipos de datos sean correctos

## Recursos Adicionales

- [Documentación oficial de REST Client](https://marketplace.visualstudio.com/items?itemName=HuachaoMao.restclient)
- [Repositorio en GitHub](https://github.com/Huachao/vscode-restclient)
- [Guía de sintaxis completa](https://github.com/Huachao/vscode-restclient/blob/master/README.md)

## Siguiente Paso

Ahora que sabes cómo probar la API con REST Client, puedes:
- Probar todos los endpoints de tu API
- Validar que todo funcione correctamente
- Documentar casos de uso específicos
- Compartir las peticiones con tu equipo

¡Feliz testing! 🚀
