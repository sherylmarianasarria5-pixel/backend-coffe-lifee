import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'recomendaciones'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('id_prioridad')
        .unsigned()
        .nullable()
        .references('id_prioridad')
        .inTable('cat_prioridades')
        .onDelete('SET NULL')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('id_prioridad')
    })
  }
}