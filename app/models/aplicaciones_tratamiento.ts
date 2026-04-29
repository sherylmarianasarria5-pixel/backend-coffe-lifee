import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Tratamiento from '#models/tratamiento'

export default class AplicacionesTratamiento extends BaseModel {
  public static table = 'aplicaciones_tratamientos'
  public static primaryKey = 'id_aplicacion'

  @column({ isPrimary: true, columnName: 'id_aplicacion' })
  declare idAplicacion: number

  @column({ columnName: 'id_tratamiento' })
  declare idTratamiento: number | null

  @column()
  declare dosis: string

  @column()
  declare frecuencia: string | null

  @column()
  declare observaciones: string | null

  @column.dateTime({ autoCreate: true, columnName: 'fecha_registro' })
  declare fechaRegistro: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'fecha_actualizacion' })
  declare fechaActualizacion: DateTime

  @belongsTo(() => Tratamiento, {
    foreignKey: 'idTratamiento',
  })
  declare tratamiento: BelongsTo<typeof Tratamiento>
}