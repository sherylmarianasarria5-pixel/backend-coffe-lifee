import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'recomendaciones'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('aceptado').notNullable().defaultTo(false)
      table.timestamp('fecha_aceptacion').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('aceptado')
      table.dropColumn('fecha_aceptacion')
    })
  }
}
