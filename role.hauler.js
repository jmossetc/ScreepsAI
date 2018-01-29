var roleHauler = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //Switching between refilling and hauling mode
        if (creep.memory.refilling && creep.carry.energy == creep.carryCapacity) {
            creep.memory.refilling = false;
        }
        else if (!creep.memory.working && creep.carry.energy == 0) {
            creep.memory.refilling = true;
        }

        if (creep.memory.refilling) {
            //Finding containers
            let container = Game.getObjectById(creep.memory.refillingTarget);
            if (container == undefined || container.store.energy == 0) {
                let sources = creep.room.find(FIND_SOURCES);
                for (let source of sources) {
                    let sourceContainers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                        filter: s => {
                            return (
                                s.structureType == STRUCTURE_CONTAINER &&
                                s.store.energy > 0
                            );
                        }
                    });
                    if (sourceContainers.length) {
                        container = sourceContainers[0];
                        creep.memory.refillingTarget = sourceContainers[0].id;
                        break;
                    }
                }
            }
            if (container != undefined) {
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else {
            let target = Game.getObjectById(creep.memory.fillingTarget);
            if (
                target == null ||
                target.structureType == STRUCTURE_CONTAINER ||
                target.energy == target.energyCapacity
            ) {
                //Transfer to spawn, extension and towers first
                let targetFound = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER
                            ) && structure.energy < structure.energyCapacity
                        );
                    }
                });
                if (targetFound == undefined ) {
                    if(target == null || target.structureType != STRUCTURE_CONTAINER || _.sum(target.store) < target.storeCapacity ){
                        let controllePos = creep.room.find(FIND_STRUCTURES, {
                            filter: s =>{
                                return s.structureType == STRUCTURE_CONTROLLER;
                            }
                        })[0].pos;
                        let targets = controllePos.findInRange(FIND_STRUCTURES, 2, {
                            filter: s => {
                                return (
                                    s.structureType == STRUCTURE_CONTAINER &&
                                    s.store.energy > 0
                                );
                            }
                        });
                        if (targets.length) {
                            target = targets[0];
                            creep.memory.fillingTarget = targets[0].id;
                        }
                    }
                }
                else {
                    target = targetFound;
                    creep.memory.fillingTarget = targetFound.id;
                }
            }

            if (target != undefined) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHauler;