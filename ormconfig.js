if (process.env.HOST !== 'localhost')
  module.exports = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ['./dist/models/**/*.js'],
    migrations: ['./dist/database/migrations/**/*.js'],
    cli: {
      migrationsDir: ['src/database/migrations/'],
      entitiesDir: 'src/models',
    },
  };
else {
  module.exports = {
    type: 'sqlite',
    database: 'database.sqlite',
    entities: ['./src/models/**/*.ts'],
    migrations: ['./scr/database/migrations/**/*.ts'],
    cli: {
      migrationsDir: ['src/database/migrations/'],
      entitiesDir: 'src/models',
    },
  };
}
