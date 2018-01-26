var spawningHarvesters = {
	run: function() {
		const maxHarvesters = 2;
		var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

	    if (harvesters.length < maxHarvesters) {
	        var newName = 'Harvester' + Game.time;
	        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
	            memory: {
	                role: 'harvester'
	            }
	        });
	    }
	}
};

module.exports = spawningHarvesters;