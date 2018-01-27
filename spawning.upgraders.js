var spawningUpgraders = {
	run: function() {

		let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

		if (upgraders.length < 4) {
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