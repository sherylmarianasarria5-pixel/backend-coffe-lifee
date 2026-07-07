import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cat_roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_rol')
      table.string('nombre_rol', 50).notNullable()
      table.string('descripcion', 255).nullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
