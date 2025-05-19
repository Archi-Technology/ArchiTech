import './index.scss';
import { useState } from 'react';
import virtualMachineIcon from '../../assets/canvas/virtualmachine.png';
import objectStorageIcon from '../../assets/canvas/objectstorage.png';
import databaseIcon from '../../assets/canvas/database.png';
import loadBalancerIcon from '../../assets/canvas/loadbalancer.png';

import { useCanvas } from '../../contexts/canvasContext'; // Import canvas context
import ServicePopup from '../service-popup'; // Import the popup component

export default function ServiceSidebar() {
  const [activeTab, setActiveTab] = useState('catalog');
  const { addNodeToCanvas } = useCanvas(); // Access the function to add nodes to the canvas
  const [selectedService, setSelectedService] = useState<Service | null>(null); // Track the selected service

  const handleServiceClick = (service: Service) => {
    setSelectedService(service); // Open the popup with the selected service
  };

  const handlePopupConfirm = ({ vpc, subnet }: { vpc: string; subnet: string }) => {
    if (selectedService) {
      addNodeToCanvas({ ...selectedService, vpc, subnet }); // Pass VPC and subnet to the canvas
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
          <button
            className={`tab-button ${activeTab === 'catalog' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('catalog')}
          >
            Catalog
          </button>

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
      <img src={virtualMachineIcon} alt="Virtual Machine" className="service-icon-img" />
    ),
  },
  {
    name: 'Object Storage',
    icon: <img src={objectStorageIcon} alt="Object Storage" className="service-icon-img" />,
  },
  {
    name: 'Load Balancer',
    icon: <img src={loadBalancerIcon} alt="Load Balancer" className="service-icon-img" />,
  },
  {
    name: 'Database',
    icon: <img src={databaseIcon} alt="Database" className="service-icon-img" />,
  }
];
