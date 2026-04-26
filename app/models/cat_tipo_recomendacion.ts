import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class CatTipoRecomendacion extends BaseModel {
  public static table = 'cat_tipos_recomendacion'

  @column({ isPrimary: true, columnName: 'id_tipo' })
  declare idTipo: number

  @column({ columnName: 'nombre_tipo' })
  declare nombreTipo: string

  @column()
  declare descripcion: string | null

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime
}