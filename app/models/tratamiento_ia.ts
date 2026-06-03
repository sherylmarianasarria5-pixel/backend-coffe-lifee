import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import RecomendacionIa from '#models/recomendacion_ia'

export default class TratamientoIa extends BaseModel {
  public static table = 'tratamiento_ia'

  @column({ isPrimary: true })
  declare idTratamiento: number

  @column()
  declare idRecomendacion: number

  @column()
  declare idTipoTratamiento: number | null

  @column()
  declare nombre: string | null

  @column()
  declare descripcion: string | null

  @column.dateTime({ autoCreate: true })
  declare fechaRegistro: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare fechaActualizacion: DateTime

  @belongsTo(() => RecomendacionIa, { foreignKey: 'idRecomendacion' })
  declare recomendacion: BelongsTo<typeof RecomendacionIa>
}
