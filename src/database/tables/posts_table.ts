import { Table } from 'typeorm';

export default new Table({
  name: 'posts',
  columns: [
    {
      name: 'id',
      type: 'varchar',
      unsigned: true,
      isPrimary: true,
      isGenerated: true,
      generationStrategy: 'uuid',
    },
    {
      name: 'post',
      type: 'text',
    },
    {
      name: 'userId',
      type: 'integer',
    },
  ],
  foreignKeys: [
    {
      name: 'userPost',
      columnNames: ['userId'],
      referencedTableName: 'users',
      referencedColumnNames: ['id'],
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  ],
});
