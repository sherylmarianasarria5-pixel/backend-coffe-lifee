import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Tratamiento from '#models/tratamiento'

export default class CatTipoTratamiento extends BaseModel {
  public static table = 'cat_tipos_tratamiento'

  @column({ isPrimary: true, columnName: 'id_tipo' })
  declare idTipo: number

  @column({ columnName: 'nombre_tipo' })
  declare nombreTipo: string

  @column()
  declare descripcion: string | null

  @hasMany(() => Tratamiento, {
    foreignKey: 'idTipoTratamiento',
  })
  declare tratamientos: HasMany<typeof Tratamiento>

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime
}