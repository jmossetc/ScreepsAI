var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            let source = Game.getObjectById(creep.memory.source);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            let target = Game.getObjectById(creep.memory.energyContainer);
            if (target == undefined || (target.structureType == STRUCTURE_CONTAINER && _.sum(target.store) == target.capacity) || target.energy == target.energyCapacity) {
                //Transfer to spawn, extension and towers first
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER
                            ) && structure.energy < structure.energyCapacity
                        );
                    }
                });
                //If no target found search for a container
                if (target == null) {
                    target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return structure.structureType == STRUCTURE_CONTAINER && _.sum(structure.store) < structure.storeCapacity;
                        }
                    })
                }
                if (target != null) {
                    //console.log(target.toString());
                    creep.memory.energyContainer = target.id;
                }
            }

            //sorting target by distance
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = roleHarvester;