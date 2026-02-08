import Alumno from '../models/Alumno.js';

/**
 * Obtener todos los alumnos
 */
export const getAllAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.find().sort({ createdAt: -1 });
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener los alumnos',
      message: error.message 
    });
  }
};

/**
 * Obtener un alumno por ID
 */
export const getAlumnoById = async (req, res) => {
  try {
    const { id } = req.params;
    const alumno = await Alumno.findById(id);
    
    if (!alumno) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    
    res.json(alumno);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener el alumno',
      message: error.message 
    });
  }
};

/**
 * Crear un nuevo alumno
 */
export const createAlumno = async (req, res) => {
  try {
    const { nombre, apellidos, promocion, ciclo, urlImagen } = req.body;
    
    // Validación básica
    if (!nombre || !apellidos || !promocion || !ciclo || !urlImagen) {
      return res.status(400).json({ 
        error: 'Todos los campos son obligatorios' 
      });
    }
    
    const nuevoAlumno = new Alumno({
      nombre,
      apellidos,
      promocion,
      ciclo,
      urlImagen,
    });
    
    const alumnoGuardado = await nuevoAlumno.save();
    res.status(201).json(alumnoGuardado);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al crear el alumno',
      message: error.message 
    });
  }
};

/**
 * Actualizar un alumno
 */
export const updateAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellidos, promocion, ciclo, urlImagen } = req.body;
    
    const alumno = await Alumno.findByIdAndUpdate(
      id,
      { nombre, apellidos, promocion, ciclo, urlImagen },
      { new: true, runValidators: true }
    );
    
    if (!alumno) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    
    res.json(alumno);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al actualizar el alumno',
      message: error.message 
    });
  }
};

/**
 * Eliminar un alumno
 */
export const deleteAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const alumno = await Alumno.findByIdAndDelete(id);
    
    if (!alumno) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    
    res.json({ message: 'Alumno eliminado correctamente', alumno });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al eliminar el alumno',
      message: error.message 
    });
  }
};

/**
 * Filtrar alumnos por promoción
 */
export const getAlumnosByPromocion = async (req, res) => {
  try {
    const { promocion } = req.params;
    const alumnos = await Alumno.find({ promocion }).sort({ createdAt: -1 });
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener los alumnos por promoción',
      message: error.message 
    });
  }
};

/**
 * Buscar alumnos por nombre o apellidos
 */
export const searchAlumnos = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({ error: 'El parámetro de búsqueda es obligatorio' });
    }
    
    const alumnos = await Alumno.find({
      $or: [
        { nombre: { $regex: q, $options: 'i' } },
        { apellidos: { $regex: q, $options: 'i' } },
      ],
    }).sort({ createdAt: -1 });
    
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al buscar alumnos',
      message: error.message 
    });
  }
};

