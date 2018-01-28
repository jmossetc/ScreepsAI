var roleRepairer = {

        /** @param {Creep} creep **/
        run: function (creep) {
            //Switching between repair and harvest mode
            if (creep.memory.working && creep.carry.energy == 0) {
                creep.memory.working = false;
            }
            else if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
                creep.memory.working = true;
            }

            if (creep.memory.working) {
                //Sorting damaged structures by hit point ratio
                let targets = creep.room.find(FIND_STRUCTURES, {
                    filter: s => {
                        return (
                            s.structureType == STRUCTURE_CONTAINER &&
                            s.hits < s.hitsMax
                        );
                    }
                }).sort((a, b) => (a.hits / a.hitsMax) - (b.hits / b.hitsMax));

                //console.log(targets.toString());
                if (targets.length) {
                    if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else {
                    /*
                    //Getting containers by hp ratio
                    targets = _.sortBy(creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER);
                        }
                    }), structure => (structure.hits / structure.hitsMax));
                    if (targets.length) {
                        if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }*/
                }
            }
            else {
                //Find containers with energy
                let sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_CONTAINER &&
                            structure.store.energy > 0
                        );
                    }
                });

                if (sources.length) {
                    if (creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
                else {
                    //Retrieve energy from source
                    sources = creep.room.find(FIND_SOURCES);
                    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
        }
    }
;

module.exports = roleRepairer;