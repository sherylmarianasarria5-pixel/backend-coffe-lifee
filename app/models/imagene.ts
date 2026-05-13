import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Monitoreo from '#models/monitoreo'
import AnalisisIa from '#models/analisis_ia'

export default class Imagene extends BaseModel {
  public static table = 'imagenes'

  static readonly createdAtColumn = 'fechaRegistro'
  static readonly updatedAtColumn = 'fechaActualizacion'

  @column({ isPrimary: true, columnName: 'idImagen' })
  declare idImagen: number

  @column({ columnName: 'idMonitoreo' })
  declare idMonitoreo: number | null

  @column({ columnName: 'rutaImagen' })
  declare rutaImagen: string

  @column.dateTime({ autoCreate: true, columnName: 'fechaRegistro' })
  declare fechaRegistro: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'fechaActualizacion' })
  declare fechaActualizacion: DateTime | null

  @belongsTo(() => Monitoreo, {
    foreignKey: 'idMonitoreo',
  })
  declare monitoreo: BelongsTo<typeof Monitoreo>

  @hasMany(() => AnalisisIa, {
    foreignKey: 'idImagen',
  })
  declare analisis: HasMany<typeof AnalisisIa>
}
