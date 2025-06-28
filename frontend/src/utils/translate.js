import { translateDBEngineToCloudOptions } from './Mappers/dbEngineMapper';
import { translateLoadBalancerTypeToCloudOptions } from './Mappers/loadBalancerMapper';
import { translateStorageClassToCloudOptions } from './Mappers/objectStorageMapper';
import { translateLocationToRegionCodes } from './Mappers/regionMapper';
import { translateInstanceTypeCategory } from './Mappers/typeMapper';
import { translateStorageClassToCloudRedundancy } from './Mappers/redundencyMapper';
import { translateVMInstanceTypeCategory } from './Mappers/vmInstanceTypeMapper';
export function getTranslationParams(resourceParams) {
    let awsParams = {};
    let azureParams = {};
    if (resourceParams) {
        awsParams = {
            ...resourceParams,
            ...(resourceParams.os && { os: resourceParams.os }),
            ...(resourceParams.dbEngine && {
                databaseEngine: translateDBEngineToCloudOptions(resourceParams.dbEngine, 'aws')[0],
            }),
            ...(resourceParams.vmInstanceType && {
                instanceType: translateVMInstanceTypeCategory(resourceParams.vmInstanceType, 'aws')[0],
            }),
            ...(resourceParams.lbType && {
                lbType: translateLoadBalancerTypeToCloudOptions(resourceParams.lbType, 'aws')[0],
            }),
            ...(resourceParams.storageClass && {
                storageClass: translateStorageClassToCloudOptions(resourceParams.storageClass, 'aws')[0],
            }),
            ...(resourceParams.region && {
                region: translateLocationToRegionCodes(resourceParams.region, 'aws')[0],
            }),
            ...(resourceParams.instanceType && {
                instanceType: translateInstanceTypeCategory(resourceParams.instanceType, 'aws'),
            }),
        };
        azureParams = {
            ...(resourceParams.os && { os: resourceParams.os }),
            ...(resourceParams.dbEngine && {
                databaseEngine: translateDBEngineToCloudOptions(resourceParams.dbEngine, 'azure')[0],
            }),
            ...(resourceParams.vmInstanceType && {
                instanceType: translateVMInstanceTypeCategory(resourceParams.vmInstanceType, 'azure')[0],
            }),
            ...(resourceParams.lbType && {
                lbType: translateLoadBalancerTypeToCloudOptions(resourceParams.lbType, 'azure')[0],
            }),
            ...{
                storageTier: translateStorageClassToCloudOptions(resourceParams.storageClass, 'azure')[0],
            },
            ...(resourceParams.storageClass && {
                redundancy: translateStorageClassToCloudRedundancy(resourceParams.storageClass, 'azure')[0],
            }),
            ...(resourceParams.region && {
                region: translateLocationToRegionCodes(resourceParams.region, 'azure')[0],
            }),
            ...(resourceParams.instanceType && {
                skuName: translateInstanceTypeCategory(resourceParams.instanceType, 'azure')[0],
            }),
        };
    }
    return {
        awsParams,
        azureParams,
    };
}
//# sourceMappingURL=translate.js.map