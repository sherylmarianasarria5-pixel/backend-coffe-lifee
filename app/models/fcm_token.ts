import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Usuario from '#models/usuario'

export default class FcmToken extends BaseModel {
  public static table = 'fcm_tokens'

  @column({ isPrimary: true, columnName: 'id_fcm_token' })
  declare idFcmToken: number

  @column({ columnName: 'id_usuario' })
  declare idUsuario: number

  @column()
  declare token: string

  @belongsTo(() => Usuario, {
    foreignKey: 'idUsuario',
  })
  declare usuario: BelongsTo<typeof Usuario>

  @column.dateTime({ autoCreate: true, columnName: 'fecha_registro' })
  declare fechaRegistro: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'fecha_actualizacion' })
  declare fechaActualizacion: DateTime
}
