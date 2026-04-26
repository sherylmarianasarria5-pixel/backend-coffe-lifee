import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class CatEstadoCultivo extends BaseModel {
  public static table = 'cat_estados_cultivo'

  @column({ isPrimary: true, columnName: 'id_estado' })
  declare idEstado: number

  @column({ columnName: 'nombre_estado' })
  declare nombreEstado: string

  @column()
  declare descripcion: string | null

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime
}