import { Table } from 'typeorm';

export default new Table({
  name: 'images',
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
      name: 'path',
      type: 'varchar',
    },
    {
      name: 'userId',
      type: 'integer',
    },
  ],
  foreignKeys: [
    {
      name: 'userImage',
      columnNames: ['userId'],
      referencedTableName: 'users',
      referencedColumnNames: ['id'],
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  ],
});
