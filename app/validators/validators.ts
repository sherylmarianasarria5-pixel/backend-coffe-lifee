import vine from '@vinejs/vine'

// ── AUTH ──────────────────────────────────────────────────
export const loginValidator = vine.compile(
  vine.object({
    correo: vine.string().email().trim(),
    password: vine.string().minLength(6),
  })
)

export const recuperarPasswordValidator = vine.compile(
  vine.object({
    correo: vine.string().email().trim(),
  })
)

export const restablecerPasswordValidator = vine.compile(
  vine.object({
    token: vine.string(),
    nuevaPassword: vine.string().minLength(6),
  })
)

// ── USUARIOS ──────────────────────────────────────────────
export const usuarioStoreValidator = vine.compile(
  vine.object({
    id_rol: vine.number(),
    nombre: vine.string().trim().minLength(2).maxLength(100),
    apellido: vine.string().trim().minLength(2).maxLength(100),
    correo: vine.string().email().trim(),
    password: vine.string().minLength(6),
    telefono: vine.string().trim().optional(),
    observaciones: vine.string().trim().optional(),
    activo: vine.boolean().optional(),
  })
)

export const usuarioUpdateValidator = vine.compile(
  vine.object({
    id_rol: vine.number().optional(),
    nombre: vine.string().trim().minLength(2).optional(),
    apellido: vine.string().trim().minLength(2).optional(),
    correo: vine.string().email().trim().optional(),
    password: vine.string().minLength(6).optional(),
    telefono: vine.string().trim().optional(),
    observaciones: vine.string().trim().optional(),
    activo: vine.boolean().optional(),
  })
)

// ── FINCAS ────────────────────────────────────────────────
export const fincaStoreValidator = vine.compile(
  vine.object({
    id_usuario: vine.number(),
    nombre_finca: vine.string().trim().minLength(2).maxLength(150),
    municipio: vine.string().trim().optional(),
    departamento: vine.string().trim().optional(),
    latitud: vine.number().optional(),
    longitud: vine.number().optional(),
    altitud_msnm: vine.number().optional(),
    area_hectareas: vine.number().optional(),
  })
)

export const fincaUpdateValidator = vine.compile(
  vine.object({
    nombre_finca: vine.string().trim().minLength(2).optional(),
    municipio: vine.string().trim().optional(),
    departamento: vine.string().trim().optional(),
    latitud: vine.number().optional(),
    longitud: vine.number().optional(),
    altitud_msnm: vine.number().optional(),
    area_hectareas: vine.number().optional(),
  })
)

// ── CULTIVOS ──────────────────────────────────────────────
export const cultivoStoreValidator = vine.compile(
  vine.object({
    id_finca: vine.number(),
    nombre_cultivo: vine.string().trim().minLength(2).maxLength(255),
    tipo_cultivo: vine.string().trim().minLength(2).maxLength(255),
    id_estado_cultivo: vine.number().optional(),
  })
)

export const cultivoUpdateValidator = vine.compile(
  vine.object({
    nombre_cultivo: vine.string().trim().minLength(2).optional(),
    tipo_cultivo: vine.string().trim().optional(),
    id_estado_cultivo: vine.number().optional(),
  })
)

// ── MONITOREOS ────────────────────────────────────────────
export const monitoreoStoreValidator = vine.compile(
  vine.object({
    id_cultivo: vine.number(),
    id_experto: vine.number().optional(),
    fecha_monitoreo: vine.string().trim(),
    observaciones: vine.string().trim().optional(),
  })
)

export const monitoreoUpdateValidator = vine.compile(
  vine.object({
    fecha_monitoreo: vine.string().trim().optional(),
    observaciones: vine.string().trim().optional(),
  })
)

// ── TRATAMIENTOS ──────────────────────────────────────────
export const tratamientoStoreValidator = vine.compile(
  vine.object({
    id_tipo_tratamiento: vine.number(),
    nombre: vine.string().trim().minLength(2).maxLength(150),
    descripcion: vine.string().trim().optional(),
    dosis: vine.string().trim().optional(),
    frecuencia: vine.string().trim().optional(),
  })
)

export const tratamientoUpdateValidator = vine.compile(
  vine.object({
    id_tipo_tratamiento: vine.number().optional(),
    nombre: vine.string().trim().optional(),
    descripcion: vine.string().trim().optional(),
    dosis: vine.string().trim().optional(),
    frecuencia: vine.string().trim().optional(),
  })
)

// ── RECOMENDACIONES ───────────────────────────────────────
export const recomendacionStoreValidator = vine.compile(
  vine.object({
    id_monitoreo: vine.number(),
    id_experto_emisor: vine.number().optional(),
    id_tipo: vine.number().optional(),
    id_prioridad: vine.number().optional(),
    descripcion: vine.string().trim(),
    fecha_limite: vine.string().trim().optional(),
  })
)

export const recomendacionUpdateValidator = vine.compile(
  vine.object({
    id_tipo: vine.number().optional(),
    id_prioridad: vine.number().optional(),
    descripcion: vine.string().trim().optional(),
    fecha_limite: vine.string().trim().optional(),
  })
)

// ── ANALISIS IA ───────────────────────────────────────────
export const analisisIaStoreValidator = vine.compile(
  vine.object({
    id_imagen: vine.number(),
    id_estado_analisis: vine.number().optional(),
    resultado: vine.string().trim().optional(),
    confianza: vine.string().trim().optional(),
    observaciones: vine.string().trim().optional(),
  })
)

export const analisisIaUpdateValidator = vine.compile(
  vine.object({
    id_estado_analisis: vine.number().optional(),
    resultado: vine.string().trim().optional(),
    confianza: vine.string().trim().optional(),
    observaciones: vine.string().trim().optional(),
  })
)

// ── APLICACIONES TRATAMIENTOS ─────────────────────────────
export const aplicacionStoreValidator = vine.compile(
  vine.object({
    id_tratamiento: vine.number(),
    dosis: vine.string().trim(),
    frecuencia: vine.string().trim().optional(),
    observaciones: vine.string().trim().optional(),
  })
)

export const aplicacionUpdateValidator = vine.compile(
  vine.object({
    dosis: vine.string().trim().optional(),
    frecuencia: vine.string().trim().optional(),
    observaciones: vine.string().trim().optional(),
  })
)

// ── CATÁLOGOS (roles, tipos, estados, niveles, prioridades)
export const catalogoStoreValidator = vine.compile(
  vine.object({
    nombre: vine.string().trim().minLength(1).maxLength(100),
    descripcion: vine.string().trim().optional(),
  })
)

export const catalogoUpdateValidator = vine.compile(
  vine.object({
    nombre: vine.string().trim().optional(),
    descripcion: vine.string().trim().optional(),
  })
)
