"use client"

export function ModalActions({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="actions">
      <button className="button secondary" onClick={onClose}>
        Cancel
      </button>
      <button
        className="button primary"
        onClick={() => {
          onConfirm()
          onClose()
        }}
      >
        Confirm Selection
      </button>
    </div>
  )
}
