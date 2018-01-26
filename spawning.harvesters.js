var spawningHarvesters = {
	run: function() {

		var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

	    if (harvesters.length < 2) {
	        var newName = 'Harvester' + Game.time;
	        console.log('Trying to spawn new harvester: ' + newName);
	        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {
	            memory: {
	                role: 'harvester'
	            }
	        });
	    }
	}
};

module.exports = spawningHarvesters;