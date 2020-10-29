import { MigrationInterface, QueryRunner } from 'typeorm';
import ImagesTable from '../tables/images_table';

export class createImages1603575914507 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(ImagesTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }
}
