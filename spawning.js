/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawning.main');
 * mod.thing == 'a thing'; // true
 */
require('prototype.StructureSpawn')();

const MAX_HARVESTERS = 3;
const MAX_REPAIRERS = 1;
const MAX_BUILDERS = 2;
const MAX_UPGRADERS = 2;
const MIN_ENERGY = 200;
const MAX_PRICE_HARVESTER = 700;

var spawning = {
    run: function (spawnName) {
        //Remove dead creeps from memory
        for (let name in Memory.creeps) {
            if (Game.creeps[name] == undefined) {
                delete Memory.creeps[name];
            }
        }

        //Generate creeps
        let energyMax = Game.spawns[spawnName].room.energyCapacityAvailable;
        let energyAvailable = Game.spawns[spawnName].room.energyAvailable;
        if (energyAvailable > MIN_ENERGY) {
            let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            if (harvesters.length < MAX_HARVESTERS) {
                if (harvesters.length == 0) {
                    return Game.spawns[spawnName].createCreepWithCustomRole(energyAvailable, 'harvester', harvesters);
                }
                else if (energyAvailable >= MAX_PRICE_HARVESTER || energyAvailable == energyMax) {
                    return Game.spawns[spawnName].createCreepWithCustomRole(energyAvailable, 'harvester', harvesters);
                }
            }
            if (energyAvailable == energyMax) {
                let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
                if (repairers.length < MAX_REPAIRERS) {
                    return Game.spawns[spawnName].createCreepWithCustomRole(energyAvailable, 'repairer', undefined);
                }
                let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
                if (upgraders.length < MAX_UPGRADERS) {
                    return Game.spawns[spawnName].createCreepWithCustomRole(energyAvailable, 'upgrader', undefined);
                }
                let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
                if (builders.length < MAX_BUILDERS) {
                    return  Game.spawns[spawnName].createCreepWithCustomRole(energyAvailable, 'builder', undefined);
                }

            }
        }
    }
};

module.exports = spawning;