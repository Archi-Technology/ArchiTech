"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface VirtualMachinePopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function VirtualMachinePopup({ open, onOpenChange }: VirtualMachinePopupProps) {
  const [formData, setFormData] = useState({
    name: "",
    subnet: "",
    connectedTo: [] as string[],
    instanceType: "",
    region: "",
    operatingSystem: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const subnetOptions = [
    { value: "subnet-1", label: "Subnet 1 (10.0.1.0/24)" },
    { value: "subnet-2", label: "Subnet 2 (10.0.2.0/24)" },
    { value: "subnet-3", label: "Subnet 3 (10.0.3.0/24)" },
  ]

  const instanceTypeOptions = [
    { value: "t3.micro", label: "t3.micro (1 vCPU, 1 GiB RAM)" },
    { value: "t3.small", label: "t3.small (2 vCPU, 2 GiB RAM)" },
    { value: "t3.medium", label: "t3.medium (2 vCPU, 4 GiB RAM)" },
    { value: "t3.large", label: "t3.large (2 vCPU, 8 GiB RAM)" },
  ]

  const regionOptions = [
    { value: "us-east-1", label: "US East (N. Virginia)" },
    { value: "us-west-2", label: "US West (Oregon)" },
    { value: "eu-west-1", label: "Europe (Ireland)" },
    { value: "ap-southeast-1", label: "Asia Pacific (Singapore)" },
  ]

  const osOptions = [
    { value: "ubuntu-22.04", label: "Ubuntu 22.04 LTS" },
    { value: "windows-server-2022", label: "Windows Server 2022" },
    { value: "amazon-linux-2", label: "Amazon Linux 2" },
    { value: "centos-8", label: "CentOS 8" },
  ]

  const connectionOptions = [
    { value: "load-balancer", label: "Load Balancer" },
    { value: "database", label: "Database" },
    { value: "cache-server", label: "Cache Server" },
    { value: "api-gateway", label: "API Gateway" },
    { value: "web-server", label: "Web Server" },
    { value: "file-storage", label: "File Storage" },
  ]

  // Filter options based on search term and exclude already selected
  const filteredConnectionOptions = connectionOptions.filter(
    (option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) && !formData.connectedTo.includes(option.value),
  )

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
        setSearchTerm("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.subnet) {
      newErrors.subnet = "Subnet is required"
    }

    if (!formData.instanceType) {
      newErrors.instanceType = "Instance type is required"
    }

    if (!formData.region) {
      newErrors.region = "Region is required"
    }

    if (!formData.operatingSystem) {
      newErrors.operatingSystem = "Operating system is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Form submitted:", formData)
      onOpenChange(false)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel()
    }
  }

  const addConnection = (value: string) => {
    if (!formData.connectedTo.includes(value)) {
      setFormData((prev) => ({ ...prev, connectedTo: [...prev.connectedTo, value] }))
      setSearchTerm("")
      setIsDropdownOpen(false)
    }
  }

  const removeConnection = (valueToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      connectedTo: prev.connectedTo.filter((v) => v !== valueToRemove),
    }))
  }

  const handleInputClick = () => {
    setIsDropdownOpen(true)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setIsDropdownOpen(true)
  }

  const getSelectedLabels = () => {
    return formData.connectedTo
      .map((value) => connectionOptions.find((option) => option.value === value)?.label)
      .filter(Boolean)
      .join(", ")
  }

  const isFormValid =
    formData.name && formData.subnet && formData.instanceType && formData.region && formData.operatingSystem

  if (!open) return null

  return (
    <>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-content {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          max-width: 42rem;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .close-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.375rem;
          color: #6b7280;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .close-button:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .modal-header {
          padding: 2rem 2rem 1rem;
        }

        .optimization-banner {
          background: linear-gradient(135deg, #eff6ff, #e0e7ff);
          border: 1px solid #c7d2fe;
          border-radius: 0.75rem;
          padding: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .banner-icon {
          background: #dbeafe;
          padding: 0.5rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .banner-text {
          font-size: 0.875rem;
          color: #374151;
          line-height: 1.5;
        }

        .modal-title-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .title-icon {
          background: #f3f4f6;
          padding: 0.75rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
        }

        .modal-body {
          padding: 0 2rem 2rem;
        }

        .form-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
        }

        .required-asterisk {
          color: #ef4444;
          margin-left: 0.25rem;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: all 0.2s ease;
          background: white;
          font-family: inherit;
        }

        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-input::placeholder {
          color: #9ca3af;
        }

        .form-input.error {
          border-color: #ef4444;
        }

        .form-input.error:focus {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .form-select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 1rem;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .form-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-select.error {
          border-color: #ef4444;
        }

        .form-select.error:focus {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .multi-select-container {
          position: relative;
        }

        .multi-select-field {
          position: relative;
          display: flex;
          align-items: center;
          min-height: 48px;
          padding: 0.5rem 2.5rem 0.5rem 0.75rem;
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
          min-height: 1.5rem;
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
        }

        .dropdown-option {
          padding: 0.75rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
          border-bottom: 1px solid #f3f4f6;
        }

        .dropdown-option:last-child {
          border-bottom: none;
        }

        .dropdown-option:hover {
          background: #f9fafb;
        }

        .dropdown-option.selected {
          background: #eff6ff;
          color: #2563eb;
        }

        .no-options {
          padding: 0.75rem;
          color: #6b7280;
          font-style: italic;
          text-align: center;
        }

        .error-message {
          color: #ef4444;
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }

        .action-buttons {
          display: flex;
          justify-content: space-between;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
          margin-top: 1rem;
          gap: 1rem;
        }

        .button {
          padding: 0.75rem 2rem;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 100px;
          font-family: inherit;
        }

        .button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .button-secondary {
          background: white;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .button-secondary:hover:not(:disabled) {
          background: #f9fafb;
          border-color: #9ca3af;
        }

        .button-primary {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .button-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .button-primary:active:not(:disabled) {
          transform: translateY(0);
        }

        .icon {
          width: 1.25rem;
          height: 1.25rem;
          color: #2563eb;
        }

        .title-icon .icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #374151;
        }

        .close-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .arrow-icon {
          width: 1rem;
          height: 1rem;
        }

        .remove-icon {
          width: 0.75rem;
          height: 0.75rem;
        }

        @media (max-width: 640px) {
          .action-buttons {
            flex-direction: column-reverse;
            gap: 0.75rem;
          }

          .button {
            width: 100%;
          }

          .modal-content {
            margin: 0.5rem;
            max-height: 95vh;
          }

          .modal-header {
            padding: 1.5rem 1.5rem 1rem;
          }

          .modal-body {
            padding: 0 1.5rem 1.5rem;
          }

          .optimization-banner {
            flex-direction: column;
            text-align: center;
          }

          .modal-title-section {
            flex-direction: column;
            gap: 0.5rem;
          }

          .multi-select-input {
            min-width: 80px;
          }
        }
      `}</style>

      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content">
          <button className="close-button" onClick={handleCancel}>
            <svg className="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="modal-header">
            <div className="optimization-banner">
              <div className="banner-icon">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <div className="banner-text">
                Based on your app context, click here to get optimal cost and performance for "Virtual Machine".
              </div>
            </div>

            <div className="modal-title-section">
              <div className="title-icon">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h2 className="modal-title">Virtual Machine</h2>
            </div>
          </div>

          <div className="modal-body">
            <div className="form-container">
              {/* Name Field */}
              <div className="form-field">
                <label className="form-label">
                  Name
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.name ? "error" : ""}`}
                  placeholder="Enter a name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              {/* Subnet Field */}
              <div className="form-field">
                <label className="form-label">
                  Subnet
                  <span className="required-asterisk">*</span>
                </label>
                <select
                  className={`form-select ${errors.subnet ? "error" : ""}`}
                  value={formData.subnet}
                  onChange={(e) => setFormData((prev) => ({ ...prev, subnet: e.target.value }))}
                >
                  <option value="">-- Select Subnet --</option>
                  {subnetOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.subnet && <div className="error-message">{errors.subnet}</div>}
              </div>

              {/* Connected To Field */}
              <div className="form-field">
                <label className="form-label">Connected To</label>
                <div className="multi-select-container" ref={dropdownRef}>
                  <div className={`multi-select-field ${errors.connectedTo ? "error" : ""}`} onClick={handleInputClick}>
                    <div className="multi-select-content">
                      {formData.connectedTo.length > 0 && (
                        <div className="multi-select-tags">
                          {formData.connectedTo.map((value) => {
                            const option = connectionOptions.find((opt) => opt.value === value)
                            return (
                              <div key={value} className="multi-select-tag">
                                {option?.label}
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
                      )}
                      <input
                        type="text"
                        className="multi-select-input"
                        placeholder={formData.connectedTo.length === 0 ? "Connected To" : "Add more..."}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <svg
                      className={`multi-select-arrow arrow-icon ${isDropdownOpen ? "open" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </div>

                  {isDropdownOpen && (
                    <div className="multi-select-dropdown">
                      {filteredConnectionOptions.length > 0 ? (
                        filteredConnectionOptions.map((option) => (
                          <div
                            key={option.value}
                            className="dropdown-option"
                            onClick={() => addConnection(option.value)}
                          >
                            {option.label}
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
                {errors.connectedTo && <div className="error-message">{errors.connectedTo}</div>}
              </div>

              {/* Instance Type Field */}
              <div className="form-field">
                <label className="form-label">
                  Instance Type
                  <span className="required-asterisk">*</span>
                </label>
                <select
                  className={`form-select ${errors.instanceType ? "error" : ""}`}
                  value={formData.instanceType}
                  onChange={(e) => setFormData((prev) => ({ ...prev, instanceType: e.target.value }))}
                >
                  <option value="">-- Select Instance Type --</option>
                  {instanceTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.instanceType && <div className="error-message">{errors.instanceType}</div>}
              </div>

              {/* Region Field */}
              <div className="form-field">
                <label className="form-label">
                  Region
                  <span className="required-asterisk">*</span>
                </label>
                <select
                  className={`form-select ${errors.region ? "error" : ""}`}
                  value={formData.region}
                  onChange={(e) => setFormData((prev) => ({ ...prev, region: e.target.value }))}
                >
                  <option value="">-- Select Region --</option>
                  {regionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.region && <div className="error-message">{errors.region}</div>}
              </div>

              {/* Operating System Field */}
              <div className="form-field">
                <label className="form-label">
                  Operating System
                  <span className="required-asterisk">*</span>
                </label>
                <select
                  className={`form-select ${errors.operatingSystem ? "error" : ""}`}
                  value={formData.operatingSystem}
                  onChange={(e) => setFormData((prev) => ({ ...prev, operatingSystem: e.target.value }))}
                >
                  <option value="">-- Select OS --</option>
                  {osOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.operatingSystem && <div className="error-message">{errors.operatingSystem}</div>}
              </div>
            </div>

            <div className="action-buttons">
              <button type="button" className="button button-secondary" onClick={handleCancel} disabled={isLoading}>
                Cancel
              </button>
              <button
                type="button"
                className="button button-primary"
                onClick={handleNext}
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? "Processing..." : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
