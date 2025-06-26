"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askOptimalChoices = askOptimalChoices;
exports.getResourceSuggestion = getResourceSuggestion;
exports.parseGeminiRecommendation = parseGeminiRecommendation;
const AxiosInstance_1 = require("../services/axios/AxiosInstance");
const regionMapper_1 = require("../utils/Mappers/regionMapper");
const typeMapper_1 = require("../utils/Mappers/typeMapper");
const osMapper_1 = require("../utils/Mappers/osMapper");
const objectStorageMapper_1 = require("../utils/Mappers/objectStorageMapper");
const loadBalancerMapper_1 = require("../utils/Mappers/loadBalancerMapper");
const dbInstanceTypeMapper_1 = require("../utils/Mappers/dbInstanceTypeMapper");
const dbEngineMapper_1 = require("../utils/Mappers/dbEngineMapper");
async function askOptimalChoices(serviceName) {
    let question = '';
    if (serviceName === 'Virtual Machine') {
        const instanceCategories = (0, typeMapper_1.getAllAvailableInstanceCategories)();
        const locations = (0, regionMapper_1.getAllAvailableLocations)();
        const osNames = (0, osMapper_1.getAllAvailableOSNames)();
        question = `Given my user context, what are the optimal instance type, region, and OS for a virtual machine?
    I want to pick one as you see best from the following:
    instance categories: ${instanceCategories}
    regions: ${locations}
    OS types: ${osNames}.
    Please return the answer only as JSON, for example: {"type": "...", "region": "...", "os": "..."}`;
    }
    else if (serviceName === 'Object Storage') {
        const locations = (0, regionMapper_1.getAllAvailableLocations)();
        const storageClasses = (0, objectStorageMapper_1.getAllAvailableObjectStorageClasses)();
        question = `Given my user context, what are the optimal region and storage class for a Object storage?
    I want to pick one as you see best from the following:
    regions: ${locations}
    storage classes: ${storageClasses}
    Please return the answer only as JSON, for example: {"region": "...", "storageClass": "..."}`;
    }
    else if (serviceName === 'Load Balancer') {
        const loadBalancerTypes = (0, loadBalancerMapper_1.getAllAvailableLoadBalancerTypes)();
        const locations = (0, regionMapper_1.getAllAvailableLocations)();
        question = `Given my user context, what are the optimal region and storage class for a load balancer?
    I want to pick one as you see best from the following:
    regions: ${locations}
    storage classes: ${loadBalancerTypes}
    Please return the answer only as JSON, for example: {"region": "...", "lbType": "..."}`;
    }
    else if (serviceName === 'Database') {
        const locations = (0, regionMapper_1.getAllAvailableLocations)();
        const dbInstanceTypes = (0, dbInstanceTypeMapper_1.getAllAvailableDBInstanceTypes)();
        const dbEngines = (0, dbEngineMapper_1.getAllAvailableDBEngineNames)();
        question = `Given my user context, what are the optimal region and storage class for a Database?
    I want to pick one as you see best from the following:
    regions: ${locations}
    DB instance type: ${dbInstanceTypes}
    DB engines: ${dbEngines}
    Please return the answer only in JSON, for example: {"region": "...", "dbType": "...", "dbEngine": "..."}`;
    }
    try {
        const response = await AxiosInstance_1.AxiosInstence.post('/chat', {
            question,
        });
        return response.data;
    }
    catch (error) {
        console.error('Error asking chat:', error);
        return null;
    }
}
async function getResourceSuggestion(serviceName) {
    let question = '';
    if (serviceName === 'Virtual Machine') {
        question = `Given my user context, what is the best Virtual Machine instance according to the context: Spot, Reserved, or On-Demand? Explain why.
    Please return text only wihout any formatting, and your answer should start with "The best option is: " followed by the type. For example: "The best option is: Spot".
    Please no more than 3 sentences.`;
    }
    else if (serviceName === 'Object Storage') {
        question = `Given my user context, what is the best Object storage instance according to my user context and recommend between AWS S3 or Azure blob storage and Explain why.
    If you choose AWS S3: According to my user context refer to Lifecycle Policies,Object Versioning + Expiry  andData Compression
    If you choose Azure blob storage: According to my user context refer to Blob Lifecycle Management, Blob Versioning + Soft Delete,Compression + Chunking.
    Please return text only wihout any formatting, and your answer should start with "The best option is: " followed by the cloud provider.
    Please no more than 3 sentences.`;
    }
    else if (serviceName === 'Load Balancer') {
        question = `Given my user context, what is the best Load Balancer instance according to my user context and recommend between AWS ELB or Azure loadBalancer and Explain why.
    Please return text only wihout any formatting, and your answer should start with "The best option is: " followed by the cloud provider".
    Please no more than 3 sentences.`;
    }
    else if (serviceName === 'Database') {
        question = `Given my user context, what is the best Database according to my user context and recommend between AWS RDS or Azure SQL and Explain why.
    Please return text only wihout any formatting, and your answer should start with "The best option is: " followed by the cloud provider".
    Please no more than 3 sentences.`;
    }
    try {
        const response = await AxiosInstance_1.AxiosInstence.post('/chat', {
            question,
        });
        return response.data;
    }
    catch (error) {
        console.error('Error asking chat:', error);
        return null;
    }
}
function parseGeminiRecommendation(rawOutput) {
    try {
        // Remove Markdown code block formatting
        const cleanedJson = rawOutput
            .trim()
            .replace(/^```json/, '') // remove starting ```json only, no whitespace
            .replace(/```$/, ''); // remove ending ```
        // Parse JSON
        const parsed = JSON.parse(cleanedJson);
        // Validate: must be a flat object with string values
        if (parsed &&
            typeof parsed === 'object' &&
            !Array.isArray(parsed) &&
            Object.values(parsed).every((v) => typeof v === 'string')) {
            return parsed;
        }
        return null;
    }
    catch (error) {
        console.error('Failed to parse Gemini JSON:', error);
        return null;
    }
}
//# sourceMappingURL=recommendation.js.map