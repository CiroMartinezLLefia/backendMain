# Guía de Git y Flujo de Trabajo

## Estrategia de Ramas

Este proyecto utiliza una estrategia de ramas por ejercicio:

- **master**: Rama principal con código estable
- **ejercicio-1**: Desarrollo del Ejercicio 1 (filtros y visualización)
- **ejercicio-2**: Desarrollo del Ejercicio 2 (CRUD + autenticación)
- **ejercicio-3**: Desarrollo del Ejercicio 3 (API Node.js + MongoDB)

## Convención de Commits

Utilizamos el formato de commits convencionales:

- `feat:` Nueva funcionalidad
- `fix:` Corrección de errores
- `docs:` Cambios en documentación
- `style:` Cambios de formato (sin afectar código)
- `refactor:` Refactorización de código
- `chore:` Tareas de mantenimiento

**Ejemplos:**
```bash
git commit -m "feat: componente SelectorPromocion con shadcn/ui"
git commit -m "fix: corrección en filtrado por nombre"
git commit -m "docs: actualización del README"
```

## Flujo de Trabajo

### 1. Crear Rama para un Ejercicio

```bash
# Asegúrate de estar en master
git checkout master

# Crea y cambia a la nueva rama
git checkout -b ejercicio-1
```

### 2. Desarrollar con Commits Descriptivos

```bash
# Hacer cambios en los archivos
# ...

# Agregar cambios
git add .

# Commit descriptivo
git commit -m "feat: componente Avatar"

# Continuar desarrollando...
git add .
git commit -m "feat: componente Alumno con shadcn/ui Card"
```

### 3. Merge a Master

Una vez completado el ejercicio:

```bash
# Cambiar a master
git checkout master

# Hacer merge de la rama
git merge ejercicio-1

# Crear tag de versión
git tag v1.0.0-ejercicio-1
```

### 4. Continuar con Siguiente Ejercicio

```bash
# Crear nueva rama desde master
git checkout -b ejercicio-2

# Desarrollar...
```

## Comandos Git Esenciales

### Configuración Inicial

```bash
# Configurar usuario (solo primera vez)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### Estado y Cambios

```bash
# Ver estado del repositorio
git status

# Ver diferencias
git diff

# Ver historial de commits
git log --oneline
```

### Trabajar con Ramas

```bash
# Listar ramas
git branch

# Crear nueva rama
git branch nombre-rama

# Cambiar de rama
git checkout nombre-rama

# Crear y cambiar a nueva rama
git checkout -b nombre-rama

# Eliminar rama (después de merge)
git branch -d nombre-rama
```

### Commits

```bash
# Agregar archivos específicos
git add archivo.js

# Agregar todos los cambios
git add .

# Commit
git commit -m "mensaje descriptivo"

# Modificar último commit (si no se ha hecho push)
git commit --amend -m "nuevo mensaje"
```

### Tags

```bash
# Crear tag
git tag v1.0.0-ejercicio-1

# Listar tags
git tag

# Ver información de un tag
git show v1.0.0-ejercicio-1

# Eliminar tag
git tag -d v1.0.0-ejercicio-1
```

### Merge

```bash
# Merge desde otra rama
git checkout master
git merge ejercicio-1

# Si hay conflictos, resolverlos y luego:
git add .
git commit -m "merge: resolver conflictos"
```

## Estructura de Commits del Proyecto

### Ejercicio 1

```bash
feat: configuración inicial React + Vite + Tailwind + shadcn/ui
feat: datos iniciales de alumnos en JSON
feat: componente SelectorPromocion con shadcn/ui
feat: componente FiltroNombre con shadcn/ui
feat: componente Alumno con shadcn/ui Card
feat: componente Avatar
feat: App principal con lógica de filtrado combinado
chore: finalización Ejercicio 1 - filtros y visualización
```

### Ejercicio 2

```bash
feat: servicio de persistencia con localStorage
feat: servicio de autenticación
feat: componente Login con shadcn/ui
feat: componente FormularioAlumno con shadcn/ui
feat: componente InfoAdmin con shadcn/ui
feat: acciones de editar/eliminar en componente Alumno
feat: integración completa CRUD y autenticación en App
chore: finalización Ejercicio 2 - CRUD y autenticación
```

### Ejercicio 3

```bash
feat: configuración inicial backend Node.js + Express
feat: configuración MongoDB Atlas y modelo Alumno
feat: controlador de alumnos con operaciones CRUD
feat: rutas de API para gestión de alumnos
feat: servidor Express con middleware y manejo de errores
feat: integración frontend con API backend
chore: finalización Ejercicio 3 - API Node.js + MongoDB
```

## Buenas Prácticas

1. **Commits frecuentes**: Haz commits pequeños y frecuentes
2. **Mensajes descriptivos**: Explica qué y por qué, no cómo
3. **Una funcionalidad por commit**: No mezcles múltiples cambios
4. **Revisar antes de commit**: Usa `git status` y `git diff`
5. **Mantener master estable**: Solo merge cuando el ejercicio esté completo

## Resolución de Conflictos

Si hay conflictos al hacer merge:

1. Git te indicará los archivos con conflictos
2. Abre los archivos y busca las marcas `<<<<<<<`, `=======`, `>>>>>>>`
3. Resuelve los conflictos manualmente
4. Agrega los archivos resueltos: `git add .`
5. Completa el merge: `git commit`

## Recursos Adicionales

- [Documentación oficial de Git](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Resumen

- ✅ Usa ramas separadas para cada ejercicio
- ✅ Haz commits descriptivos con convención
- ✅ Merge a master al completar cada ejercicio
- ✅ Crea tags de versión para cada ejercicio completado
- ✅ Mantén master estable y funcional

