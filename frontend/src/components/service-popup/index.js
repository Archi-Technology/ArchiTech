'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import './index.scss';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { askOptimalChoices, parseGeminiRecommendation, } from '../../utils/recommendation';
import { getAllAvailableLocations } from '../../utils/Mappers/regionMapper';
import { getAllAvailableOSNames } from '../../utils/Mappers/osMapper';
import { getAllAvailableObjectStorageClasses } from '../../utils/Mappers/objectStorageMapper';
import { getAllAvailableLoadBalancerTypes } from '../../utils/Mappers/loadBalancerMapper';
import { getAllAvailableDBInstanceTypes } from '../../utils/Mappers/dbInstanceTypeMapper';
import { getAllAvailableDBEngineNames } from '../../utils/Mappers/dbEngineMapper';
import { getAllAvailableVMInstanceCategories } from '../../utils/Mappers/vmInstanceTypeMapper';
import ResourceModal from '../resource-modal';
export default function ServicePopup({ service, onConfirm, onCancel, }) {
    const [selectedVPC, setSelectedVPC] = useState('');
    const [selectedSubnet, setSelectedSubnet] = useState('');
    const [selectedPricing, setSelectedPricing] = useState('');
    const [selectedInstanceType, setSelectedInstanceType] = useState('');
    const [selectedVmInstanceType, setSelectedVmInstanceType] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedOS, setSelectedOS] = useState('');
    const [selectedStorageClass, setSelectedStorageClass] = useState('');
    const [selectedLBType, setSelectedLBType] = useState('');
    const [selectedDBInstanceType, setSelectedDBInstanceType] = useState('');
    const [selectedDBEngine, setSelectedDBEngine] = useState('');
    const [selectedRedundancy, setSelectedRedundancy] = useState('');
    const [recommendation, setRecommendation] = useState('');
    const [currentPage, setCurrentPage] = useState('form');
    const [formData, setFormData] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [showValidation, setShowValidation] = useState(false);
    const [shakingFields, setShakingFields] = useState([]);
    useEffect(() => {
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
    return (_jsx("div", { className: "popup-overlay", children: _jsx(AnimatePresence, { mode: "wait", children: currentPage === 'form' ? (_jsxs(motion.div, { className: "popup-content", initial: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -300 }, transition: { duration: 0.3 }, children: [_jsxs("div", { className: "popup-recommendation", children: [_jsx("div", { className: "chatbot-icon", children: "\uD83E\uDD16" }), _jsx("button", { className: "popup-button ai", style: { background: 'none' }, onClick: async () => {
                                    const answer = await askOptimalChoices(service.name);
                                    const parsed = parseGeminiRecommendation(answer?.message ?? '');
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
                                }, children: _jsx("p", { children: recommendation }) })] }), _jsxs("div", { className: "popup-service", children: [_jsx("div", { className: "popup-service-icon", children: service.icon }), _jsx("div", { className: "popup-service-name", children: service.name })] }), service.name === 'Virtual Machine' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "popup-selection", children: [_jsx("label", { children: "Instance Type:" }), _jsxs("select", { value: selectedVmInstanceType, onChange: (e) => setSelectedVmInstanceType(e.target.value), className: `text-center ${showValidation && formErrors.vmInstanceType ? 'error' : ''} ${shakingFields.includes('vmInstanceType') ? 'shake' : ''}`, children: [_jsx("option", { value: "", children: "-- Select Instance Type --" }), getAllAvailableVMInstanceCategories().map((type) => (_jsx("option", { value: type, children: type }, type)))] }), showValidation && formErrors.vmInstanceType && (_jsx("div", { className: "error-message", children: formErrors.vmInstanceType }))] }), _jsxs("div", { className: "popup-selection", children: [_jsx("label", { children: "Region:" }), _jsxs("select", { value: selectedRegion, onChange: (e) => setSelectedRegion(e.target.value), className: `text-center ${showValidation && formErrors.region ? 'error' : ''} ${shakingFields.includes('region') ? 'shake' : ''}`, children: [_jsx("option", { value: "", children: "-- Select Region --" }), getAllAvailableLocations().map((loc) => (_jsx("option", { value: loc, children: loc }, loc)))] }), showValidation && formErrors.region && (_jsx("div", { className: "error-message", children: formErrors.region }))] }), _jsxs("div", { className: "popup-selection", children: [_jsx("label", { children: "Operating System:" }), _jsxs("select", { value: selectedOS, onChange: (e) => setSelectedOS(e.target.value), className: `text-center ${showValidation && formErrors.os ? 'error' : ''} ${shakingFields.includes('os') ? 'shake' : ''}`, children: [_jsx("option", { value: "", children: "-- Select OS --" }), getAllAvailableOSNames().map((os) => (_jsx("option", { value: os, children: os }, os)))] }), showValidation && formErrors.os && (_jsx("div", { className: "error-message", children: formErrors.os }))] })] })), service.name === 'Object Storage' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "popup-selection", children: [_jsx("label", { children: "Region:" }), _jsxs("select", { value: selectedRegion, onChange: (e) => setSelectedRegion(e.target.value), className: `text-center ${showValidation && formErrors.region ? 'error' : ''} ${shakingFields.includes('region') ? 'shake' : ''}`, children: [_jsx("option", { value: "", children: "-- Select Region --" }), getAllAvailableLocations().map((loc) => (_jsx("option", { value: loc, children: loc }, loc)))] }), showValidation && formErrors.region && (_jsx("div", { className: "error-message", children: formErrors.region }))] }), _jsxs("div", { className: "popup-selection", children: [_jsx("label", { children: "Storage Class:" }), _jsxs("select", { value: selectedStorageClass, onChange: (e) => setSelectedStorageClass(e.target.value), className: `text-center ${showValidation && formErrors.storageClass ? 'error' : ''} ${shakingFields.includes('storageClass') ? 'shake' : ''}`, children: [_jsx("option", { value: "", children: "-- Select Storage Class --" }), getAllAvailableObjectStorageClasses().map((sc) => (_jsx("option", { value: sc, children: sc }, sc)))] }), showValidation && formErrors.storageClass && (_jsx("div", { className: "error-message", children: formErrors.storageClass }))] })] })), service.name === 'Load Balancer' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "popup-selection", children: [_jsx("label", { children: "Region:" }), _jsxs("select", { value: selectedRegion, onChange: (e) => setSelectedRegion(e.target.value), className: `text-center ${showValidation && formErrors.region ? 'error' : ''} ${shakingFields.includes('region') ? 'shake' : ''}`, children: [_jsx("option", { value: "", children: "-- Select Region --" }), getAllAvailableLocations().map((loc) => (_jsx("option", { value: loc, children: loc }, loc)))] }), showValidation && formErrors.region && (_jsx("div", { className: "error-message", children: formErrors.region }))] }), _jsxs("div", { className: "popup-selection", children: [_jsx("label", { children: "Load Balancer Type:" }), _jsxs("select", { value: selectedLBType, onChange: (e) => setSelectedLBType(e.target.value), className: `text-center ${showValidation && formErrors.lbType ? 'error' : ''} ${shakingFields.includes('lbType') ? 'shake' : ''}`, children: [_jsx("option", { value: "", children: "-- Select Type --" }), getAllAvailableLoadBalancerTypes().map((type) => (_jsx("option", { value: type, children: type }, type)))] }), showValidation && formErrors.lbType && (_jsx("div", { className: "error-message", children: formErrors.lbType }))] })] })), service.name === 'Database' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "popup-selection", children: [_jsx("label", { children: "Region:" }), _jsxs("select", { value: selectedRegion, onChange: (e) => setSelectedRegion(e.target.value), className: `text-center ${showValidation && formErrors.region ? 'error' : ''} ${shakingFields.includes('region') ? 'shake' : ''}`, children: [_jsx("option", { value: "", children: "-- Select Region --" }), getAllAvailableLocations().map((loc) => (_jsx("option", { value: loc, children: loc }, loc)))] }), showValidation && formErrors.region && (_jsx("div", { className: "error-message", children: formErrors.region }))] }), _jsxs("div", { className: "popup-selection", children: [_jsx("label", { children: "DB Instance Type:" }), _jsxs("select", { value: selectedDBInstanceType, onChange: (e) => setSelectedDBInstanceType(e.target.value), className: `text-center ${showValidation && formErrors.dbInstanceType ? 'error' : ''} ${shakingFields.includes('dbInstanceType') ? 'shake' : ''}`, children: [_jsx("option", { value: "", children: "-- Select Type --" }), getAllAvailableDBInstanceTypes().map((type) => (_jsx("option", { value: type, children: type }, type)))] }), showValidation && formErrors.dbInstanceType && (_jsx("div", { className: "error-message", children: formErrors.dbInstanceType }))] }), _jsxs("div", { className: "popup-selection", children: [_jsx("label", { children: "DB Engine:" }), _jsxs("select", { value: selectedDBEngine, onChange: (e) => setSelectedDBEngine(e.target.value), className: `text-center ${showValidation && formErrors.dbEngine ? 'error' : ''} ${shakingFields.includes('dbEngine') ? 'shake' : ''}`, children: [_jsx("option", { value: "", children: "-- Select Engine --" }), getAllAvailableDBEngineNames().map((engine) => (_jsx("option", { value: engine, children: engine }, engine)))] }), showValidation && formErrors.dbEngine && (_jsx("div", { className: "error-message", children: formErrors.dbEngine }))] })] })), _jsxs("div", { className: "popup-actions", children: [_jsx("button", { onClick: handleNext, className: "button primary", children: "Next" }), _jsx("button", { className: "button secondary", onClick: onCancel, children: "Cancel" })] })] }, "form")) : (_jsx(motion.div, { className: "popup-content", initial: { opacity: 0, x: 300 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.3 }, children: _jsx(ResourceModal, { isOpen: currentPage === 'price-comparison', onClose: () => {
                        setCurrentPage('form');
                    }, onConfirm: handleConfirm, selectedResourceName: service.name, resourceParams: formData }) }, "price-comparison")) }) }));
}
//# sourceMappingURL=index.js.map