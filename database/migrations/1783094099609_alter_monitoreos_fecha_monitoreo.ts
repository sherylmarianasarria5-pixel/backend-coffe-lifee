import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'monitoreos'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('fecha_monitoreo').notNullable().alter()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.date('fecha_monitoreo').notNullable().alter()
    })
  }
}
