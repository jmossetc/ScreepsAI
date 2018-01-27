var spawningBuilders = {
    run: function () {

        let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

        if (builders.length < 2) {
            let newName = 'Builder' + Game.time;
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