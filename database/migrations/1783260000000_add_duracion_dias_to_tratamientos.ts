import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tratamientos'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('duracion_dias').unsigned().nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('duracion_dias')
    })
  }
}
