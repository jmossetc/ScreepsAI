var spawningUpgraders = {
	run: function() {

		var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

		if (upgraders.length < 2) {
			newName = 'Upgrader' + Game.time;
			console.log('Trying to spawn new upgrader ' + newName);
			Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {
				memory: {
					role: 'upgrader'
				}
			});
		}
	}
};

module.exports = spawningUpgraders;