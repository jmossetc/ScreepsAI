const baseBody = [MOVE, CARRY, WORK];
const maxWorkBodyPart = 6;
const baseCost = 200;
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
            let workNumber = 1;
            switch (role) {
                case 'harvester':
                    console.log('base body : ' + body);

                    for (let i = 0; i < maxWorkBodyPart; i++) {
                        console.log(
                            'currentCost : ' + currentCost
                            + ' energyGiven : ' + energy
                        );
                        currentCost += priceMap[WORK];
                        if (currentCost <= energy) {
                            body.push(WORK);
                        }
                        else {
                            break;
                        }
                        console.log('for body : ' + body);

                    }
                    if (role == 'harvester') {
                        console.log('in harvester source assignement');

                        let sourceAssigned;
                        let sourceAssignedNumber = 0;
                        let memorySources = this.room.find(FIND_SOURCES);
                        for (let i = 0; i < memorySources.length; i++) {
                            let currentSourceAssignedNumber = _.filter(harvesters,
                                h => h.memory.source == memorySources[i]
                            ).length;
                            console.log('currentSourceAssigeddNumber : ' + currentSourceAssignedNumber);
                            if (currentSourceAssignedNumber <= sourceAssignedNumber) {
                                sourceAssignedNumber = currentSourceAssignedNumber;
                                sourceAssigned = memorySources[i];
                                console.log('source assigned : ' + memorySources[i]);
                            }
                        }
                        console.log('Assigned source : ' + sourceAssigned.id)
                        Object.assign(creepMemory, {source: sourceAssigned.id});
                    }
                    Object.assign(creepMemory, {energyContainer: undefined});
                    codeSpawnCreep = this.spawnCreep(body, role + Game.time, {
                        memory: creepMemory
                    });
                    console.log('code create spawn : ' + codeSpawnCreep);
                    return codeSpawnCreep;
                case 'hauler':
                    let orderHauler = [MOVE, CARRY];
                    while (currentCost <= energy) {
                        for (let bodyPart of orderHauler) {
                                console.log('in not work')
                                currentCost += priceMap[bodyPart];
                                if (currentCost <= energy)
                                    body.push(bodyPart);
                                else
                                    break;
                        }
                    }
                    console.log(body);

                    Object.assign(creepMemory, {fillingTarget: undefined, refillingTarget: undefined});
                    codeSpawnCreep = this.spawnCreep(body, role + Game.time, {
                        memory: {role: role}
                    });
                    return codeSpawnCreep;
                case 'upgrader':
                case 'repairer':
                case 'builder':
                default:
                    let order = [MOVE, CARRY, WORK];
                    while (currentCost <= energy) {
                        for (let bodyPart of order) {
                            if (bodyPart === WORK) {
                                if (workNumber <= maxWorkBodyPart) {
                                    console.log('in work');
                                    currentCost += priceMap[bodyPart];
                                    if (currentCost <= energy) {
                                        body.push(bodyPart);
                                        workNumber++;
                                    }
                                    else
                                        break;
                                }
                            }
                            else {
                                console.log('in not work');

                                currentCost += priceMap[bodyPart];
                                if (currentCost <= energy)
                                    body.push(bodyPart);
                                else
                                    break;
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
