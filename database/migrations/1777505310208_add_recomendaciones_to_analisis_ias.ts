import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'analisis_ias'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.json('recomendaciones').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('recomendaciones')
    })
  }
}
