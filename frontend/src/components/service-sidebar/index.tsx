import './index.scss';
import { useState } from 'react';
import virtualMachineIcon from '../../assets/canvas/virtualmachine.png';
import objectStorageIcon from '../../assets/canvas/objectstorage.png';
import databaseIcon from '../../assets/canvas/database.png';
import loadBalancerIcon from '../../assets/canvas/loadbalancer.png';

import { useCanvas } from '../../contexts/canvasContext'; // Import canvas context
import ServicePopup from '../service-popup'; // Import the popup component
import BasicFlow from '../diagram-canvas'; // Import the canvas component

// Define a type for the ref that includes onNodeClick and isNodeClicked
type BasicFlowRef = {
  onNodeClick: (event: any, node: any) => void;
  isNodeClicked: (nodeId: string) => boolean;
};

export default function ServiceSidebar({ canvasRef }: { canvasRef: React.RefObject<BasicFlowRef> }) {
  const [activeTab, setActiveTab] = useState('catalog');
  const { addNodeToCanvas } = useCanvas(); // Access the function to add nodes to the canvas
  const [selectedService, setSelectedService] = useState<Service | null>(null); // Track the selected service

  const handleServiceClick = (service: Service) => {
    setSelectedService(service); // Open the popup with the selected service
  };

  const handlePopupConfirm = (
    resourceInfo: {
      instanceType?: string;
      region?: string;
      os?: string;
      pricing?: any;
      cloud?: string;
      storageClass?: any;
      lbType?: any;
      dbInstanceType?: string;
      engine?: any;
    },
    type: string,
    selectedCloud: string
  ) => {
    if (selectedService) {
      if (canvasRef.current) {
        const nodeId = selectedCloud === 'azure' ? '1' : selectedCloud === 'GCP' ? '2' : '3';


        // Check if the node is already clicked
        // if (canvasRef.current.isNodeClicked(nodeId)) {
        //   console.log(`Node ${nodeId} is already clicked.`);
        // } else {
          canvasRef.current.onNodeClick({}, { id: nodeId } as any); // Simulate a node click
        // }
      }

      setSelectedService(null); // Close the popup
    }
  };

  const handlePopupCancel = () => {
    setSelectedService(null); // Close the popup without adding a node
  };

  return (
    <div className="sidebar">
      <div className="search-container">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search resources..."
            className="search-input"
          />
        </div>
      </div>

      <div className="tabs">
        <h3 style={{ textAlign: 'center' }}>Catalog</h3>

        <div className="tab-content">
          {activeTab === 'catalog' ? (
            <div className="service-grid">
              {services.map((service) => (
                <ServiceCard
                  key={service.name}
                  {...service}
                  onClick={() => handleServiceClick(service)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">No modules available</div>
          )}
        </div>
      </div>
      {selectedService && (
        <ServicePopup
          service={selectedService}
          onConfirm={handlePopupConfirm}
          onCancel={handlePopupCancel}
          availableVPCs={[]} // TODO: Replace with actual VPCs
          availableSubnets={[]} // TODO: Replace with actual subnets
          pricingOptions={[]} // TODO: Replace with actual pricing options
        />
      )}
    </div>
  );
}

interface ServiceCardProps {
  name: string;
  icon: JSX.Element;
  onClick: () => void;
}

function ServiceCard({ name, icon, onClick }: ServiceCardProps) {
  return (
    <div className="service-card" onClick={onClick}>
      <div className="service-icon">{icon}</div>
      <div className="service-name">{name}</div>
    </div>
  );
}

interface Service {
  name: string;
  icon: JSX.Element;
  vpc?: string; // Optional property
  subnet?: string; // Optional property
}

const services: Service[] = [
  {
    name: 'Virtual Machine',
    icon: (
      <img
        src={virtualMachineIcon}
        alt="Virtual Machine"
        className="service-icon-img"
      />
    ),
  },
  {
    name: 'Object Storage',
    icon: (
      <img
        src={objectStorageIcon}
        alt="Object Storage"
        className="service-icon-img"
      />
    ),
  },
  {
    name: 'Load Balancer',
    icon: (
      <img
        src={loadBalancerIcon}
        alt="Load Balancer"
        className="service-icon-img"
      />
    ),
  },
  {
    name: 'Database',
    icon: (
      <img src={databaseIcon} alt="Database" className="service-icon-img" />
    ),
  },
];