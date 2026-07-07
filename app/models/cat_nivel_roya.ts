import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class CatNivelRoya extends BaseModel {
  public static table = 'cat_niveles_roya'

  @column({ isPrimary: true, columnName: 'id_nivel' })
  declare idNivel: number

  @column({ columnName: 'nombre_nivel' })
  declare nombreNivel: string

  @column()
  declare descripcion: string | null

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime
}
