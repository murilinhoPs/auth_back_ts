import { MigrationInterface, QueryRunner } from 'typeorm';
import RefreshTokenTable from '../tables/refresh_token_table';

export class createRefreshToken1603894603803 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(RefreshTokenTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('refreshToken');
  }
}
