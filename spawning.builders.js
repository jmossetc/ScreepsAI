var spawningBuilders = {
    run: function () {

        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

        if (builders.length < 4) {
            newName = 'Builder' + Game.time;
            //Spawning builder
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
                memory: {
                    role: 'builder'
                }
            });
        }
    }
};

module.exports = spawningBuilders;