import BaseSchema from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'imagenes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('idImagen')

      table.string('rutaImagen').notNullable()

      table
        .integer('idMonitoreo')
        .unsigned()
        .references('idMonitoreo')
        .inTable('monitoreos')
        .onDelete('CASCADE')

      table.timestamp('fechaRegistro')
      table.timestamp('fechaActualizacion')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}