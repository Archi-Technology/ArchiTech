import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './index.scss';
import { useState } from 'react';
import virtualMachineIcon from '../../assets/canvas/virtualmachine.png';
import objectStorageIcon from '../../assets/canvas/objectstorage.png';
import databaseIcon from '../../assets/canvas/database.png';
import loadBalancerIcon from '../../assets/canvas/loadbalancer.png';
import { useCanvas } from '../../contexts/canvasContext'; // Import canvas context
import ServicePopup from '../service-popup'; // Import the popup component
export default function ServiceSidebar({ canvasRef }) {
    const [activeTab, setActiveTab] = useState('catalog');
    const { addNodeToCanvas } = useCanvas(); // Access the function to add nodes to the canvas
    const [selectedService, setSelectedService] = useState(null); // Track the selected service
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
    return (_jsxs("div", { className: "sidebar", children: [_jsxs("div", { className: "tabs", children: [_jsx("h3", { style: {
                            textAlign: 'center',
                            marginTop: '20px',
                            marginBottom: '20px',
                        }, children: "Catalog" }), _jsx("div", { className: "tab-content", children: activeTab === 'catalog' ? (_jsx("div", { className: "service-grid", children: services.map((service) => (_jsx(ServiceCard, { ...service, onClick: () => handleServiceClick(service) }, service.name))) })) : (_jsx("div", { className: "empty-state", children: "No modules available" })) })] }), selectedService && (_jsx(ServicePopup, { service: selectedService, onConfirm: handlePopupConfirm, onCancel: handlePopupCancel, availableVPCs: [], availableSubnets: [], pricingOptions: [] }))] }));
}
function ServiceCard({ name, icon, onClick }) {
    return (_jsxs("div", { className: "service-card", onClick: onClick, children: [_jsx("div", { className: "service-icon", children: icon }), _jsx("div", { className: "service-name", children: name })] }));
}
const services = [
    {
        name: 'Virtual Machine',
        icon: (_jsx("img", { src: virtualMachineIcon, alt: "Virtual Machine", className: "service-icon-img" })),
    },
    {
        name: 'Object Storage',
        icon: (_jsx("img", { src: objectStorageIcon, alt: "Object Storage", className: "service-icon-img" })),
    },
    {
        name: 'Load Balancer',
        icon: (_jsx("img", { src: loadBalancerIcon, alt: "Load Balancer", className: "service-icon-img" })),
    },
    {
        name: 'Database',
        icon: (_jsx("img", { src: databaseIcon, alt: "Database", className: "service-icon-img" })),
    },
];
//# sourceMappingURL=index.js.map