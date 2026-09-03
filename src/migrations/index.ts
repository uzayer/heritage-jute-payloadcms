import * as migration_20260903_175934_initial_sqlite_schema from './20260903_175934_initial_sqlite_schema';

export const migrations = [
  {
    up: migration_20260903_175934_initial_sqlite_schema.up,
    down: migration_20260903_175934_initial_sqlite_schema.down,
    name: '20260903_175934_initial_sqlite_schema'
  },
];
