import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'insumos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_insumo')
      table.integer('id_tipo_insumo').unsigned().nullable()
        .references('id_tipo_insumo').inTable('cat_tipos_insumos').onDelete('SET NULL')
      table.string('nombre').notNullable()
      table.text('descripcion').nullable()
      table.timestamp('fecha_registro').defaultTo(this.now())
      table.timestamp('fecha_actualizacion').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
