const baseBody = [MOVE, CARRY];
const maxWorkBodyPart = 6;
const baseCost = 100;
const priceMap = {};
priceMap[MOVE] = 50;
priceMap[WORK] = 100;
priceMap[CARRY] = 50;
priceMap[ATTACK] = 80;
priceMap[RANGED_ATTACK] = 150;
priceMap[TOUGH] = 10;
priceMap[HEAL] = 250;
priceMap[CLAIM] = 600;

//Module to Export
module.exports = function () {
    /**
     *
     * @param energy
     * @param role
     * @param harvesters
     * @returns {*} - StructureSpawn::spawnCreep() return values
     */
    StructureSpawn.prototype.createCreepWithCustomRole =
        function (energy, role, harvesters) {
            console.log('spawning : ' + role);
            let body = baseBody;
            let currentCost = baseCost;
            let codeSpawnCreep = OK;
            let creepMemory = {role: role};

            switch (role) {
                case 'upgrader':
                case 'harvester':
                    for (let i = 0; i < maxWorkBodyPart; i++) {
                        /*console.log(
                            'currentCost : ' + currentCost
                            + ' energyGiven : ' + energy
                        );*/
                        currentCost += priceMap[WORK];
                        if (currentCost <= energy) {
                            body.push(WORK);
                        }
                        else {
                            break;
                        }
                        //console.log('while body : ' + body);
                    }
                    if (role == 'harvester') {
                        //console.log('in harvester source assignement');


                        let sourceAssigned;
                        let sourceAssignedNumber = 0;
                        let memorySources = this.room.find(FIND_SOURCES);
                        //console.log('nb sources in room' + Memory.rooms['W7N5'].sources.length);
                        for (let i = 0; i < memorySources.length; i++) {
                            let currentSourceAssignedNumber = _.filter(harvesters,
                                h => h.memory.source == memorySources[i]
                            ).length;
                            //console.log('currentSourceAssigeddNumber : ' + currentSourceAssignedNumber);
                            if (currentSourceAssignedNumber <= sourceAssignedNumber) {
                                sourceAssignedNumber = currentSourceAssignedNumber;
                                sourceAssigned = memorySources[i];
                                //console.log('source assigned : ' + memorySources[i]);
                            }
                        }
                        //console.log('Assigned source : '+ sourceAssigned.id )
                        Object.assign(creepMemory, {source: sourceAssigned.id});
                    }
                    Object.assign(creepMemory, {energyContainer: undefined});
                    codeSpawnCreep = this.spawnCreep(body, role + Game.time, {
                        memory: creepMemory
                    });
                    return codeSpawnCreep;
                case 'repairer':
                case 'builder':
                default:
                    //console.log('builder or repairer');

                    let order = [WORK, MOVE, CARRY];
                    let workNumber = 1;
                    body.push(WORK);
                    currentCost+=100;
                    while (currentCost <= energy) {
                        for (let bodyPart of order) {
                            if (bodyPart === WORK) {
                                if (workNumber <= maxWorkBodyPart) {
                                    currentCost += priceMap[bodyPart];
                                    if (currentCost < energy) {
                                        body.push(bodyPart);
                                        workNumber++;
                                    }
                                }
                            }
                            else {
                                currentCost += priceMap[bodyPart];
                                if (currentCost < energy) {
                                    body.push(bodyPart);
                                }
                            }

                        }
                    }
                    console.log(body);

                    Object.assign(creepMemory, {energyContainer: undefined});
                    codeSpawnCreep = this.spawnCreep(body, role + Game.time, {
                        memory: {role: role}
                    });
                    return codeSpawnCreep;
            }
        };
};
