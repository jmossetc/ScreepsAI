var spawning = require('spawning');
var creepManager = require('creepManager');

module.exports.loop = function () {
    //console.log(Game.time);
    if ((Game.time % 25) === 0) {
        spawning.run('Spawn1');
    }
    /*
    var tower = Game.getObjectById('TOWER_ID');
    if (tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }
    */
    creepManager.run();
    //console.log(Game.cpu.getUsed());
};