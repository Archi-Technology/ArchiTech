"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServiceSidebar;
const jsx_runtime_1 = require("react/jsx-runtime");
require("./index.scss");
const react_1 = require("react");
const virtualmachine_png_1 = __importDefault(require("../../assets/canvas/virtualmachine.png"));
const objectstorage_png_1 = __importDefault(require("../../assets/canvas/objectstorage.png"));
const database_png_1 = __importDefault(require("../../assets/canvas/database.png"));
const loadbalancer_png_1 = __importDefault(require("../../assets/canvas/loadbalancer.png"));
const canvasContext_1 = require("../../contexts/canvasContext"); // Import canvas context
const service_popup_1 = __importDefault(require("../service-popup")); // Import the popup component
function ServiceSidebar({ canvasRef }) {
    const [activeTab, setActiveTab] = (0, react_1.useState)('catalog');
    const { addNodeToCanvas } = (0, canvasContext_1.useCanvas)(); // Access the function to add nodes to the canvas
    const [selectedService, setSelectedService] = (0, react_1.useState)(null); // Track the selected service
    const handleServiceClick = (service) => {
        setSelectedService(service); // Open the popup with the selected service
    };
    const handlePopupConfirm = (resourceInfo, type, selectedCloud) => {
        if (selectedService) {
            if (canvasRef.current) {
                const nodeId = selectedCloud === 'azure' ? '1' : selectedCloud === 'GCP' ? '2' : '3';
                // Check if the node is already clicked
                // if (canvasRef.current.isNodeClicked(nodeId)) {
                //   console.log(`Node ${nodeId} is already clicked.`);
                // } else {
                canvasRef.current.onNodeClick({}, { id: nodeId }); // Simulate a node click
                // }
            }
            setSelectedService(null); // Close the popup
        }
    };
    const handlePopupCancel = () => {
        setSelectedService(null); // Close the popup without adding a node
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "sidebar", children: [(0, jsx_runtime_1.jsxs)("div", { className: "tabs", children: [(0, jsx_runtime_1.jsx)("h3", { style: {
                            textAlign: 'center',
                            marginTop: '20px',
                            marginBottom: '20px',
                        }, children: "Catalog" }), (0, jsx_runtime_1.jsx)("div", { className: "tab-content", children: activeTab === 'catalog' ? ((0, jsx_runtime_1.jsx)("div", { className: "service-grid", children: services.map((service) => ((0, jsx_runtime_1.jsx)(ServiceCard, { ...service, onClick: () => handleServiceClick(service) }, service.name))) })) : ((0, jsx_runtime_1.jsx)("div", { className: "empty-state", children: "No modules available" })) })] }), selectedService && ((0, jsx_runtime_1.jsx)(service_popup_1.default, { service: selectedService, onConfirm: handlePopupConfirm, onCancel: handlePopupCancel, availableVPCs: [], availableSubnets: [], pricingOptions: [] }))] }));
}
function ServiceCard({ name, icon, onClick }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "service-card", onClick: onClick, children: [(0, jsx_runtime_1.jsx)("div", { className: "service-icon", children: icon }), (0, jsx_runtime_1.jsx)("div", { className: "service-name", children: name })] }));
}
const services = [
    {
        name: 'Virtual Machine',
        icon: ((0, jsx_runtime_1.jsx)("img", { src: virtualmachine_png_1.default, alt: "Virtual Machine", className: "service-icon-img" })),
    },
    {
        name: 'Object Storage',
        icon: ((0, jsx_runtime_1.jsx)("img", { src: objectstorage_png_1.default, alt: "Object Storage", className: "service-icon-img" })),
    },
    {
        name: 'Load Balancer',
        icon: ((0, jsx_runtime_1.jsx)("img", { src: loadbalancer_png_1.default, alt: "Load Balancer", className: "service-icon-img" })),
    },
    {
        name: 'Database',
        icon: ((0, jsx_runtime_1.jsx)("img", { src: database_png_1.default, alt: "Database", className: "service-icon-img" })),
    },
];
//# sourceMappingURL=index.js.map