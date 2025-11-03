import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateOrderTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'customer_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'restaurant_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'menu_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'quantity',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'total_price',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['PENDING', 'COMPLETED', 'CANCELLED'],
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          }
        ],
      }),
      true
    );


    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'fk_orders_customer_id',
        columnNames: ['customer_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'fk_orders_restaurant_id',
        columnNames: ['restaurant_id'],
        referencedTableName: 'restaurants',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'fk_orders_menu_id',
        columnNames: ['menu_id'],
        referencedTableName: 'menus',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'orders',
      new TableIndex({
        name: 'idx_orders_customer_id',
        columnNames: ['customer_id'],
      })
    );

    await queryRunner.createIndex(
      'orders',
      new TableIndex({
        name: 'idx_orders_customer_id',
        columnNames: ['customer_id'],
      })
    );

    await queryRunner.createIndex(
      'orders',
      new TableIndex({
        name: 'idx_orders_restaurant_id',
        columnNames: ['restaurant_id'],
      })
    );

    await queryRunner.createIndex(
      'orders',
      new TableIndex({
        name: 'idx_orders_restaurant_id',
        columnNames: ['restaurant_id'],
      })
    );

    await queryRunner.createIndex(
      'orders',
      new TableIndex({
        name: 'idx_orders_menu_id',
        columnNames: ['menu_id'],
      })
    );

    await queryRunner.createIndex(
      'orders',
      new TableIndex({
        name: 'idx_orders_status',
        columnNames: ['status'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('orders', 'idx_orders_customer_id');
    await queryRunner.dropIndex('orders', 'idx_orders_restaurant_id');
    await queryRunner.dropIndex('orders', 'idx_orders_menu_id');
    await queryRunner.dropIndex('orders', 'idx_orders_status');
    await queryRunner.dropForeignKey('orders', 'fk_orders_customer_id');
    await queryRunner.dropForeignKey('orders', 'fk_orders_restaurant_id');
    await queryRunner.dropForeignKey('orders', 'fk_orders_menu_id');
    await queryRunner.dropTable('orders');
  }
}
