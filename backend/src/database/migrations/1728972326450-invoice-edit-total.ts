import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class InvoiceEditTotal1728972326450 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'invoice',
      'total_amount',
      new TableColumn({
        name: 'total_amount',
        type: 'decimal',
        default: 0,
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'invoice',
      'total_amount',
      new TableColumn({
        name: 'total_amount',
        type: 'decimal',
        default: 0,
        isNullable: true,
      }),
    );
  }
}
