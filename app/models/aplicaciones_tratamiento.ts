import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Tratamiento from '#models/tratamiento'
import Usuario from '#models/usuario'

export default class AplicacionesTratamiento extends BaseModel {
  public static table = 'aplicaciones_tratamientos'
  public static primaryKey = 'id_aplicacion'

  @column({ isPrimary: true, columnName: 'id_aplicacion' })
  declare idAplicacion: number

  @column({ columnName: 'id_tratamiento' })
  declare idTratamiento: number

  @column({ columnName: 'id_usuario' })
  declare idUsuario: number | null

  @column.date({ columnName: 'fecha_aplicacion' })
  declare fechaAplicacion: DateTime | null

  @column()
  declare observacion: string | null

  @column.dateTime({ autoCreate: true, columnName: 'fecha_registro' })
  declare fechaRegistro: DateTime


  @belongsTo(() => Tratamiento, {
    foreignKey: 'idTratamiento',
  })
  declare tratamiento: BelongsTo<typeof Tratamiento>

  @belongsTo(() => Usuario, {
    foreignKey: 'idUsuario',
  })
  declare usuario: BelongsTo<typeof Usuario>
}
