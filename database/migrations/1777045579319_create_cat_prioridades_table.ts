import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cat_prioridades'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_prioridad')
      table.string('nombre', 30).notNullable()
      table.integer('nivel_orden').unsigned().nullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}