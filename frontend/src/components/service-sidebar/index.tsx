
import "./index.scss"
import { useState } from "react"

export default function ServiceSidebar() {
    const [activeTab, setActiveTab] = useState("catalog")
  
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
              Catalog
            </button>
            <button
              className={`tab-button ${activeTab === "modules" ? "active-tab" : ""}`}
              onClick={() => setActiveTab("modules")}
            >
              Modules
            </button>
          </div>
  
          <div className="tab-content">
            {activeTab === "catalog" ? (
              <div className="service-grid">
                {services.map((service) => (
                  <ServiceCard key={service.name} {...service} />
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
    name: string
    icon: string
  }
  
  function ServiceCard({ name, icon }: ServiceCardProps) {
    return (
      <div className="service-card">
        <div className="service-icon">{icon}</div>
        <div className="service-name">{name}</div>
      </div>
    )
  }
  
  const services = [
    {
      name: "EC2",
      icon: "💻",
    },
    {
      name: "S3",
      icon: "📦",
    },
    {
      name: "Lambda",
      icon: "λ",
    },
    {
      name: "API Gateway",
      icon: "🔌",
    },
    {
      name: "VPC",
      icon: "🔒",
    },
    {
      name: "CloudFront",
      icon: "🌐",
    },
    {
      name: "Route 53",
      icon: "🧭",
    },
    {
      name: "ECS",
      icon: "🐳",
    },
    {
      name: "ELB",
      icon: "⚖️",
    },
  ]
  