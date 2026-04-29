import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cultivos'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('id_estado')
        .unsigned()
        .nullable()
        .references('id_estado')
        .inTable('cat_estados_cultivo')
        .onDelete('SET NULL')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('id_estado')
    })
  }
}