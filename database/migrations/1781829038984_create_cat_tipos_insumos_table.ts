import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cat_tipos_insumos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_tipo_insumo')
      table.string('nombre').notNullable()
      table.timestamp('fecha_registro').defaultTo(this.now())
      table.timestamp('fecha_actualizacion').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
