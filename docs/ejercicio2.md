# Tutorial Ejercicio 2: CRUD y Autenticación

## Objetivos

En este ejercicio aprenderás a:
- Implementar operaciones CRUD (Create, Read, Update, Delete)
- Gestionar autenticación de usuarios
- Persistir datos en localStorage
- Validar formularios
- Usar el patrón de servicios

## Estructura del Ejercicio

### 1. Servicio de Persistencia

Creamos `alumnosService.js` para abstraer las operaciones de localStorage.

**Funciones principales:**
- `getAll()`: Obtiene todos los alumnos
- `saveAll()`: Guarda todos los alumnos
- `create()`: Crea un nuevo alumno
- `update()`: Actualiza un alumno existente
- `delete()`: Elimina un alumno

**Ventajas del patrón de servicios:**
- Separación de responsabilidades
- Facilita migración futura a API
- Código más testeable

### 2. Servicio de Autenticación

Creamos `authService.js` para gestionar la autenticación.

**Funciones:**
- `login(usuario, contrasenya)`: Valida credenciales
- `getAuth()`: Obtiene datos de autenticación
- `logout()`: Cierra sesión

**Credenciales por defecto:**
- Usuario: `admin`
- Contraseña: `admin123`

### 3. Componente Login

Formulario de autenticación con validación. Puede mostrarse como modal o pantalla completa.

```jsx
function Login({ onLogin, onCancel }) {
  const [usuario, setUsuario] = useState('');
  const [contrasenya, setContrasenya] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onLogin(usuario, contrasenya);
    if (!result) {
      setError('Credenciales incorrectas');
    }
  };
  
  // Si hay onCancel, mostrar como modal (Dialog)
  // Si no, mostrar como pantalla completa (Card)
  // ...
}
```

**Conceptos clave:**
- Formularios controlados
- Validación de campos
- Manejo de errores
- Prevención de submit por defecto
- Modal con componente `Dialog` de shadcn/ui
- Compatibilidad: puede funcionar como modal o pantalla completa

### 4. Componente FormularioAlumno

Formulario completo para crear y editar alumnos.

**Estados:**
```jsx
const [formData, setFormData] = useState({
  nombre: '',
  apellidos: '',
  promocion: '',
  ciclo: '',
  urlImagen: '',
});
const [errors, setErrors] = useState({});
```

**Validación:**
```jsx
const validate = () => {
  const newErrors = {};
  if (!formData.nombre.trim()) {
    newErrors.nombre = 'El nombre es obligatorio';
  }
  // ... más validaciones
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

**Conceptos clave:**
- Modo crear vs editar
- Validación de formularios
- Manejo de errores por campo
- Componente `Dialog` de shadcn/ui

### 5. Modificar Componente Alumno

Agregamos acciones de editar y eliminar (solo para administradores).

```jsx
{esAdmin && (
  <div className="flex gap-2">
    <Button onClick={onEdit}>
      <Pencil />
    </Button>
    <Button onClick={onDelete}>
      <Trash2 />
    </Button>
  </div>
)}
```

**Conceptos clave:**
- Renderizado condicional
- Iconos de lucide-react
- Props adicionales: `esAdmin`, `onEdit`, `onDelete`

### 6. Componente InfoAdmin

Muestra información del administrador o botón de login según el estado de autenticación.

```jsx
function InfoAdmin({ esAdmin, usuario, usuarioLogueado, onLogout, onAbrirLogin }) {
  return (
    <Card>
      {usuarioLogueado && esAdmin ? (
        <div>
          <Badge>Administrador</Badge>
          <span>{usuario}</span>
          <Button onClick={onLogout}>Cerrar Sesión</Button>
        </div>
      ) : (
        <div>
          <span>Modo de solo lectura</span>
          <Button onClick={onAbrirLogin}>Iniciar Sesión</Button>
        </div>
      )}
    </Card>
  );
}
```

**Conceptos clave:**
- Renderizado condicional según estado de autenticación
- Botón de login para usuarios no logueados
- Información del admin para usuarios logueados

### 7. Ampliar App.jsx

Integración completa de CRUD y autenticación. La aplicación permite ver alumnos sin estar logueado, pero solo los administradores pueden gestionarlos.

**Estados adicionales:**
```jsx
const [usuarioLogueado, setUsuarioLogueado] = useState(false);
const [esAdmin, setEsAdmin] = useState(false);
const [mostrarLogin, setMostrarLogin] = useState(false);
const [mostrarFormulario, setMostrarFormulario] = useState(false);
const [alumnoEditando, setAlumnoEditando] = useState(null);
```

**Renderizado condicional:**
- La lista de alumnos se muestra siempre
- Los botones de administración solo se muestran si `esAdmin === true`
- El modal de login se muestra cuando `mostrarLogin === true`

**Funciones CRUD:**
```jsx
const handleCrearAlumno = () => {
  setAlumnoEditando(null);
  setMostrarFormulario(true);
};

