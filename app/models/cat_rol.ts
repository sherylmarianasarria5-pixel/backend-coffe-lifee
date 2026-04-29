import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Usuario from '#models/usuario'

export default class CatRol extends BaseModel {
  public static table = 'cat_roles'

  @column({
    isPrimary: true,
    columnName: 'id_rol',
    serializeAs: 'idRol',
  })
  declare idRol: number

  @column({
    columnName: 'nombre_rol',
    serializeAs: 'nombreRol',
  })
  declare nombreRol: string

  @column({
    columnName: 'descripcion',
    serializeAs: 'descripcion',
  })
  declare descripcion: string | null

  @hasMany(() => Usuario, {
    foreignKey: 'idRol',
  })
  declare usuarios: HasMany<typeof Usuario>

  @column.dateTime({
    autoCreate: true,
    columnName: 'created_at',
    serializeAs: 'createdAt',
  })
  declare createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: 'updated_at',
    serializeAs: 'updatedAt',
  })
  declare updatedAt: DateTime
}