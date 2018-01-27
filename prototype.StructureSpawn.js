let baseBody = [MOVE, CARRY];
let maxWorkBodyPart = 6;
let baseCost = 100;
let priceMap = {};
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
     * @returns {*} - StructureSpawn::spawnCreep() return values
     */
    StructureSpawn.prototype.createCreepWithCustomRole =
        function (energy, role) {
            let body = baseBody;
            let currentCost = baseCost;
            switch (role) {
                case 'upgrader':
                case 'harvester':
                    for (let i = 0; i < maxWorkBodyPart; i++) {
                        currentCost += priceMap[WORK];
                        if (currentCost <= energy)
                            body.push(WORK);
                        else
                            break;
                    }
                    break;
                case 'repairer':
                case 'builder':
                default:
                    let order = [WORK, MOVE, CARRY];
                    let workNumber = 1;
                    body.push(WORK);
                    while (currentCost<=energy) {
                        for (let bodyPart in order) {
                            if (!workNumber <= maxWorkBodyPart) {
                                currentCost += priceMap[bodyPart];
                                if (currentCost <= energy)
                                    body.push(bodyPart);
                                else
                                    break;
                            }
                        }
                    }
            }
            return this.createCreep(body, undefined, {role: role, working: false});
        };
};