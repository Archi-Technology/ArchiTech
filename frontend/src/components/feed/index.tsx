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
