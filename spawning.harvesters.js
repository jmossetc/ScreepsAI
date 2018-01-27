var spawningHarvesters = {
    run: function () {
        const maxHarvesters = 4;
        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

        if (harvesters.length < maxHarvesters) {
            let newName = 'Harvester' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
                memory: {
                    role: 'harvester'
                }
            });
        }
    }
};

module.exports = spawningHarvesters;