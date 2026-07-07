import vine from '@vinejs/vine'

export const createUsuarioValidator = vine.compile(
  vine.object({
    nombre: vine.string().trim().minLength(2).maxLength(100),

    apellido: vine.string().trim().minLength(2).maxLength(100),

    correo: vine.string().email(),

    telefono: vine.string().optional(),

    password_hash: vine.string().minLength(6),

    id_rol: vine.number().optional(),
  })
)
