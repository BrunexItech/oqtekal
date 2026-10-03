import * as migration_20261003_084318_initial from './20261003_084318_initial';

export const migrations = [
  {
    up: migration_20261003_084318_initial.up,
    down: migration_20261003_084318_initial.down,
    name: '20261003_084318_initial'
  },
];
