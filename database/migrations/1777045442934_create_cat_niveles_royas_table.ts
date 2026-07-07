import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cat_niveles_roya'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_nivel')
      table.string('nombre_nivel', 50).notNullable()
      table.string('descripcion', 255).nullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
