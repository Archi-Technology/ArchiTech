"use client"

export function ModalActions({ onClose }: { onClose: () => void }) {
  return (
    <div className="actions">
      <button className="button secondary" onClick={onClose}>
        Cancel
      </button>
      <button className="button primary">Confirm Selection</button>
    </div>
  )
}
