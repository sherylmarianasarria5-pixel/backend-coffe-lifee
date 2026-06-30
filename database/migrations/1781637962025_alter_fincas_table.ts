import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'fincas'

  async up() {
    const hasColumn = await this.schema.hasColumn(this.tableName, 'activo')
    if (!hasColumn) {
      this.schema.alterTable(this.tableName, (table) => {
        table.boolean('activo').defaultTo(true).notNullable()
      })
    }
  }

  async down() {
    const hasColumn = await this.schema.hasColumn(this.tableName, 'activo')
    if (hasColumn) {
      this.schema.alterTable(this.tableName, (table) => {
        table.dropColumn('activo')
      })
    }
  }
}
