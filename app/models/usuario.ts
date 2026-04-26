import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeSave,
  belongsTo
} from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import hash from '@adonisjs/core/services/hash'
import CatRol from '#models/cat_rol'

export default class Usuario extends BaseModel {
  public static table = 'usuarios'
  public static primaryKey = 'id_usuario'

  @column({ isPrimary: true, columnName: 'id_usuario' })
  declare idUsuario: number

  @column({ columnName: 'id_rol' })
  declare idRol: number | null

  @belongsTo(() => CatRol, {
    foreignKey: 'idRol',
  })
  declare rol: BelongsTo<typeof CatRol>

  @column()
  declare nombre: string

  @column()
  declare apellido: string

  @column()
  declare correo: string

  @column()
  declare telefono: string | null

  @column({ columnName: 'password_hash', serializeAs: null })
  declare passwordHash: string

  @column()
  declare observaciones: string | null

  @column()
  declare activo: boolean

  @beforeSave()
  static async hashPassword(usuario: Usuario) {
    if (usuario.$dirty.passwordHash) {
      usuario.passwordHash = await hash.make(usuario.passwordHash)
    }
  }

  @column.dateTime({ autoCreate: true, columnName: 'fecha_registro' })
  declare fechaRegistro: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'fecha_actualizacion' })
  declare fechaActualizacion: DateTime
}