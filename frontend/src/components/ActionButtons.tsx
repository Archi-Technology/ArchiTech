"use client"

interface ActionButtonsProps {
  onNext: () => void
  onCancel: () => void
  isNextDisabled?: boolean
  isLoading?: boolean
}

export function ActionButtons({ onNext, onCancel, isNextDisabled, isLoading }: ActionButtonsProps) {
  return (
    <div className="action-buttons">
      <button type="button" className="button button-secondary" onClick={onCancel} disabled={isLoading}>
        Cancel
      </button>
      <button type="button" className="button button-primary" onClick={onNext} disabled={isNextDisabled || isLoading}>
        {isLoading ? "Processing..." : "Next"}
      </button>
    </div>
  )
}
