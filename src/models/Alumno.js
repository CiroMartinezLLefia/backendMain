import mongoose from 'mongoose';

const alumnoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
  },
  apellidos: {
    type: String,
    required: [true, 'Los apellidos son obligatorios'],
    trim: true,
  },
  promocion: {
    type: String,
    required: [true, 'La promoción es obligatoria'],
    trim: true,
  },
  ciclo: {
    type: String,
    required: [true, 'El ciclo es obligatorio'],
    enum: ['DAW', 'SMX', 'ARI', 'IEA'],
  },
  urlImagen: {
    type: String,
    required: [true, 'La URL de la imagen es obligatoria'],
    trim: true,
  },
}, {
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
});

// Índices para mejorar las búsquedas
alumnoSchema.index({ promocion: 1 });
alumnoSchema.index({ nombre: 'text', apellidos: 'text' });

const Alumno = mongoose.model('Alumno', alumnoSchema);

export default Alumno;

