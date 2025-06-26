'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResourceModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const AxiosInstance_1 = require("../../services/axios/AxiosInstance");
const translate_1 = require("../../utils/translate");
const recommendation_1 = require("../../utils/recommendation");
const resource_loader_1 = __importDefault(require("../resource-loader"));
const resource_tabs_1 = require("./tabs/resource-tabs");
const suggestion_section_1 = require("./suggestion-section");
const modal_actions_1 = require("./modal-actions");
require("./index.scss");
function ResourceModal({ isOpen, onClose, onConfirm, selectedResourceName, onResourceChange, resourceParams, }) {
    const [selectedResource, setSelectedResource] = (0, react_1.useState)('');
    const [resources, setResources] = (0, react_1.useState)([]);
    const [pricingOption, setPricingOption] = (0, react_1.useState)('on-demand');
    const [mounted, setMounted] = (0, react_1.useState)(false);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [showModalContent, setShowModalContent] = (0, react_1.useState)(false);
    const [spotInstances, setSpotInstances] = (0, react_1.useState)([]);
    const [savingsPlans, setSavingsPlans] = (0, react_1.useState)([]);
    const [suggestion, setSuggestion] = (0, react_1.useState)(null);
    // Check if the resource is a virtual machine to determine tab visibility
    const isVirtualMachine = selectedResourceName === 'Virtual Machine';
    (0, react_1.useEffect)(() => {
        if (selectedResourceName) {
            const fetchSuggestion = async () => {
                try {
                    const recommendation = await (0, recommendation_1.getResourceSuggestion)(selectedResourceName);
                    setSuggestion(recommendation?.message || null);
                }
                catch (error) {
                    console.error('Failed to fetch suggestion:', error);
                    setSuggestion(null);
                }
            };
            fetchSuggestion();
        }
    }, [selectedResourceName]);
    (0, react_1.useEffect)(() => {
        setMounted(true);
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
            if (!isLoading && !showModalContent) {
                setIsLoading(true);
                setShowModalContent(false);
                setResources([]);
                setSpotInstances([]);
                setSavingsPlans([]);
                const { awsParams, azureParams } = (0, translate_1.getTranslationParams)(resourceParams || {});
                const fetchResources = async () => {
                    try {
                        const awsName = mapServiceNameToProvider(selectedResourceName, 'aws');
                        const azureName = mapServiceNameToProvider(selectedResourceName, 'azure');
                        const [awsRes, azureRes] = await Promise.all([
                            AxiosInstance_1.AxiosInstence.get(`/aws/cost/${awsName}`, {
                                params: awsParams,
                                validateStatus: (status) => status === 200 || status === 400,
                            }),
                            AxiosInstance_1.AxiosInstence.get(`/azure/cost/${azureName}`, {
                                params: azureParams,
                                validateStatus: (status) => status === 200 || status === 400,
                            }),
                        ]);
                        const awsData = awsRes && awsRes.status === 200 ? awsRes.data : [];
                        const azureData = azureRes && azureRes.status === 200
                            ? azureRes.data.map((item, index) => ({
                                ...item,
                                id: `${index + awsData.length}`,
                                provider: 'azure',
                            }))
                            : [];
                        const combinedData = [...awsData, ...azureData];
                        const onDemandResources = combinedData.filter((resource) => !resource.spotInstance && !resource.reservationTerm);
                        const spotInstances = combinedData.filter((resource) => resource.spotInstance === true);
                        const savingsPlans = combinedData.filter((resource) => resource.reservationTerm !== null);
                        setResources(onDemandResources);
                        setSpotInstances(spotInstances);
                        setSavingsPlans(savingsPlans);
                        if (combinedData.length > 0) {
                            setSelectedResource(combinedData[0].id);
                        }
                    }
                    catch (error) {
                        console.error('Failed to fetch resources:', error);
                        setIsLoading(false);
                    }
                };
                fetchResources();
            }
        }
        else {
            setIsLoading(false);
            setShowModalContent(false);
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose, selectedResourceName, resourceParams]);
    const handleLoaderComplete = (0, react_1.useCallback)(() => {
        setIsLoading(false);
        setShowModalContent(true);
    }, []);
    function mapServiceNameToProvider(serviceName, provider) {
        const mapping = {
            'Virtual Machine': { aws: 'ec2', azure: 'vm' },
            'Load Balancer': { aws: 'elb', azure: 'loadbalancer' },
            Database: { aws: 'rds', azure: 'sql' },
            'Object Storage': { aws: 's3', azure: 'blob' },
        };
        return mapping[serviceName]?.[provider] ?? serviceName;
    }
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget)
            onClose();
    };
    if (!mounted || !isOpen)
        return null;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(resource_loader_1.default, { isVisible: isLoading, onComplete: handleLoaderComplete, duration: 4000, steps: [
                    'Analyzing your answers',
                    'Analyzing your preferences',
                    'Selecting budget-friendly options',
                ] }), showModalContent && ((0, jsx_runtime_1.jsxs)("div", { className: "modal-overlay", onClick: handleOverlayClick, children: [(0, jsx_runtime_1.jsxs)("div", { className: "modal-container", role: "dialog", "aria-modal": "true", children: [(0, jsx_runtime_1.jsx)("h2", { className: "modal-title", children: "Select Resource" }), (0, jsx_runtime_1.jsx)(resource_tabs_1.ResourceTabs, { serviceName: selectedResourceName, pricingOption: pricingOption, setPricingOption: setPricingOption, resources: resources, spotInstances: spotInstances, savingsPlans: savingsPlans, selectedResource: selectedResource, setSelectedResource: setSelectedResource, isVirtualMachine: isVirtualMachine }), (0, jsx_runtime_1.jsx)(suggestion_section_1.SuggestionSection, { suggestion: suggestion }), (0, jsx_runtime_1.jsx)(modal_actions_1.ModalActions, { onClose: onClose, onConfirm: () => {
                                    if (selectedResource !== null) {
                                        const selectedResourceDetails = resources.find((resource) => resource.id === selectedResource);
                                        const selectedCloud = selectedResourceDetails?.provider || "unknown";
                                        onConfirm(selectedCloud, '10$'); // Pass the selected cloud provider
                                        document.dispatchEvent(new Event("closeParentModal")); // Trigger parent modal close
                                    }
                                } })] })
                    // </div>
                    , "// "] }))] }));
}
//# sourceMappingURL=index.js.map