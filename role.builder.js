var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        else if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter:(structure) =>{
                    return (
                        structure.hits  <  structure.hitsMax
                        );
                }
                });
            }
        }
        else {
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter:(structure) =>{
                    return (
                        structure.structureType == STRUCTURE_CONTAINER &&
                        structure.store.energy > 0
                        );
                }
            });
            var withdrawCode = creep.withdraw(sources[0]);
            if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;