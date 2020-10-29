import { MigrationInterface, QueryRunner } from 'typeorm';
import UsersTable from '../tables/users_table';

export class createUsers1603508234587 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(UsersTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
