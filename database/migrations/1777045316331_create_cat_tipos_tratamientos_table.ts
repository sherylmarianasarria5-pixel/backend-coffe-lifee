import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cat_tipos_tratamiento'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_tipo')
      table.string('nombre_tipo', 80).notNullable()
      table.string('descripcion', 255).nullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
