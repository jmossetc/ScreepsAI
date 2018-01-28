/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawning.main');
 * mod.thing == 'a thing'; // true
 */
require('prototype.StructureSpawn')();

const MAX_HARVESTERS = 4;
const MAX_REPAIRERS = 1;
const MAX_BUILDERS = 2;
const MAX_UPGRADERS = 2;
const MIN_ENERGY = 200;

var spawning = {
    run: function (spawnName) {
        //Remove dead creeps from memory
        for (let name in Memory.creeps) {
            if (Game.creeps[name] == undefined) {
                delete Memory.creeps[name];
            }
        }

        //Generate creeps
        let energy = Game.spawns[spawnName].room.energyCapacityAvailable;
        let energyAvailable = Game.spawns[spawnName].room.energyAvailable;
        if (energyAvailable > MIN_ENERGY) {
            let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
            let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
            let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            if (harvesters.length < MAX_HARVESTERS) {
                if (harvesters.length == 0) {
                    Game.spawns[spawnName].createCreepWithCustomRole(energyAvailable, 'harvester', harvesters);
                }
                else if(energyAvailable == energy) {
                    Game.spawns[spawnName].createCreepWithCustomRole(energy, 'harvester', harvesters);
                }
            }
            else if(energyAvailable == energy) {
                if (repairers.length < MAX_REPAIRERS) {
                    Game.spawns[spawnName].createCreepWithCustomRole(energy, 'repairer', undefined);
                }
                else if (builders.length < MAX_BUILDERS) {
                    Game.spawns[spawnName].createCreepWithCustomRole(energy, 'builder', undefined);
                }
                else if (upgraders.length < MAX_UPGRADERS) {
                    Game.spawns[spawnName].createCreepWithCustomRole(energy, 'upgrader', undefined);
                }
            }
        }
    }
};

module.exports = spawning;