import { MigrationInterface, QueryRunner } from 'typeorm';
import PostsTable from '../tables/posts_table';

export class createPosts1603755798603 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(PostsTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('posts');
  }
}
