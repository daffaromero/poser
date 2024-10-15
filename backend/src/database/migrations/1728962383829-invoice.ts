import { time } from 'console';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Invoice1728962383829 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'invoice',
        columns: [
          {
            name: 'invoice_no',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'date',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: true,
          },
          {
            name: 'customer',
            type: 'varchar',
            default: null,
            isNullable: true,
          },
          {
            name: 'salesperson',
            type: 'varchar',
            default: null,
          },
          {
            name: 'payment_type',
            type: 'varchar',
            default: "'CASH'",
            isGenerated: false,
          },
          {
            name: 'notes',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'products',
            type: 'json',
            isGenerated: false,
          },
          {
            name: 'total_amount',
            type: 'decimal',
            default: 0,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('invoice');
  }
}
