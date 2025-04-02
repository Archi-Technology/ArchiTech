import type React from "react"
import './index.scss'

export default function DiagramCanvas() {
    return (
        <div className="diagram">
          {/* HTTP Client */}
          <div className="http-client">
            <DiagramNode title="HTTPClient" icon="👤" width={100} height={100} />
          </div>
    
          {/* API Service Plan */}
          <div className="api-service-plan">
            <DiagramNode title="API service plan" icon="📋" width={120} height={100} />
          </div>
    
          {/* Application Section */}
          <div className="application-section-1">
            <DiagramSection title="Application" width={180} height={120} color="orange">
              <div className="section-content">
                <DiagramNode title="HTTP trigger" icon="⚡" width={100} height={60} color="yellow" />
              </div>
            </DiagramSection>
          </div>
    
          {/* Service Bus Section */}
          <div className="service-bus-section">
            <DiagramSection title="Service Bus & Queue" width={180} height={120} color="blue">
              <div className="section-content-column">
                <div className="section-content-item">
                  <DiagramNode title="ServiceBus Namespace" icon="📨" width={140} height={40} color="blue" small />
                </div>
                <div className="section-content-item-bottom">
                  <DiagramNode title="Location" icon="📍" width={80} height={30} color="blue" small />
                </div>
              </div>
            </DiagramSection>
          </div>
    
          {/* Queue Trigger Application */}
          <div className="queue-trigger-section">
            <DiagramSection title="Application" width={180} height={120} color="orange">
              <div className="section-content-column">
                <div className="section-content-item">
                  <DiagramNode title="Queue trigger" icon="⚡" width={100} height={40} color="yellow" small />
                </div>
                <div className="section-content-item-bottom">
                  <DiagramNode title="APP service plan" icon="📋" width={120} height={30} color="blue" small />
                </div>
              </div>
            </DiagramSection>
          </div>
    
          {/* Storage Section */}
          <div className="storage-section">
            <DiagramSection title="Storage" width={180} height={120} color="blue">
              <div className="section-content-column">
                <div className="section-content-item">
                  <DiagramNode title="Storage container" icon="🗄️" width={120} height={40} color="blue" small />
                </div>
                <div className="section-content-item-bottom">
                  <DiagramNode title="Storage account" icon="💾" width={120} height={30} color="blue" small />
                </div>
              </div>
            </DiagramSection>
          </div>
    
          {/* Blob Trigger Application */}
          <div className="blob-trigger-section">
            <DiagramSection title="Application" width={180} height={120} color="orange">
              <div className="section-content-column">
                <div className="section-content-item">
                  <DiagramNode title="Blob trigger" icon="⚡" width={100} height={40} color="yellow" small />
                </div>
                <div className="section-content-item-bottom">
                  <DiagramNode title="APP service plan" icon="📋" width={120} height={30} color="blue" small />
                </div>
              </div>
            </DiagramSection>
          </div>
    
          {/* Application Insights */}
          <div className="insights-section">
            <DiagramSection title="Application Insights" width={180} height={120} color="purple">
              <div className="section-content">
                <DiagramNode title="" icon="📊" width={60} height={60} color="purple" />
              </div>
            </DiagramSection>
          </div>
    
          {/* Secret Management */}
          <div className="secrets-section">
            <DiagramSection title="Secret management" width={180} height={120} color="red">
              <div className="section-content-column">
                <div className="section-content-item">
                  <DiagramNode title="KEY vault" icon="🔑" width={80} height={40} color="red" small />
                </div>
                <div className="section-content-item-bottom">
                  <DiagramNode title="KEY vault access policy" icon="📜" width={140} height={30} color="yellow" small />
                </div>
              </div>
            </DiagramSection>
          </div>
    
          {/* Connection Lines */}
          <svg className="connection-lines">
            {/* HTTP Client to API Service Plan */}
            <line x1="100" y1="80" x2="150" y2="80" stroke="#888" strokeWidth="2" />
    
            {/* API Service Plan to Application */}
            <line x1="270" y1="80" x2="350" y2="80" stroke="#888" strokeWidth="2" />
    
            {/* Application to Service Bus */}
            <line x1="530" y1="80" x2="550" y2="80" stroke="#888" strokeWidth="2" />
    
            {/* Service Bus to Queue Trigger */}
            <line x1="730" y1="80" x2="750" y2="80" stroke="#888" strokeWidth="2" />
    
            {/* Service Bus to Storage */}
            <line x1="640" y1="170" x2="640" y2="220" stroke="#888" strokeWidth="2" />
    
            {/* Storage to Blob Trigger */}
            <line x1="730" y1="280" x2="750" y2="280" stroke="#888" strokeWidth="2" />
          </svg>
        </div>
      )
    }
    
    interface DiagramNodeProps {
      title: string
      icon: string
      width: number
      height: number
      color?: string
      small?: boolean
    }
    
    function DiagramNode({ title, icon, width, height, color = "white", small = false }: DiagramNodeProps) {
      const getNodeStyle = () => {
        const baseStyle = {
          width: `${width}px`,
          height: `${height}px`,
        }
    
        let colorStyle = {}
        switch (color) {
          case "yellow":
            colorStyle = { backgroundColor: "#fef3c7", borderColor: "#fcd34d" }
            break
          case "blue":
            colorStyle = { backgroundColor: "#eff6ff", borderColor: "#bfdbfe" }
            break
          case "purple":
            colorStyle = { backgroundColor: "#f5f3ff", borderColor: "#ddd6fe" }
            break
          case "red":
            colorStyle = { backgroundColor: "#fee2e2", borderColor: "#fecaca" }
            break
          case "orange":
            colorStyle = { backgroundColor: "#fff7ed", borderColor: "#fed7aa" }
            break
          default:
            colorStyle = { backgroundColor: "white", borderColor: "#e2e8f0" }
        }
    
        return { ...baseStyle, ...colorStyle }
      }
    
      return (
        <div className="diagram-node" style={getNodeStyle()}>
          <div className={`node-icon ${small ? "small-icon" : ""}`}>{icon}</div>
          {title && <div className={`node-title ${small ? "small-title" : ""}`}>{title}</div>}
        </div>
      )
    }
    
    interface DiagramSectionProps {
      title: string
      width: number
      height: number
      color?: string
      children: React.ReactNode
    }
    
    function DiagramSection({ title, width, height, color = "blue", children }: DiagramSectionProps) {
      const getSectionStyle = () => {
        const baseStyle = {
          width: `${width}px`,
          height: `${height}px`,
        }
    
        let borderColor = "#bfdbfe" // default blue
        switch (color) {
          case "yellow":
            borderColor = "#fcd34d"
            break
          case "blue":
            borderColor = "#bfdbfe"
            break
          case "purple":
            borderColor = "#ddd6fe"
            break
          case "red":
            borderColor = "#fecaca"
            break
          case "orange":
            borderColor = "#fed7aa"
            break
          default:
            borderColor = "#e2e8f0"
        }
    
        return { ...baseStyle, borderColor }
      }
    
      return (
        <div className="diagram-section" style={getSectionStyle()}>
          <div className="section-title">{title}</div>
          <div className="section-body">{children}</div>
        </div>
      )
}

