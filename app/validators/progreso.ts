import vine from '@vinejs/vine'

export const guardarProgresoValidator = vine.compile(
  vine.object({
    idCultivo: vine.number(),
    idRecomendacion: vine.number(),
    dia: vine.number().positive(),
    aplicado: vine.boolean(),
    fecha: vine.date({ formats: { utc: true } }),
  })
)

export const aceptarRecomendacionValidator = vine.compile(
  vine.object({
    idCultivo: vine.number(),
  })
)
