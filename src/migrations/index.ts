import * as migration_20261003_084318_initial from './20261003_084318_initial';
import * as migration_20261003_114146_remove_team from './20261003_114146_remove_team';

export const migrations = [
  {
    up: migration_20261003_084318_initial.up,
    down: migration_20261003_084318_initial.down,
    name: '20261003_084318_initial',
  },
  {
    up: migration_20261003_114146_remove_team.up,
    down: migration_20261003_114146_remove_team.down,
    name: '20261003_114146_remove_team'
  },
];
