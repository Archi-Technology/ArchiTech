import { useEffect, useState } from 'react';
import subnetIcon from '../../assets/canvas/network-wired-svgrepo-com.svg';
import vpcIcon from '../../assets/canvas/cloud-svgrepo-com.svg';
import './index.scss';
import virtualMachineIcon from '../../assets/canvas/virtualmachine.png';
import objectStorageIcon from '../../assets/canvas/objectstorage.png';
import databaseIcon from '../../assets/canvas/database.png';
import loadBalancerIcon from '../../assets/canvas/loadbalancer.png';

import { useCanvas } from '../../contexts/canvasContext'; // Import canvas context
import { ServiceType } from '../service-popup'; // Import the popup component
import { get } from 'react-hook-form';
import {IBaseService} from '../../interfaces/canvas'; // Import the interface for base service
import { getProjectResources } from '../../services/projectService';
import { createResource, generateTerraform, IResource } from '../../services/resourceService';
import { useTerraform } from '../../contexts/terraformContext';
import { CloudProvider } from '../../interfaces/canvas';
import ServicePopup from '../service-popup'; // Import the popup component
import BasicFlow from '../diagram-canvas'; // Import the canvas component

// Define a type for the ref that includes onNodeClick and isNodeClicked
type BasicFlowRef = {
  onNodeClick: (event: any, node: any) => void;
  isNodeClicked: (nodeId: string) => boolean;
};

export default function ServiceSidebar({ canvasRef }: { canvasRef: React.RefObject<BasicFlowRef> }) {
  const [activeTab, setActiveTab] = useState('catalog');
  const {updateTerraformCode, setLoading} = useTerraform();
  const { addNodeToCanvas } = useCanvas(); // Access the function to add nodes to the canvas
  const [selectedService, setSelectedService] = useState<Service | null>(null); // Track the selected service
  const [availableResources, setAvailableResources] = useState<IBaseService[]>([]); // State for available VPCs
  const projectId = sessionStorage.getItem('selectedProjectId');
  if (!projectId) {
    return <></>
  }
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
        if (selectedService) {
          if (canvasRef.current) {
            const nodeId = data.cloudProvider === CloudProvider.AZURE ? '1' : data.cloudProvider === CloudProvider.GCP ? '2' : '3';
    
    
            // Check if the node is already clicked
            // if (canvasRef.current.isNodeClicked(nodeId)) {
            //   console.log(`Node ${nodeId} is already clicked.`);
            // } else {
              canvasRef.current.onNodeClick({}, { id: nodeId } as any); // Simulate a node click
            // }
          }
    
          setSelectedService(null); // Close the popup
        }
        setLoading(true);
        const terraformCode = await generateTerraform(newResource?._id);
        setLoading(false);
        updateTerraformCode(terraformCode);
        const resources = await getProjectResources(projectId); // Replace with actual function to fetch VPCs
        // // Replace with actual function to fetch subnets

        setAvailableResources(resources); // Assuming vpc has a name property
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

  const availableVPCs = availableResources.filter((resource) => resource.type === ServiceType.VPC);
  const availableSubnets = availableResources.filter((resource) => resource.type === ServiceType.SUBNET);
  const availableSources = availableResources.filter((resource) => resource.type !== ServiceType.VPC && resource.type !== ServiceType.SUBNET);
  console.log('availableSources', availableSources);
  useEffect(() => { 
    // This effect can be used to fetch initial data or perform side effects
    const  getProjectVpcsAndSubnets = async () => { 
      try {
        // Fetch available VPCs and subnets from the backend or context
        const resources = await getProjectResources(projectId); // Replace with actual function to fetch VPCs
        // const subnets = await getProjectSubnets(); // Replace with actual function to fetch subnets

        setAvailableResources(resources); // Assuming vpc has a name property
        // setAvailableSubnets(subnets); // Assuming subnet has a name property
      } catch (error) {
        console.error('Error fetching VPCs and subnets:', error);
      }
    }

    getProjectVpcsAndSubnets(); // Call the function to fetch VPCs and subnets
  }, [setAvailableResources, projectId]); // Empty dependency array to run only once on mount
  return (
    <div className="sidebar">
      <div className="tabs">
        <h3
          style={{
            textAlign: 'center',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          Catalog
        </h3>

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
          availableSubnets={availableSubnets}
          availableSource={availableSources} // TODO: Replace with actual subnets
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
  {
    name: 'Vpc',
    icon: (
      <img src={vpcIcon} alt="Vpc" className="service-icon-img" />
    ),
  },
  {
    name: 'Subnet',
    icon: (
      <img src={subnetIcon} alt="Subnet" className="service-icon-img" />
    ),
  },
];
