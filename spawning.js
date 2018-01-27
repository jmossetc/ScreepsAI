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
const MAX_BUILDERS = 1;
const MAX_UPGRADERS = 4;
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
            let harvestersNumber = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;
            if (harvestersNumber < MAX_HARVESTERS) {
                if (harvestersNumber == 0) {
                    Game.spawns[spawnName].createCreepWithCustomRole(energyAvailable, 'harvester');
                }
                Game.spawns[spawnName].createCreepWithCustomRole(energy, 'harvester');
            }
            else if (_.filter(Game.creeps, (creep) => creep.memory.role == 'repairer').length < MAX_REPAIRERS) {
                Game.spawns[spawnName].createCreepWithCustomRole(energy, 'repairer');
            }
            else if (_.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length < MAX_UPGRADERS) {
                Game.spawns[spawnName].createCreepWithCustomRole(energy, 'upgrader');
            }
            else if (_.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length < MAX_BUILDERS) {
                Game.spawns[spawnName].createCreepWithCustomRole(energy, 'builder');
            }
        }
    }
};

module.exports = spawning;