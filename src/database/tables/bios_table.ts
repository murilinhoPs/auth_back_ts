import { Table } from 'typeorm';

export default new Table({
  name: 'bio',
  columns: [
    {
      name: 'id',
      type: 'integer',
      unsigned: true,
      isPrimary: true,
      isGenerated: true,
      generationStrategy: 'increment',
    },
    {
      name: 'content',
      type: 'text',
    },
    {
      name: 'userId',
      type: 'integer',
    },
  ],
  foreignKeys: [
    {
      name: 'userBio',
      columnNames: ['userId'],
      referencedTableName: 'users',
      referencedColumnNames: ['id'],
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  ],
});
