"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTranslationParams = getTranslationParams;
const dbEngineMapper_1 = require("./Mappers/dbEngineMapper");
const loadBalancerMapper_1 = require("./Mappers/loadBalancerMapper");
const objectStorageMapper_1 = require("./Mappers/objectStorageMapper");
const regionMapper_1 = require("./Mappers/regionMapper");
const typeMapper_1 = require("./Mappers/typeMapper");
const redundencyMapper_1 = require("./Mappers/redundencyMapper");
const vmInstanceTypeMapper_1 = require("./Mappers/vmInstanceTypeMapper");
function getTranslationParams(resourceParams) {
    let awsParams = {};
    let azureParams = {};
    if (resourceParams) {
        awsParams = {
            ...resourceParams,
            ...(resourceParams.os && { os: resourceParams.os }),
            ...(resourceParams.dbEngine && {
                databaseEngine: (0, dbEngineMapper_1.translateDBEngineToCloudOptions)(resourceParams.dbEngine, 'aws')[0],
            }),
            ...(resourceParams.vmInstanceType && {
                instanceType: (0, vmInstanceTypeMapper_1.translateVMInstanceTypeCategory)(resourceParams.vmInstanceType, 'aws')[0],
            }),
            ...(resourceParams.lbType && {
                lbType: (0, loadBalancerMapper_1.translateLoadBalancerTypeToCloudOptions)(resourceParams.lbType, 'aws')[0],
            }),
            ...(resourceParams.storageClass && {
                storageClass: (0, objectStorageMapper_1.translateStorageClassToCloudOptions)(resourceParams.storageClass, 'aws')[0],
            }),
            ...(resourceParams.region && {
                region: (0, regionMapper_1.translateLocationToRegionCodes)(resourceParams.region, 'aws')[0],
            }),
            ...(resourceParams.instanceType && {
                instanceType: (0, typeMapper_1.translateInstanceTypeCategory)(resourceParams.instanceType, 'aws'),
            }),
        };
        azureParams = {
            ...(resourceParams.os && { os: resourceParams.os }),
            ...(resourceParams.dbEngine && {
                databaseEngine: (0, dbEngineMapper_1.translateDBEngineToCloudOptions)(resourceParams.dbEngine, 'azure')[0],
            }),
            ...(resourceParams.vmInstanceType && {
                instanceType: (0, vmInstanceTypeMapper_1.translateVMInstanceTypeCategory)(resourceParams.vmInstanceType, 'azure')[0],
            }),
            ...(resourceParams.lbType && {
                lbType: (0, loadBalancerMapper_1.translateLoadBalancerTypeToCloudOptions)(resourceParams.lbType, 'azure')[0],
            }),
            ...{
                storageTier: (0, objectStorageMapper_1.translateStorageClassToCloudOptions)(resourceParams.storageClass, 'azure')[0],
            },
            ...(resourceParams.storageClass && {
                redundancy: (0, redundencyMapper_1.translateStorageClassToCloudRedundancy)(resourceParams.storageClass, 'azure')[0],
            }),
            ...(resourceParams.region && {
                region: (0, regionMapper_1.translateLocationToRegionCodes)(resourceParams.region, 'azure')[0],
            }),
            ...(resourceParams.instanceType && {
                skuName: (0, typeMapper_1.translateInstanceTypeCategory)(resourceParams.instanceType, 'azure')[0],
            }),
        };
    }
    return {
        awsParams,
        azureParams,
    };
}
//# sourceMappingURL=translate.js.map