import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Usuario from '#models/usuario'

export default class Notificacione extends BaseModel {
  public static table = 'notificaciones'

  @column({ isPrimary: true })
  declare idNotificacion: number

  @column()
  declare idUsuario: number

  @column()
  declare tipo: string

  @column()
  declare titulo: string

  @column()
  declare mensaje: string

  @column()
  declare leida: boolean

  @column()
  declare idReferencia: number | null

  @column()
  declare tablaReferencia: string | null

  @column.dateTime({ autoCreate: true })
  declare fechaRegistro: DateTime

  @belongsTo(() => Usuario, {
    foreignKey: 'idUsuario',
  })
  declare usuario: BelongsTo<typeof Usuario>
}
