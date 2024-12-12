import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('product', (table) => {
      table.increments('id').primary();
      table.string('product_name', 60).notNullable();
      table.string('product_description', 60).notNullable();
      table.integer('price').notNullable();
      table.string('category', 60).notNullable();
      table.integer('stock_quantity').notNullable();
      table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('product');
}
