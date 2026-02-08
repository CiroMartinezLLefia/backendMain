# Tutorial: Usar Fetch API en JavaScript

## Objetivos

En este tutorial aprenderás a:
- Entender qué es la Fetch API y para qué sirve
- Realizar peticiones HTTP básicas (GET, POST, PUT, DELETE)
- Manejar respuestas y errores correctamente
- Trabajar con headers y autenticación
- Usar async/await con fetch
- Integrar fetch en aplicaciones React

## ¿Qué es Fetch API?

La Fetch API es una interfaz moderna de JavaScript que permite realizar peticiones HTTP de forma asíncrona. Es la forma nativa del navegador para hacer peticiones a servidores, reemplazando al antiguo `XMLHttpRequest`.

**Ventajas:**
- ✅ API moderna y más simple que XMLHttpRequest
- ✅ Basada en Promesas (puede usar async/await)
- ✅ Disponible en todos los navegadores modernos
- ✅ Soporte nativo para JSON
- ✅ Mejor manejo de errores

## Sintaxis Básica

La función `fetch()` recibe dos parámetros:

```javascript
fetch(url, opciones)
```

- **url**: La dirección a la que hacer la petición (requerido)
- **opciones**: Objeto con configuración adicional (opcional)

## Petición GET (Obtener Datos)

La petición más simple es un GET, que obtiene datos del servidor:

```javascript
fetch('http://localhost:3000/api/alumnos')
  .then(response => response.json())
  .then(data => {
    console.log('Alumnos:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### Explicación paso a paso:

1. `fetch()` hace la petición y devuelve una Promesa
2. `.then(response => response.json())` convierte la respuesta a JSON
3. `.then(data => ...)` procesa los datos recibidos
4. `.catch(error => ...)` maneja cualquier error

### Usando async/await (Recomendado)

La forma más moderna y legible:

```javascript
async function obtenerAlumnos() {
  try {
    const response = await fetch('http://localhost:3000/api/alumnos');
    const data = await response.json();
    console.log('Alumnos:', data);
    return data;
  } catch (error) {
    console.error('Error al obtener alumnos:', error);
  }
}
```

## Verificar el Estado de la Respuesta

Es importante verificar que la petición fue exitosa antes de procesar los datos:

```javascript
async function obtenerAlumnos() {
  try {
    const response = await fetch('http://localhost:3000/api/alumnos');
    
    // Verificar si la respuesta es exitosa (status 200-299)
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Códigos de Estado Comunes

- `200`: OK - Petición exitosa
- `201`: Created - Recurso creado exitosamente
- `400`: Bad Request - Error en la petición
- `401`: Unauthorized - No autenticado
- `403`: Forbidden - Sin permisos
- `404`: Not Found - Recurso no encontrado
- `500`: Internal Server Error - Error del servidor

## Petición POST (Crear Datos)

Para crear nuevos recursos, usamos POST con un cuerpo (body):

```javascript
async function crearAlumno(nuevoAlumno) {
  try {
    const response = await fetch('http://localhost:3000/api/alumnos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoAlumno)
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Alumno creado:', data);
    return data;
  } catch (error) {
    console.error('Error al crear alumno:', error);
  }
}

// Uso:
crearAlumno({
  nombre: 'Juan Pérez',
  email: 'juan@example.com',
  edad: 20,
  promocion: '2024'
});
```

### Explicación de las opciones:

- **method**: Especifica el método HTTP ('POST', 'GET', 'PUT', 'DELETE')
- **headers**: Objeto con los headers HTTP necesarios
- **body**: Los datos a enviar (debe ser string, por eso usamos `JSON.stringify()`)

## Petición PUT (Actualizar Datos)

Para actualizar un recurso existente:

```javascript
async function actualizarAlumno(id, datosActualizados) {
  try {
    const response = await fetch(`http://localhost:3000/api/alumnos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosActualizados)
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Alumno actualizado:', data);
    return data;
  } catch (error) {
    console.error('Error al actualizar alumno:', error);
  }
}

// Uso:
actualizarAlumno('507f1f77bcf86cd799439011', {
  nombre: 'Juan Pérez Actualizado',
  edad: 21
});
```

## Petición DELETE (Eliminar Datos)

Para eliminar un recurso:

```javascript
async function eliminarAlumno(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/alumnos/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    console.log('Alumno eliminado correctamente');
    return true;
  } catch (error) {
    console.error('Error al eliminar alumno:', error);
    return false;
  }
}

