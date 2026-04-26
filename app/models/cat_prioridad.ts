import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class CatPrioridad extends BaseModel {
  public static table = 'cat_prioridades'

  @column({ isPrimary: true, columnName: 'id_prioridad' })
  declare idPrioridad: number

  @column()
  declare nombre: string

  @column({ columnName: 'nivel_orden' })
  declare nivelOrden: number | null

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime
}