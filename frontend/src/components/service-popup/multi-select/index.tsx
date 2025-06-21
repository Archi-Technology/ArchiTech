import React, { useRef, useState, useEffect } from "react";
import { IBaseService } from "../../../interfaces/canvas";

interface MultipleSelectChipProps {
  availableSource?: IBaseService[];
  selectedConnections: string[];
  setSelectedConnections: React.Dispatch<React.SetStateAction<string[]>>;
  error?: string;
  shaking?: boolean;
}

export default function MultipleSelectChip({
  availableSource = [],
  selectedConnections,
  setSelectedConnections,
  error,
  shaking,
}: MultipleSelectChipProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => setOpen((prev) => !prev);

  const handleSelect = (id: string) => {
    if (selectedConnections.includes(id)) {
      setSelectedConnections(selectedConnections.filter((v) => v !== id));
    } else {
      setSelectedConnections([...selectedConnections, id]);
    }
  };

  const selectedLabels = availableSource
    .filter((src) => selectedConnections.includes(src._id))
    .map((src) => src.name);

  return (
    <div className="popup-selection" ref={ref}>
      <label>Connected To:</label>
      <div
        className={`custom-multiselect ${error ? "error" : ""} ${shaking ? "shake" : ""}`}
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleToggle(); }}
      >
        <div className="custom-multiselect-value">
          {selectedLabels.length > 0 ? selectedLabels.join(", ") : "Connected To"}
        </div>
        {/* <span
          className="custom-multiselect-arrow"
          onClick={e => { e.stopPropagation(); handleToggle(); }}
          style={{ cursor: "pointer" }}
        >
          &#9662;
        </span> */}
      </div>
      {open && (
        <div
          className="custom-multiselect-dropdown"
          onClick={e => e.stopPropagation()}
        >
          {availableSource.length === 0 && (
            <div className="custom-multiselect-option disabled">No options</div>
          )}
          {availableSource.map((src) => (
            <div
              key={src._id}
              className={`custom-multiselect-option${selectedConnections.includes(src._id) ? " selected" : ""}`}
              onClick={() => handleSelect(src._id)}
            >
              <input
                type="checkbox"
                checked={selectedConnections.includes(src._id)}
                readOnly
                tabIndex={-1}
              />
              <span>{src.name}</span>
            </div>
          ))}
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      <style>{`
        .custom-multiselect {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          margin-bottom: 1rem;
          background: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          text-align: left;
        }
        .custom-multiselect:focus {
          outline: none;
          border-color: #3b82f6;
        }
        .custom-multiselect.error {
          border-color: #ef4444;
        }
        .custom-multiselect.shake {
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        .custom-multiselect-value {
          flex: 1;
          color: #374151;
        }
        .custom-multiselect-arrow {
          margin-left: 0.5rem;
          font-size: 1rem;
        }
        .custom-multiselect-dropdown {
          position: absolute;
          left: 0;
          right: 0;
          top: 100%;
          z-index: 10;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 0.25rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          max-height: 180px;
          overflow-y: auto;
          margin-top: 5px;
        }
        .custom-multiselect-option {
          padding: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .custom-multiselect-option.selected {
          background: #f3f4f6;
        }
        .custom-multiselect-option:hover:not(.disabled) {
          background: #f1f5f9;
        }
        .custom-multiselect-option.disabled {
          color: #aaa;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}