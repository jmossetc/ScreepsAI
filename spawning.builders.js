var spawningBuilders = {
    run: function() {

        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

        if (builders.length < 2) {
            newName = 'Builder' + Game.time;
            console.log('Trying to spawn new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {
                memory: {
                    role: 'builder'
                }
            });
        }
    }
};

module.exports = spawningBuilders;