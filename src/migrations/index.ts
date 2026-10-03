import * as migration_20261003_084318_initial from './20261003_084318_initial';
import * as migration_20261003_114146_remove_team from './20261003_114146_remove_team';
import * as migration_20261003_160351_hero_and_reasons from './20261003_160351_hero_and_reasons';

export const migrations = [
  {
    up: migration_20261003_084318_initial.up,
    down: migration_20261003_084318_initial.down,
    name: '20261003_084318_initial',
  },
  {
    up: migration_20261003_114146_remove_team.up,
    down: migration_20261003_114146_remove_team.down,
    name: '20261003_114146_remove_team',
  },
  {
    up: migration_20261003_160351_hero_and_reasons.up,
    down: migration_20261003_160351_hero_and_reasons.down,
    name: '20261003_160351_hero_and_reasons'
  },
];
