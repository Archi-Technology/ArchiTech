import { translateDBEngineToCloudOptions } from './Mappers/dbEngineMapper';
import { translateDBInstanceTypeToCloudOptions } from './Mappers/dbInstanceTypeMapper';
import { translateLoadBalancerTypeToCloudOptions } from './Mappers/loadBalancerMapper';
import { translateStorageClassToCloudOptions } from './Mappers/objectStorageMapper';
import { translateLocationToRegionCodes } from './Mappers/regionMapper';
import { translateInstanceTypeCategory } from './Mappers/typeMapper';
import { translateStorageClassToCloudRedundancy } from './Mappers/redundencyMapper';

export function getTranslationParams(resourceParams: Record<string, any>) {
    let awsParams: Record<string, any> = {};
    let azureParams: Record<string, any> = {};

    if (resourceParams) {
        awsParams = {
            ...resourceParams,
            ...(resourceParams.os && { os: resourceParams.os }),
            ...(resourceParams.dbEngine && {
                databaseEngine: translateDBEngineToCloudOptions(
                    resourceParams.dbEngine,
                    'aws',
                )[0],
            }),
            ...(resourceParams.dbInstanceType && {
                instanceType: translateDBInstanceTypeToCloudOptions(
                    resourceParams.dbInstanceType,
                    'aws',
                )[0],
            }),
            ...(resourceParams.lbType && {
                lbType: translateLoadBalancerTypeToCloudOptions(
                    resourceParams.lbType,
                    'aws',
                )[0],
            }),
            ...(resourceParams.storageClass && {
                storageClass: translateStorageClassToCloudOptions(
                    resourceParams.storageClass,
                    'aws',
                )[0],
            }),
            ...(resourceParams.region && {
                region: translateLocationToRegionCodes(
                    resourceParams.region,
                    'aws',
                )[0],
            }),
            ...(resourceParams.instanceType && {
                instanceType: translateInstanceTypeCategory(
                    resourceParams.instanceType,
                    'aws',
                )[0],
            }),
        };

        azureParams = {
            ...(resourceParams.os && { os: resourceParams.os }),
            ...(resourceParams.dbEngine && {
                databaseEngine: translateDBEngineToCloudOptions(
                    resourceParams.dbEngine,
                    'azure',
                )[0],
            }),
            ...(resourceParams.dbInstanceType && {
                instanceType: translateDBInstanceTypeToCloudOptions(
                    resourceParams.dbInstanceType,
                    'azure',
                )[0],
            }),
            ...(resourceParams.lbType && {
                lbType: translateLoadBalancerTypeToCloudOptions(
                    resourceParams.lbType,
                    'azure',
                )[0],
            }),
            ...({
                storageTier: translateStorageClassToCloudOptions(
                    resourceParams.storageClass,
                    'azure',
                )[0],
            }),
            ...(resourceParams.storageClass && {
                redundancy: translateStorageClassToCloudRedundancy(
                    resourceParams.storageClass,
                    'azure',
                )[0],
            }),
            ...(resourceParams.region && {
                region: translateLocationToRegionCodes(
                    resourceParams.region,
                    'azure',
                )[0],
            }),
            ...(resourceParams.instanceType && {
                instanceType: translateInstanceTypeCategory(
                    resourceParams.instanceType,
                    'azure',
                )[0],
            }),
        };
    }
    return {
        awsParams,
        azureParams,
    };
}