const handleEditarAlumno = (alumno) => {
  setAlumnoEditando(alumno);
  setMostrarFormulario(true);
};

const handleEliminarAlumno = (id) => {
  if (window.confirm('¿Estás seguro?')) {
    alumnosService.delete(id);
    // Actualizar lista
  }
};

const handleGuardarAlumno = (datos) => {
  if (alumnoEditando) {
    alumnosService.update(alumnoEditando.id, datos);
  } else {
    alumnosService.create(datos);
  }
  // Actualizar lista y cerrar formulario
};
```

**Persistencia:**
- Cargar desde localStorage al iniciar
- Guardar después de cada operación CRUD
- Cargar autenticación desde localStorage

## Flujo de la Aplicación

1. **Inicio**: La aplicación muestra la lista de alumnos siempre, incluso sin estar logueado
2. **Modo Público (No logueado)**:
   - Visualización: Lista de alumnos con filtros (solo lectura)
   - Botón "Iniciar Sesión" disponible en la barra superior
   - No se pueden realizar operaciones CRUD
3. **Modo Administrador (Logueado)**:
   - **Autenticación**: Valida credenciales y guarda en localStorage
   - **Visualización**: Lista completa de alumnos con filtros
   - **CRUD**:
     - Crear: Botón "Agregar Alumno" → Formulario vacío
     - Editar: Icono lápiz → Formulario con datos
     - Eliminar: Icono papelera → Confirmación → Eliminar
   - Botón "Cerrar Sesión" disponible
4. **Persistencia**: Cada operación guarda en localStorage

## Ejercicios Prácticos

1. **Mejorar validación**: Agregar validación de URL de imagen
2. **Confirmación personalizada**: Crear componente de confirmación en lugar de `window.confirm`
3. **Mensajes de éxito**: Mostrar notificaciones al crear/editar/eliminar
4. **Búsqueda avanzada**: Agregar filtro por ciclo
5. **Ordenamiento**: Permitir ordenar por diferentes campos

## Control de Acceso

La aplicación implementa un sistema de permisos:

- **Usuarios no logueados**: Pueden ver la lista de alumnos y usar los filtros (solo lectura)
- **Administradores logueados**: Pueden ver, crear, editar y eliminar alumnos

**Implementación:**
- Los botones de editar/eliminar solo aparecen cuando `esAdmin === true`
- El botón "Agregar Alumno" solo se muestra para administradores
- El componente `InfoAdmin` muestra un botón de login para usuarios no logueados

## Resumen

En este ejercicio has aprendido:
- ✅ Implementar operaciones CRUD completas
- ✅ Gestionar autenticación de usuarios
- ✅ Persistir datos en localStorage
- ✅ Validar formularios
- ✅ Usar el patrón de servicios
- ✅ Renderizado condicional basado en permisos
- ✅ Implementar control de acceso (lectura pública, escritura solo para admins)

