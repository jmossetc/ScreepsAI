var spawningUpgraders = {
	run: function() {

		var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

		if (upgraders.length < 2) {
			newName = 'Upgrader' + Game.time;
			Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName, {
				memory: {
					role: 'upgrader'
				}
			});
		}
	}
};

module.exports = spawningUpgraders;