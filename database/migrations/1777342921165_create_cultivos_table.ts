import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cultivos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_cultivo')

      table.string('nombre_cultivo').notNullable()
      table.string('tipo_cultivo').notNullable()

      table.integer('id_finca').unsigned().nullable()

      table
        .foreign('id_finca')
        .references('id_finca')
        .inTable('fincas')
        .onDelete('SET NULL')

      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}