# Tutorial Ejercicio 1: Filtros y Visualización

## Objetivos

En este ejercicio aprenderás a:
- Crear componentes React reutilizables
- Gestionar estado con `useState`
- Implementar filtros combinados
- Usar componentes de shadcn/ui
- Trabajar con props y children

## Estructura del Ejercicio

### 1. Configuración Inicial

Primero, configuramos el proyecto con Vite, React, Tailwind CSS y shadcn/ui.

**Archivos clave:**
- `package.json`: Dependencias del proyecto
- `vite.config.js`: Configuración de Vite
- `tailwind.config.js`: Configuración de Tailwind CSS
- `components.json`: Configuración de shadcn/ui

### 2. Componente Avatar

El componente `Avatar` muestra la imagen del alumno.

```jsx
function Avatar({ urlImagen, nombre, apellidos }) {
  return (
    <div className="flex-shrink-0">
      <img
        src={urlImagen}
        alt={`${nombre} ${apellidos}`}
        className="w-16 h-16 rounded-full object-cover border-2 border-border"
      />
    </div>
  );
}
```

**Conceptos clave:**
- Props: Recibe `urlImagen`, `nombre` y `apellidos`
- Manejo de errores: `onError` para imágenes rotas
- Estilos con Tailwind CSS

### 3. Componente Alumno

El componente `Alumno` muestra la información del alumno y acepta `children` para insertar el `Avatar`.

```jsx
function Alumno({ nombre, apellidos, promo, children }) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-4">
          {children}
          <div className="flex-1">
            <h3>{nombre} {apellidos}</h3>
            <p>Promoción: {promo}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

**Conceptos clave:**
- Children: Permite insertar componentes hijos
- Componentes de shadcn/ui: `Card` y `CardContent`
- Layout con Flexbox

### 4. Componente SelectorPromocion

Permite filtrar alumnos por promoción usando un select.

```jsx
function SelectorPromocion({ promociones, promocionSeleccionada, onPromocionChange }) {
  return (
    <Select
      value={promocionSeleccionada}
      onChange={(e) => onPromocionChange(e.target.value)}
    >
      <option value="">Todas las promociones</option>
      {promociones.map((promo) => (
        <option key={promo} value={promo}>{promo}</option>
      ))}
    </Select>
  );
}
```

**Conceptos clave:**
- Props: Recibe array de promociones y función callback
- Renderizado condicional: Mapeo de opciones
- Eventos: `onChange` para actualizar estado

### 5. Componente FiltroNombre

Permite buscar alumnos por nombre o apellidos.

```jsx
function FiltroNombre({ filtroNombre, onFiltroChange }) {
  return (
    <Input
      type="text"
      value={filtroNombre}
      onChange={(e) => onFiltroChange(e.target.value)}
    />
  );
}
```

**Conceptos clave:**
- Input controlado: `value` y `onChange`
- Componente `Input` de shadcn/ui
- Búsqueda en tiempo real

### 6. Componente App Principal

El componente `App` gestiona todo el estado y la lógica de filtrado.

**Estados:**
```jsx
const [alumnos, setAlumnos] = useState([]);
const [promociones, setPromociones] = useState([]);
const [promocion, setPromocion] = useState('');
const [filtroNombre, setFiltroNombre] = useState('');
const [alumnosFiltrados, setAlumnosFiltrados] = useState([]);
```

**Carga de datos:**
```jsx
useEffect(() => {
  setAlumnos(alumnosData);
  const promocionesUnicas = [...new Set(alumnosData.map(a => a.promocion))];
  setPromociones(promocionesUnicas.sort());
}, []);
```

**Filtrado combinado:**
```jsx
useEffect(() => {
  let resultado = [...alumnos];
  
  // Filtro por promoción
  if (promocion) {
    resultado = resultado.filter(a => a.promocion === promocion);
  }
  
  // Filtro por nombre (case-insensitive)
  if (filtroNombre.trim()) {
    const busqueda = filtroNombre.toLowerCase().trim();
    resultado = resultado.filter(a => {
      const nombreCompleto = `${a.nombre} ${a.apellidos}`.toLowerCase();
      return nombreCompleto.includes(busqueda);
    });
  }
  
  setAlumnosFiltrados(resultado);
}, [alumnos, promocion, filtroNombre]);
```

**Conceptos clave:**
- `useState`: Gestión de estado
- `useEffect`: Efectos secundarios y filtrado
- Filtrado combinado: Múltiples condiciones
- Case-insensitive: Búsqueda sin distinguir mayúsculas/minúsculas

## Ejercicios Prácticos

1. **Agregar filtro por ciclo**: Añade un selector para filtrar por ciclo (DAW, SMX, ARI, IEA)
2. **Mejorar búsqueda**: Implementa búsqueda también por ciclo
3. **Contador de resultados**: Muestra cuántos alumnos coinciden con los filtros
4. **Ordenamiento**: Permite ordenar por nombre, apellidos o promoción

## Resumen

En este ejercicio has aprendido:
- ✅ Crear componentes React reutilizables
- ✅ Gestionar estado con `useState`
- ✅ Usar `useEffect` para efectos secundarios
- ✅ Implementar filtros combinados
- ✅ Trabajar con props y children
- ✅ Usar componentes de shadcn/ui

