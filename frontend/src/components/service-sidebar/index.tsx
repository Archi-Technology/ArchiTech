import { useEffect, useState } from 'react';
import databaseIcon from '../../assets/canvas/database.png';
import loadBalancerIcon from '../../assets/canvas/loadbalancer.png';
import objectStorageIcon from '../../assets/canvas/objectstorage.png';
import virtualMachineIcon from '../../assets/canvas/virtualmachine.png';
import './index.scss';

import { useCanvas } from '../../contexts/canvasContext'; // Import canvas context
import ServicePopup from '../service-popup'; // Import the popup component
import { get } from 'react-hook-form';
import { getProjectSubnets, getProjectVpcs } from '../../services/projectService';
import { createResource, generateTerraform, IResource } from '../../services/resourceService';
import { useTerraform } from '../../contexts/terraformContext';

export default function ServiceSidebar() {
  const [activeTab, setActiveTab] = useState('catalog');
  const {updateTerraformCode, setLoading} = useTerraform();
  const { addNodeToCanvas } = useCanvas(); // Access the function to add nodes to the canvas
  const [selectedService, setSelectedService] = useState<Service | null>(null); // Track the selected service
  const [availableVPCs, setAvailableVPCs] = useState<string[]>([]); // State for available VPCs
  const [availableSubnets, setAvailableSubnets] = useState<string[]>([]); // State for available subnets
  const handleServiceClick = (service: Service) => {
    setSelectedService(service); // Open the popup with the selected service
  };

    const handlePopupConfirm = async(data:IResource) => {
      const newResource = await createResource(data)
       // Generate Terraform code for the new resource
       // Update the Terraform code in the context
      if (selectedService) {
            addNodeToCanvas({ 
                ...selectedService, 
                vpc: selectedService.vpc || "", 
                subnet: selectedService.subnet || "", 
                cloud: data.cloudProvider, 
                addressRange: ""
            }); // Pass cloud and address range to the canvas
             // Close the popup
        }
        setSelectedService(null);
        setLoading(true);
        const terraformCode = await generateTerraform(newResource._id);
        setLoading(false);
        updateTerraformCode(terraformCode);

    };
  // const handlePopupConfirm = ({
  //   vpc,
  //   subnet,
  // }: {
  //   vpc: string;
  //   subnet: string;
  // }) => {
  //   if (selectedService) {
  //     addNodeToCanvas({ ...selectedService, vpc, subnet }); // Pass VPC and subnet to the canvas
  //     setSelectedService(null); // Close the popup
  //   }
  // };

  const handlePopupCancel = () => {
    setSelectedService(null); // Close the popup without adding a node
  };

  useEffect(() => { 
    // This effect can be used to fetch initial data or perform side effects
    const  getProjectVpcsAndSubnets = async () => { 
      try {
        // Fetch available VPCs and subnets from the backend or context
        const vpcs = await getProjectVpcs(); // Replace with actual function to fetch VPCs
        const subnets = await getProjectSubnets(); // Replace with actual function to fetch subnets

        setAvailableVPCs(vpcs); // Assuming vpc has a name property
        setAvailableSubnets(subnets); // Assuming subnet has a name property
      } catch (error) {
        console.error('Error fetching VPCs and subnets:', error);
      }
    }

    getProjectVpcsAndSubnets(); // Call the function to fetch VPCs and subnets
  }, [setAvailableVPCs, setAvailableSubnets]); // Empty dependency array to run only once on mount
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
          availableVPCs={availableVPCs} // TODO: Replace with actual VPCs
          availableSubnets={availableSubnets} // TODO: Replace with actual subnets
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