// Uso:
eliminarAlumno('507f1f77bcf86cd799439011');
```

## Trabajar con Headers Personalizados

Puedes agregar headers personalizados para autenticación u otros propósitos:

```javascript
async function obtenerAlumnosConAuth() {
  const token = localStorage.getItem('token'); // O de donde obtengas el token
  
  try {
    const response = await fetch('http://localhost:3000/api/alumnos', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        // Token inválido o expirado
        console.error('No autorizado');
        return;
      }
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## Manejo de Errores Completo

Un manejo de errores robusto debe considerar diferentes tipos de errores:

```javascript
async function obtenerAlumnos() {
  try {
    const response = await fetch('http://localhost:3000/api/alumnos');
    
    // Verificar si hay error de red
    if (!response.ok) {
      // Intentar obtener el mensaje de error del servidor
      let errorMessage = `Error HTTP: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // Si no se puede parsear el error, usar el mensaje por defecto
      }
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    // Manejar diferentes tipos de errores
    if (error instanceof TypeError) {
      // Error de red (servidor no disponible, CORS, etc.)
      console.error('Error de conexión:', error.message);
    } else {
      // Error del servidor
      console.error('Error del servidor:', error.message);
    }
    throw error; // Re-lanzar para que el código que llama pueda manejarlo
  }
}
```

## Usar Fetch en React

### Hook personalizado para Fetch

Puedes crear un hook personalizado para reutilizar la lógica de fetch:

```javascript
import { useState, useEffect } from 'react';

function useAlumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAlumnos() {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/alumnos');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setAlumnos(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAlumnos();
  }, []);

  return { alumnos, loading, error };
}

// Uso en un componente:
function ListaAlumnos() {
  const { alumnos, loading, error } = useAlumnos();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {alumnos.map(alumno => (
        <li key={alumno._id}>{alumno.nombre}</li>
      ))}
    </ul>
  );
}
```

### Función para crear alumno desde React

```javascript
async function crearAlumnoDesdeReact(nuevoAlumno) {
  try {
    const response = await fetch('http://localhost:3000/api/alumnos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoAlumno)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear alumno');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-lanzar para manejar en el componente
  }
}

// Uso en un componente:
function FormularioAlumno() {
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await crearAlumnoDesdeReact({ nombre, email: '', edad: 0, promocion: '2024' });
      alert('Alumno creado exitosamente');
      setNombre('');
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del alumno"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creando...' : 'Crear Alumno'}
      </button>
    </form>
  );
}
```

## Variables de Entorno

Para no hardcodear las URLs, usa variables de entorno:

```javascript
// En un archivo de configuración (config.js)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Uso:
async function obtenerAlumnos() {
  const response = await fetch(`${API_URL}/api/alumnos`);
  // ...
}
```

## Ejemplo Completo: Servicio de API

Puedes crear un módulo que centralice todas las peticiones:

```javascript
// services/alumnosService.js
const API_URL = 'http://localhost:3000/api';

class AlumnosService {
  async obtenerTodos() {
    const response = await fetch(`${API_URL}/alumnos`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  }

  async obtenerPorId(id) {
    const response = await fetch(`${API_URL}/alumnos/${id}`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  }

  async crear(alumno) {
    const response = await fetch(`${API_URL}/alumnos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alumno)
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  }

  async actualizar(id, alumno) {
    const response = await fetch(`${API_URL}/alumnos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alumno)
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  }

  async eliminar(id) {
    const response = await fetch(`${API_URL}/alumnos/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return true;
  }
}

export default new AlumnosService();

// Uso:
import alumnosService from './services/alumnosService';

// Obtener todos
const alumnos = await alumnosService.obtenerTodos();

// Crear uno nuevo
const nuevoAlumno = await alumnosService.crear({
  nombre: 'Juan Pérez',
  email: 'juan@example.com',
  edad: 20,
  promocion: '2024'
});
```

## Buenas Prácticas

1. **Siempre verifica `response.ok`** antes de procesar datos
2. **Usa async/await** en lugar de `.then()` para código más legible
3. **Maneja errores apropiadamente** con try/catch
4. **No hardcodees URLs**, usa variables de entorno
5. **Centraliza las peticiones** en servicios o hooks personalizados
6. **Incluye headers necesarios** como `Content-Type` para JSON
7. **Valida los datos** antes de enviarlos al servidor

## Resumen

- `fetch()` es la forma moderna de hacer peticiones HTTP en JavaScript
- Devuelve una Promesa que se puede usar con `.then()` o `async/await`
- Siempre verifica `response.ok` antes de procesar datos
- Usa `JSON.stringify()` para enviar datos y `response.json()` para recibirlos
- Maneja errores apropiadamente con try/catch
- En React, considera crear hooks personalizados o servicios para centralizar la lógica

## Recursos Adicionales

- [MDN: Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- [MDN: Using Fetch](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch)
- [JavaScript.info: Fetch](https://es.javascript.info/fetch)
