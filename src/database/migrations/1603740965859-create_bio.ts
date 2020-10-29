import { MigrationInterface, QueryRunner } from 'typeorm';
import BiosTable from '../tables/bios_table';

export class createBio1603740965859 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(BiosTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bio');
  }
}
