import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'analisis_ias'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('idAnalisis')

      table
        .integer('idImagen')
        .unsigned()
        .references('idImagen')
        .inTable('imagenes')
        .onDelete('CASCADE')

      table
        .integer('idEstado')
        .unsigned()
        .references('id_estado')
        .inTable('cat_estados_analisis')

      table.text('resultado')
      table.decimal('porcentajeConfianza', 5, 2)

      table.timestamp('fechaRegistro').nullable()
      table.timestamp('fechaActualizacion').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}