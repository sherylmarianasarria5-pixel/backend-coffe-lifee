import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Usuario from '#models/usuario'
import Finca from '#models/finca'

export default class AsignacionExperto extends BaseModel {
  public static table = 'asignaciones_expertos'
  public static primaryKey = 'id_asignacion'

  @column({ isPrimary: true, columnName: 'id_asignacion' })
  declare idAsignacion: number

  @column({ columnName: 'id_experto' })
  declare idExperto: number

  @column({ columnName: 'id_finca' })
  declare idFinca: number

  @column()
  declare fechaAsignada: string

  @belongsTo(() => Usuario, {
    foreignKey: 'idExperto',
  })
  declare experto: BelongsTo<typeof Usuario>

  @belongsTo(() => Finca, {
    foreignKey: 'idFinca',
  })
  declare finca: BelongsTo<typeof Finca>

  @column.dateTime({ autoCreate: true, columnName: 'fecha_registro' })
  declare fechaRegistro: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'fecha_actualizacion' })
  declare fechaActualizacion: DateTime
}
