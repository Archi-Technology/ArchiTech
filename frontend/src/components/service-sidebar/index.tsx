import "./index.scss"
import { useState } from "react"
import ec2Icon from "../../assets/canvas/aws/ec2.svg";
import s3Icon from "../../assets/canvas/aws/s3.svg";
import lambdaIcon from "../../assets/canvas/aws/lambda.svg";
import apiGatewayIcon from "../../assets/canvas/aws/api-gateway.svg";
import vpcIcon from "../../assets/canvas/aws/vpc.svg";
import cloudFrontIcon from "../../assets/canvas/aws/cloudfront.svg";
import route53Icon from "../../assets/canvas/aws/route53.svg";
import ecsIcon from "../../assets/canvas/aws/ecs.svg";
import elbIcon from "../../assets/canvas/aws/elb.svg";
import { useCanvas } from "../../contexts/canvasContext"; // Import canvas context
import { useServices } from "../../contexts/serviceContext"; // Import useServices
import ServicePopup from "../service-popup"; // Import the popup component

export default function ServiceSidebar() {
    const [activeTab, setActiveTab] = useState("catalog");
    const { addNodeToCanvas } = useCanvas(); // Access the function to add nodes to the canvas
    const services = useServices(); // Access services from context
    const [selectedService, setSelectedService] = useState<Service | null>(null); // Track the selected service

    const handleServiceClick = (service: Service) => {
        setSelectedService(service); // Open the popup with the selected service
    };

    const handlePopupConfirm = (cloud: string, addressRange: string) => {
        if (selectedService) {
            addNodeToCanvas({ 
                ...selectedService, 
                vpc: selectedService.vpc || "", 
                subnet: selectedService.subnet || "", 
                cloud, 
                addressRange 
            }); // Pass cloud and address range to the canvas
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
            <input type="text" placeholder="Search resources..." className="search-input" />
          </div>
        </div>
  
        <div className="tabs">
          <div className="tabs-list">
            <button
              className={`tab-button ${activeTab === "catalog" ? "active-tab" : ""}`}
              onClick={() => setActiveTab("catalog")}
            >
              AWS
            </button>
            <button
              className={`tab-button ${activeTab === "modules" ? "active-tab" : ""}`}
              onClick={() => setActiveTab("modules")}
            >
              Azure
            </button>
          </div>
  
          <div className="tab-content">
            {activeTab === "catalog" ? (
              <div className="service-grid">
                {services.map((service) => (
                  <ServiceCard key={service.name} {...service} onClick={() => handleServiceClick(service)} />
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
          />
        )}
      </div>
    )
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
    )
  }
  
  interface Service {
    name: string;
    icon: JSX.Element;
    vpc?: string | undefined; // Optional property
    subnet?: string | undefined; // Optional property
    cloud?: string; // Optional property for target cloud
  }
