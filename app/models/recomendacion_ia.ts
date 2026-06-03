import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import AnalisisIa from '#models/analisis_ia'
import TratamientoIa from '#models/tratamiento_ia'

export default class RecomendacionIa extends BaseModel {
  public static table = 'recomendacion_ia'

  @column({ isPrimary: true })
  declare idRecomendacion: number

  @column()
  declare idAnalisis: number

  @column()
  declare idTipo: number | null

  @column()
  declare idPrioridad: number | null

  @column()
  declare descripcion: string | null

  @column.date()
  declare fechaLimite: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare fechaRegistro: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare fechaActualizacion: DateTime

  @belongsTo(() => AnalisisIa, { foreignKey: 'idAnalisis' })
  declare analisis: BelongsTo<typeof AnalisisIa>

  @hasMany(() => TratamientoIa, { foreignKey: 'idRecomendacion' })
  declare tratamientos: HasMany<typeof TratamientoIa>
}