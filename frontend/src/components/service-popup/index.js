'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServicePopup;
const jsx_runtime_1 = require("react/jsx-runtime");
require("./index.scss");
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
const recommendation_1 = require("../../utils/recommendation");
const regionMapper_1 = require("../../utils/Mappers/regionMapper");
const osMapper_1 = require("../../utils/Mappers/osMapper");
const objectStorageMapper_1 = require("../../utils/Mappers/objectStorageMapper");
const loadBalancerMapper_1 = require("../../utils/Mappers/loadBalancerMapper");
const dbInstanceTypeMapper_1 = require("../../utils/Mappers/dbInstanceTypeMapper");
const dbEngineMapper_1 = require("../../utils/Mappers/dbEngineMapper");
const vmInstanceTypeMapper_1 = require("../../utils/Mappers/vmInstanceTypeMapper");
const resource_modal_1 = __importDefault(require("../resource-modal"));
function ServicePopup({ service, onConfirm, onCancel, }) {
    const [selectedVPC, setSelectedVPC] = (0, react_1.useState)('');
    const [selectedSubnet, setSelectedSubnet] = (0, react_1.useState)('');
    const [selectedPricing, setSelectedPricing] = (0, react_1.useState)('');
    const [selectedInstanceType, setSelectedInstanceType] = (0, react_1.useState)('');
    const [selectedVmInstanceType, setSelectedVmInstanceType] = (0, react_1.useState)('');
    const [selectedRegion, setSelectedRegion] = (0, react_1.useState)('');
    const [selectedOS, setSelectedOS] = (0, react_1.useState)('');
    const [selectedStorageClass, setSelectedStorageClass] = (0, react_1.useState)('');
    const [selectedLBType, setSelectedLBType] = (0, react_1.useState)('');
    const [selectedDBInstanceType, setSelectedDBInstanceType] = (0, react_1.useState)('');
    const [selectedDBEngine, setSelectedDBEngine] = (0, react_1.useState)('');
    const [selectedRedundancy, setSelectedRedundancy] = (0, react_1.useState)('');
    const [recommendation, setRecommendation] = (0, react_1.useState)('');
    const [currentPage, setCurrentPage] = (0, react_1.useState)('form');
    const [formData, setFormData] = (0, react_1.useState)(null);
    const [formErrors, setFormErrors] = (0, react_1.useState)({});
    const [showValidation, setShowValidation] = (0, react_1.useState)(false);
    const [shakingFields, setShakingFields] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        setRecommendation(`Based on your app context, click here to get optimal cost and performance for "${service.name}".`);
    }, [service]);
    const handleNext = () => {
        setShowValidation(true);
        const errors = {};
        const fieldsToShake = [];
        if (service.name === 'Virtual Machine') {
            if (!selectedVmInstanceType) {
                errors.instanceType = 'Please select an instance type';
                fieldsToShake.push('instanceType');
            }
            if (!selectedRegion) {
                errors.region = 'Please select a region';
                fieldsToShake.push('region');
            }
            if (!selectedOS) {
                errors.os = 'Please select an operating system';
                fieldsToShake.push('os');
            }
        }
        else if (service.name === 'Object Storage') {
            if (!selectedRegion) {
                errors.region = 'Please select a region';
                fieldsToShake.push('region');
            }
            if (!selectedStorageClass) {
                errors.storageClass = 'Please select a storage class';
                fieldsToShake.push('storageClass');
            }
        }
        else if (service.name === 'Load Balancer') {
            if (!selectedRegion) {
                errors.region = 'Please select a region';
                fieldsToShake.push('region');
            }
            if (!selectedLBType) {
                errors.lbType = 'Please select a load balancer type';
                fieldsToShake.push('lbType');
            }
        }
        else if (service.name === 'Database') {
            if (!selectedRegion) {
                errors.region = 'Please select a region';
                fieldsToShake.push('region');
            }
            if (!selectedDBInstanceType) {
                errors.dbInstanceType = 'Please select a database instance type';
                fieldsToShake.push('dbInstanceType');
            }
            if (!selectedDBEngine) {
                errors.dbEngine = 'Please select a database engine';
                fieldsToShake.push('dbEngine');
            }
        }
        setFormErrors(errors);
        // Trigger shaking animation
        setShakingFields(fieldsToShake);
        setTimeout(() => {
            setShakingFields([]);
        }, 500);
        if (Object.keys(errors).length === 0) {
            const data = {
                service: service.name,
                ...(service.name === 'Virtual Machine' && {
                    vmInstanceType: selectedVmInstanceType,
                    region: selectedRegion,
                    os: selectedOS,
                }),
                ...(service.name === 'Object Storage' && {
                    region: selectedRegion,
                    storageClass: selectedStorageClass,
                }),
                ...(service.name === 'Load Balancer' && {
                    region: selectedRegion,
                    lbType: selectedLBType,
                }),
                ...(service.name === 'Database' && {
                    region: selectedRegion,
                    instanceType: selectedDBInstanceType,
                    databaseEngine: selectedDBEngine,
                }),
            };
            setFormData(data);
            setCurrentPage('price-comparison');
        }
    };
    const handleConfirm = (selectedCloud, pricing) => {
        if (service.name === 'Virtual Machine') {
            onConfirm({
                vmInstanceType: selectedVmInstanceType,
                region: selectedRegion,
                os: selectedOS,
                pricing: pricing,
                cloud: selectedCloud,
            }, 'virtual-machine', selectedCloud);
        }
        else if (service.name === 'Object Storage') {
            onConfirm({
                region: selectedRegion,
                storageClass: selectedStorageClass,
                pricing: pricing,
                cloud: selectedCloud,
            }, 'object-storage', selectedCloud);
        }
        else if (service.name === 'Load Balancer') {
            onConfirm({
                region: selectedRegion,
                lbType: selectedLBType,
                pricing: pricing,
                cloud: selectedCloud,
            }, 'load-balancer', selectedCloud);
        }
        else if (service.name === 'Database') {
            onConfirm({
                region: selectedRegion,
                dbInstanceType: selectedDBInstanceType,
                engine: selectedDBEngine,
                pricing: pricing,
                cloud: selectedCloud,
            }, 'database', selectedCloud);
        }
        onCancel(); // Close the current ServicePopup
    };
    const isFormValid = () => {
        if (service.name === 'Virtual Machine') {
            return selectedVmInstanceType && selectedRegion && selectedOS;
        }
        else if (service.name === 'Object Storage') {
            return selectedRegion && selectedStorageClass;
        }
        else if (service.name === 'Load Balancer') {
            return selectedRegion && selectedLBType;
        }
        else if (service.name === 'Database') {
            return selectedRegion && selectedDBInstanceType && selectedDBEngine;
        }
        return false;
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "popup-overlay", children: (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { mode: "wait", children: currentPage === 'form' ? ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "popup-content", initial: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -300 }, transition: { duration: 0.3 }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "popup-recommendation", children: [(0, jsx_runtime_1.jsx)("div", { className: "chatbot-icon", children: "\uD83E\uDD16" }), (0, jsx_runtime_1.jsx)("button", { className: "popup-button ai", style: { background: 'none' }, onClick: async () => {
                                    const answer = await (0, recommendation_1.askOptimalChoices)(service.name);
                                    const parsed = (0, recommendation_1.parseGeminiRecommendation)(answer?.message ?? '');
                                    if (parsed) {
                                        try {
                                            if (service.name === 'Virtual Machine') {
                                                setSelectedVmInstanceType(parsed.type || '');
                                                setSelectedRegion(parsed.region || '');
                                                setSelectedOS(parsed.os || '');
                                            }
                                            else if (service.name === 'Object Storage') {
                                                setSelectedRegion(parsed.region || '');
                                                setSelectedStorageClass(parsed.storageClass || '');
                                            }
                                            else if (service.name === 'Load Balancer') {
                                                setSelectedRegion(parsed.region || '');
                                                setSelectedLBType(parsed.lbType || '');
                                            }
                                            else if (service.name === 'Database') {
                                                setSelectedRegion(parsed.region || '');
                                                setSelectedDBInstanceType(parsed.dbType || '');
                                                setSelectedDBEngine(parsed.dbEngine || '');
                                            }
                                            setRecommendation(`Optimal choices for "${service.name}" have been set.`);
                                        }
                                        catch (e) {
                                            if (e instanceof Error) {
                                                setRecommendation(e.message);
                                            }
                                            else {
                                                setRecommendation(String(e));
                                            }
                                        }
                                    }
                                }, children: (0, jsx_runtime_1.jsx)("p", { children: recommendation }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "popup-service", children: [(0, jsx_runtime_1.jsx)("div", { className: "popup-service-icon", children: service.icon }), (0, jsx_runtime_1.jsx)("div", { className: "popup-service-name", children: service.name })] }), service.name === 'Virtual Machine' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "popup-selection", children: [(0, jsx_runtime_1.jsx)("label", { children: "Instance Type:" }), (0, jsx_runtime_1.jsxs)("select", { value: selectedVmInstanceType, onChange: (e) => setSelectedVmInstanceType(e.target.value), className: `text-center ${showValidation && formErrors.vmInstanceType ? 'error' : ''} ${shakingFields.includes('vmInstanceType') ? 'shake' : ''}`, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "-- Select Instance Type --" }), (0, vmInstanceTypeMapper_1.getAllAvailableVMInstanceCategories)().map((type) => ((0, jsx_runtime_1.jsx)("option", { value: type, children: type }, type)))] }), showValidation && formErrors.vmInstanceType && ((0, jsx_runtime_1.jsx)("div", { className: "error-message", children: formErrors.vmInstanceType }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "popup-selection", children: [(0, jsx_runtime_1.jsx)("label", { children: "Region:" }), (0, jsx_runtime_1.jsxs)("select", { value: selectedRegion, onChange: (e) => setSelectedRegion(e.target.value), className: `text-center ${showValidation && formErrors.region ? 'error' : ''} ${shakingFields.includes('region') ? 'shake' : ''}`, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "-- Select Region --" }), (0, regionMapper_1.getAllAvailableLocations)().map((loc) => ((0, jsx_runtime_1.jsx)("option", { value: loc, children: loc }, loc)))] }), showValidation && formErrors.region && ((0, jsx_runtime_1.jsx)("div", { className: "error-message", children: formErrors.region }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "popup-selection", children: [(0, jsx_runtime_1.jsx)("label", { children: "Operating System:" }), (0, jsx_runtime_1.jsxs)("select", { value: selectedOS, onChange: (e) => setSelectedOS(e.target.value), className: `text-center ${showValidation && formErrors.os ? 'error' : ''} ${shakingFields.includes('os') ? 'shake' : ''}`, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "-- Select OS --" }), (0, osMapper_1.getAllAvailableOSNames)().map((os) => ((0, jsx_runtime_1.jsx)("option", { value: os, children: os }, os)))] }), showValidation && formErrors.os && ((0, jsx_runtime_1.jsx)("div", { className: "error-message", children: formErrors.os }))] })] })), service.name === 'Object Storage' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "popup-selection", children: [(0, jsx_runtime_1.jsx)("label", { children: "Region:" }), (0, jsx_runtime_1.jsxs)("select", { value: selectedRegion, onChange: (e) => setSelectedRegion(e.target.value), className: `text-center ${showValidation && formErrors.region ? 'error' : ''} ${shakingFields.includes('region') ? 'shake' : ''}`, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "-- Select Region --" }), (0, regionMapper_1.getAllAvailableLocations)().map((loc) => ((0, jsx_runtime_1.jsx)("option", { value: loc, children: loc }, loc)))] }), showValidation && formErrors.region && ((0, jsx_runtime_1.jsx)("div", { className: "error-message", children: formErrors.region }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "popup-selection", children: [(0, jsx_runtime_1.jsx)("label", { children: "Storage Class:" }), (0, jsx_runtime_1.jsxs)("select", { value: selectedStorageClass, onChange: (e) => setSelectedStorageClass(e.target.value), className: `text-center ${showValidation && formErrors.storageClass ? 'error' : ''} ${shakingFields.includes('storageClass') ? 'shake' : ''}`, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "-- Select Storage Class --" }), (0, objectStorageMapper_1.getAllAvailableObjectStorageClasses)().map((sc) => ((0, jsx_runtime_1.jsx)("option", { value: sc, children: sc }, sc)))] }), showValidation && formErrors.storageClass && ((0, jsx_runtime_1.jsx)("div", { className: "error-message", children: formErrors.storageClass }))] })] })), service.name === 'Load Balancer' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "popup-selection", children: [(0, jsx_runtime_1.jsx)("label", { children: "Region:" }), (0, jsx_runtime_1.jsxs)("select", { value: selectedRegion, onChange: (e) => setSelectedRegion(e.target.value), className: `text-center ${showValidation && formErrors.region ? 'error' : ''} ${shakingFields.includes('region') ? 'shake' : ''}`, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "-- Select Region --" }), (0, regionMapper_1.getAllAvailableLocations)().map((loc) => ((0, jsx_runtime_1.jsx)("option", { value: loc, children: loc }, loc)))] }), showValidation && formErrors.region && ((0, jsx_runtime_1.jsx)("div", { className: "error-message", children: formErrors.region }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "popup-selection", children: [(0, jsx_runtime_1.jsx)("label", { children: "Load Balancer Type:" }), (0, jsx_runtime_1.jsxs)("select", { value: selectedLBType, onChange: (e) => setSelectedLBType(e.target.value), className: `text-center ${showValidation && formErrors.lbType ? 'error' : ''} ${shakingFields.includes('lbType') ? 'shake' : ''}`, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "-- Select Type --" }), (0, loadBalancerMapper_1.getAllAvailableLoadBalancerTypes)().map((type) => ((0, jsx_runtime_1.jsx)("option", { value: type, children: type }, type)))] }), showValidation && formErrors.lbType && ((0, jsx_runtime_1.jsx)("div", { className: "error-message", children: formErrors.lbType }))] })] })), service.name === 'Database' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "popup-selection", children: [(0, jsx_runtime_1.jsx)("label", { children: "Region:" }), (0, jsx_runtime_1.jsxs)("select", { value: selectedRegion, onChange: (e) => setSelectedRegion(e.target.value), className: `text-center ${showValidation && formErrors.region ? 'error' : ''} ${shakingFields.includes('region') ? 'shake' : ''}`, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "-- Select Region --" }), (0, regionMapper_1.getAllAvailableLocations)().map((loc) => ((0, jsx_runtime_1.jsx)("option", { value: loc, children: loc }, loc)))] }), showValidation && formErrors.region && ((0, jsx_runtime_1.jsx)("div", { className: "error-message", children: formErrors.region }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "popup-selection", children: [(0, jsx_runtime_1.jsx)("label", { children: "DB Instance Type:" }), (0, jsx_runtime_1.jsxs)("select", { value: selectedDBInstanceType, onChange: (e) => setSelectedDBInstanceType(e.target.value), className: `text-center ${showValidation && formErrors.dbInstanceType ? 'error' : ''} ${shakingFields.includes('dbInstanceType') ? 'shake' : ''}`, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "-- Select Type --" }), (0, dbInstanceTypeMapper_1.getAllAvailableDBInstanceTypes)().map((type) => ((0, jsx_runtime_1.jsx)("option", { value: type, children: type }, type)))] }), showValidation && formErrors.dbInstanceType && ((0, jsx_runtime_1.jsx)("div", { className: "error-message", children: formErrors.dbInstanceType }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "popup-selection", children: [(0, jsx_runtime_1.jsx)("label", { children: "DB Engine:" }), (0, jsx_runtime_1.jsxs)("select", { value: selectedDBEngine, onChange: (e) => setSelectedDBEngine(e.target.value), className: `text-center ${showValidation && formErrors.dbEngine ? 'error' : ''} ${shakingFields.includes('dbEngine') ? 'shake' : ''}`, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "-- Select Engine --" }), (0, dbEngineMapper_1.getAllAvailableDBEngineNames)().map((engine) => ((0, jsx_runtime_1.jsx)("option", { value: engine, children: engine }, engine)))] }), showValidation && formErrors.dbEngine && ((0, jsx_runtime_1.jsx)("div", { className: "error-message", children: formErrors.dbEngine }))] })] })), (0, jsx_runtime_1.jsxs)("div", { className: "popup-actions", children: [(0, jsx_runtime_1.jsx)("button", { onClick: handleNext, className: "button primary", children: "Next" }), (0, jsx_runtime_1.jsx)("button", { className: "button secondary", onClick: onCancel, children: "Cancel" })] })] }, "form")) : ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "popup-content", initial: { opacity: 0, x: 300 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.3 }, children: (0, jsx_runtime_1.jsx)(resource_modal_1.default, { isOpen: currentPage === 'price-comparison', onClose: () => {
                        setCurrentPage('form');
                    }, onConfirm: handleConfirm, selectedResourceName: service.name, resourceParams: formData }) }, "price-comparison")) }) }));
}
//# sourceMappingURL=index.js.map