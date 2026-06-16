import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'fincas'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('activo').defaultTo(true).notNullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('activo')
    })
  }
}