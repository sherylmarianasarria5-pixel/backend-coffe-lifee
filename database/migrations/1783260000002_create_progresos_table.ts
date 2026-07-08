import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'progresos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_cultivo').unsigned().notNullable()
        .references('id_cultivo').inTable('cultivos').onDelete('CASCADE')
      table.integer('id_recomendacion').unsigned().notNullable()
        .references('id_recomendacion').inTable('recomendaciones').onDelete('CASCADE')
      table.integer('dia').unsigned().notNullable()
      table.boolean('aplicado').notNullable()
      table.date('fecha').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.unique(['id_recomendacion', 'dia'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
