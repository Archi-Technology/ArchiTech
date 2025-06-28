import  apiService from '../services/axios/AxiosInstance';
import { IGenericResponse } from '../interfaces/user';

import {
  getAllAvailableLocations,
} from '../utils/Mappers/regionMapper';

import {
  getAllAvailableInstanceCategories,
} from '../utils/Mappers/typeMapper';

import {
  getAllAvailableOSNames,
} from '../utils/Mappers/osMapper';

import {
  getAllAvailableObjectStorageClasses,
} from '../utils/Mappers/objectStorageMapper';

import {
  getAllAvailableLoadBalancerTypes,
} from '../utils/Mappers/loadBalancerMapper';

import {
  getAllAvailableDBInstanceTypes,
} from '../utils/Mappers/dbInstanceTypeMapper';

import {
  getAllAvailableDBEngineNames,
} from '../utils/Mappers/dbEngineMapper';

interface Recommendation {
  type?: string;
  region?: string;
  os?: string;
  storageClass?: string;
  lbType?: string;
  dbType?: string;
  dbEngine?: string;
}

export async function askOptimalChoices(serviceName: string) {
  let question = '';

  if (serviceName === 'Virtual Machine') {
    const instanceCategories = getAllAvailableInstanceCategories();
    const locations = getAllAvailableLocations();
    const osNames = getAllAvailableOSNames();
    question = `Given my user context, what are the optimal instance type, region, and OS for a virtual machine?
    I want to pick one as you see best from the following:
    instance categories: ${instanceCategories}
    regions: ${locations}
    OS types: ${osNames}.
    Please return the answer only as JSON, for example: {"type": "...", "region": "...", "os": "..."}`;
  } else if (serviceName === 'Object Storage') {
    const locations = getAllAvailableLocations();
    const storageClasses = getAllAvailableObjectStorageClasses();
    question = `Given my user context, what are the optimal region and storage class for a Object storage?
    I want to pick one as you see best from the following:
    regions: ${locations}
    storage classes: ${storageClasses}
    Please return the answer only as JSON, for example: {"region": "...", "storageClass": "..."}`;
  } else if (serviceName === 'Load Balancer') {
    const loadBalancerTypes = getAllAvailableLoadBalancerTypes();
    const locations = getAllAvailableLocations();
    question = `Given my user context, what are the optimal region and storage class for a load balancer?
    I want to pick one as you see best from the following:
    regions: ${locations}
    storage classes: ${loadBalancerTypes}
    Please return the answer only as JSON, for example: {"region": "...", "lbType": "..."}`;
  } else if (serviceName === 'Database') {
    const locations = getAllAvailableLocations();
    const dbInstanceTypes = getAllAvailableDBInstanceTypes();
    const dbEngines = getAllAvailableDBEngineNames();
    question = `Given my user context, what are the optimal region and storage class for a Database?
    I want to pick one as you see best from the following:
    regions: ${locations}
    DB instance type: ${dbInstanceTypes}
    DB engines: ${dbEngines}
    Please return the answer only in JSON, for example: {"region": "...", "dbType": "...", "dbEngine": "..."}`;
  }

  try {
    const response = await apiService.apiClient.post<IGenericResponse>('/chat', {
      question,
    });

    return response.data;
  } catch (error) {
    console.error('Error asking chat:', error);
    return null;
  }
}
export async function getResourceSuggestion(serviceName: string): Promise<IGenericResponse | null> {
  let question = '';

  if (serviceName === 'Virtual Machine') {
    question = `Given my user context, what is the best Virtual Machine instance according to the context: Spot, Reserved, or On-Demand? Explain why.
    Please return text only wihout any formatting, and your answer should start with "The best option is: " followed by the type. For example: "The best option is: Spot".
    Please no more than 3 sentences.`;
  } else if (serviceName === 'Object Storage') {
    question = `Given my user context, what is the best Object storage instance according to my user context and recommend between AWS S3 or Azure blob storage and Explain why.
    If you choose AWS S3: According to my user context refer to Lifecycle Policies,Object Versioning + Expiry  andData Compression
    If you choose Azure blob storage: According to my user context refer to Blob Lifecycle Management, Blob Versioning + Soft Delete,Compression + Chunking.
    Please return text only wihout any formatting, and your answer should start with "The best option is: " followed by the cloud provider.
    Please no more than 3 sentences.`;
  } else if (serviceName === 'Load Balancer') {
    question = `Given my user context, what is the best Load Balancer instance according to my user context and recommend between AWS ELB or Azure loadBalancer and Explain why.
    Please return text only wihout any formatting, and your answer should start with "The best option is: " followed by the cloud provider".
    Please no more than 3 sentences.`;
  } else if (serviceName === 'Database') {
    question = `Given my user context, what is the best Database according to my user context and recommend between AWS RDS or Azure SQL and Explain why.
    Please return text only wihout any formatting, and your answer should start with "The best option is: " followed by the cloud provider".
    Please no more than 3 sentences.`;
  }

  try {
    const response = await apiService.apiClient.post<IGenericResponse>('/chat', {
      question,
    });

    return response.data
  } catch (error) {
    console.error('Error asking chat:', error);
    return null;
  }
}

export function parseGeminiRecommendation(
  rawOutput: string,
): Record<string, string> | null {
  try {
    // Remove Markdown code block formatting
    const cleanedJson = rawOutput
      .trim()
      .replace(/^```json/, '') // remove starting ```json only, no whitespace
      .replace(/```$/, ''); // remove ending ```

    // Parse JSON
    const parsed = JSON.parse(cleanedJson);

    // Validate: must be a flat object with string values
    if (
      parsed &&
      typeof parsed === 'object' &&
      !Array.isArray(parsed) &&
      Object.values(parsed).every((v) => typeof v === 'string')
    ) {
      return parsed;
    }

    return null;
  } catch (error) {
    console.error('Failed to parse Gemini JSON:', error);
    return null;
  }
}
