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

export default function ServiceSidebar() {
    const [activeTab, setActiveTab] = useState("catalog");
    const { addNodeToCanvas } = useCanvas(); // Access the function to add nodes to the canvas

    const handleServiceClick = (service: Service) => {
        addNodeToCanvas(service); // Add the selected service as a node to the canvas
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
  }

  const services: Service[] = [
    {
      name: "EC2",
      icon: <img src={ec2Icon} alt="EC2" className="service-icon-img" />,
    },
    {
      name: "S3",
      icon: <img src={s3Icon} alt="S3" className="service-icon-img" />,
    },
    {
      name: "Lambda",
      icon: <img src={lambdaIcon} alt="Lambda" className="service-icon-img" />,
    },
    {
      name: "API Gateway",
      icon: <img src={apiGatewayIcon} alt="API Gateway" className="service-icon-img" />,
    },
    {
      name: "VPC",
      icon: <img src={vpcIcon} alt="VPC" className="service-icon-img" />,
    },
    {
      name: "CloudFront",
      icon: <img src={cloudFrontIcon} alt="CloudFront" className="service-icon-img" />,
    },
    {
      name: "Route 53",
      icon: <img src={route53Icon} alt="Route 53" className="service-icon-img" />,
    },
    {
      name: "ECS",
      icon: <img src={ecsIcon} alt="ECS" className="service-icon-img" />,
    },
    {
      name: "ELB",
      icon: <img src={elbIcon} alt="ELB" className="service-icon-img" />,
    },
  ];
