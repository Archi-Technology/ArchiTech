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
const [searchTerm, setSearchTerm] = useState("")
  const handleSelect = (id: string) => {
    if (selectedConnections.includes(id)) {
      setSelectedConnections(selectedConnections.filter((v) => v !== id));
    } else {
      setSelectedConnections([...selectedConnections, id]);
    }
  };

  const filteredConnectionOptions = availableSource.filter(
    (option) =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedConnections.includes(option._id),
  )

  const removeConnection = (valueToRemove: string) => {
    setSelectedConnections(selectedConnections.filter((v) => v !== valueToRemove));
  }

  
  const addConnection = (value: string) => {
    if (!selectedConnections.includes(value)) {
      setSelectedConnections([...selectedConnections, value]);
      setSearchTerm("")
      setOpen(false)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
      setOpen(true)
    }

  const selectedLabels = availableSource
    .filter((src) => selectedConnections.includes(src._id))
    .map((src) => src.name);

  return (
    <>
    <style>{`
        .multi-select-container {
          position: relative;
        }

        .multi-select-field {
          position: relative;
          display: flex;
          align-items: center;
          padding: 0.65rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .multi-select-field:focus-within {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .multi-select-field.error {
          border-color: #ef4444;
        }

        .multi-select-field.error:focus-within {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .multi-select-content {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.25rem;
          flex: 1;
        }

        .multi-select-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
        }

        .multi-select-tag {
          background: #e0e7ff;
          color: #3730a3;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .tag-remove {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3730a3;
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }

        .tag-remove:hover {
          opacity: 1;
        }

        .multi-select-input {
          border: none;
          outline: none;
          background: transparent;
          flex: 1;
          min-width: 120px;
          font-size: 1rem;
          font-family: inherit;
        }

        .multi-select-input::placeholder {
          color: #9ca3af;
        }

        .multi-select-arrow {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
          transition: transform 0.2s ease;
        }

        .multi-select-arrow.open {
          transform: translateY(-50%) rotate(180deg);
        }

        .multi-select-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          z-index: 50;
          max-height: 200px;
          overflow-y: auto;
          margin-top: 0.25rem;
          animation: slideDown 0.2s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-option {
          padding: 0.75rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
          border-bottom: 1px solid #f3f4f6;
          font-size: 0.875rem;
          text-align: left;
        }

        .dropdown-option:last-child {
          border-bottom: none;
        }

        .dropdown-option:hover {
          background: #f9fafb;
        }

        .dropdown-option:active {
          background: #f3f4f6;
        }

        .no-options {
          padding: 0.75rem;
          color: #6b7280;
          font-style: italic;
          text-align: center;
          font-size: 0.875rem;
        }

        .error-message {
          color: #ef4444;
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }

        .remove-icon {
          width: 0.75rem;
          height: 0.75rem;
        }

        .arrow-icon {
          width: 1rem;
          height: 1rem;
        }

        .placeholder-text-new {
          color: #9ca3af;
          font-size: 1rem;
          user-select: none;
          font-size: 0.9rem;
        }

        /* Custom scrollbar for dropdown */
        .multi-select-dropdown::-webkit-scrollbar {
          width: 6px;
        }

        .multi-select-dropdown::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }

        .multi-select-dropdown::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .multi-select-dropdown::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        @media (max-width: 640px) {
          .multi-select-input {
            min-width: 80px;
          }

          .multi-select-tag {
            font-size: 0.75rem;
            padding: 0.1rem 0.3rem;
          }

          .dropdown-option {
            padding: 0.625rem;
          }
        }
      `}</style>
  
  <div className="form-field">
                <label className="form-label">Connected To</label>
                <div className="multi-select-container" ref={ref}>
                  <div className={`multi-select-field`} onClick={handleToggle}>
                    <div className="multi-select-content">
                      {selectedConnections.length > 0 ? (
                        <div className="multi-select-tags">
                          {selectedConnections.map((value) => {
                            const option = availableSource.find((opt) => opt._id === value)
                            return (
                              <div key={value} className="multi-select-tag">
                                {option?.name}
                                <button
                                  type="button"
                                  className="tag-remove"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeConnection(value)
                                  }}
                                >
                                  <svg
                                    className="remove-icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                  </svg>
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      ):  <div className="placeholder-text-new">Select Resources</div>}
                      
                    </div>
                    <svg
              className={`multi-select-arrow arrow-icon ${open ? "open" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
                  </div>

                  {open && (
                    <div className="multi-select-dropdown">
                      {filteredConnectionOptions.length > 0 ? (
                        filteredConnectionOptions.map((option) => (
                          <div
                            key={option._id}
                            className="dropdown-option"
                            onClick={() => addConnection(option._id)}
                          >
                            {option.name}
                          </div>
                        ))
                      ) : (
                        <div className="no-options">
                          {searchTerm ? "No matching options" : "No more options available"}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
 
    </>

 );
        
}