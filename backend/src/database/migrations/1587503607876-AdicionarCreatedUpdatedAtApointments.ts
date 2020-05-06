import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AdicionarCreatedUpdatedAtApointments1587503607876
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumns('appointments', [
      new TableColumn({
        name: 'created_at',
        type: 'date',
        isNullable: false,
        default: 'now()',
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'date',
        isNullable: false,
        default: 'now()',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('appointments', 'created_at');
    await queryRunner.dropColumn('appointments', 'updated_at');
  }
}
