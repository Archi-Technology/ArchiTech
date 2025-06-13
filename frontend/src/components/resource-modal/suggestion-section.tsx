import { FaRobot } from "react-icons/fa"

export function SuggestionSection({ suggestion }: { suggestion: string | null }) {
  return (
    <div className="suggestion-section">
      <div className="suggestion-container">
        <div className="bot-icon-container">
          <FaRobot className="bot-icon" />
        </div>
        <div className="suggestion-content">
          <div className="suggestion-title">{"Adam's Suggestion:"}</div>
          <div className="suggestion-text">{suggestion || "No recommendation available at the moment."}</div>
        </div>
      </div>
    </div>
  )
}
