import React from "react";
import { SocialPosts } from "../social-posts";
import { CreatePost } from "../create-post";
import { feedPostKey } from "../../services/postService";
import './index.scss'
import { ChevronDown, Share, Settings } from "lucide-react"
import { Button } from "../ui/button"
import ServiceSidebar from "../service-sidebar"
import DiagramCanvas from "../diagram-canvas"
import CodePanel from "../code-panel"


export const Feed: React.FC = () => {
    return (
        <div className="container" >
      {/* Top navigation bar */}
      <div className="navbar">
        <div className="navbarLeft">
          <div className="logoContainer">
            <div className="logo">A</div>
            <div className="appName">ArchiTech</div>
          </div>
          <div className="appTitle">AWS 3 tier web app with a database</div>
        </div>
        <div className="navbarRight">
          <button className="navButton">
            Templates <span className="chevronDown">▼</span>
          </button>
          <button className="iconButton">
            <span className="shareIcon">↗</span>
          </button>
          <button className="iconButton">
            <span className="settingsIcon">⚙</span>
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="mainContent">
        {/* Left sidebar with services */}
        <ServiceSidebar />

        {/* Main diagram canvas */}
        <div className="canvasContainer">
          <DiagramCanvas />
        </div>

        {/* Right code panel */}
        <div className="codePanel">
          <CodePanel />
        </div>
      </div>
    </div>
    )
}
