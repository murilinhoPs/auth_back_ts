import { Table } from 'typeorm';

export default new Table({
  name: 'users',
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
      name: 'username',
      type: 'varchar', // string curta
    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'password',
      type: 'text',
    },
  ],
});
