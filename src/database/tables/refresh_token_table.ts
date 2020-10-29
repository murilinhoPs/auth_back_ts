import { Table } from 'typeorm';

export default new Table({
  name: 'refreshToken',
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
      name: 'token',
      type: 'text',
    },
    {
      name: 'userId',
      type: 'integer',
    },
  ],
  foreignKeys: [
    {
      name: 'userRefreshToken',
      columnNames: ['userId'],
      referencedTableName: 'users',
      referencedColumnNames: ['id'],
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  ],
});
