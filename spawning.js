/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawning.main');
 * mod.thing == 'a thing'; // true
 */
var spawningBuilders = require('spawning.builders');
var spawningUpgraders = require('spawning.upgraders');
var spawningHarvesters = require('spawning.harvesters');

var spawning  = {
	run: function() {
		//Remove dead creeps from memory
		for(let name in Memory.creeps){
			if(Game.creeps[name] == undefined){
				delete Memory.creeps[name];
			}
		}

		//Calling spawners
		spawningBuilders.run();
		spawningUpgraders.run();
		spawningHarvesters.run();

	    if (Game.spawns['Spawn1'].spawning) {
	        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
	        Game.spawns['Spawn1'].room.visual.text(
	            '🛠️' + spawningCreep.memory.role,
	            Game.spawns['Spawn1'].pos.x + 1,
	            Game.spawns['Spawn1'].pos.y, {
	                align: 'left',
	                opacity: 0.8
	            });
	    }
	}
};

module.exports = spawning;