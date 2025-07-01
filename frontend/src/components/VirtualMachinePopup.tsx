"use client"

import type React from "react"

import { useState } from "react"
import { FormInput } from "./FormInput"
import { FormSelect } from "./FormSelect"
import { FormMultiSelect } from "./FormMultiSelect"
import { ActionButtons } from "./ActionButtons"

interface VirtualMachinePopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VirtualMachinePopup({ open, onOpenChange }: VirtualMachinePopupProps) {
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

  const connectionSuggestions = ["Load Balancer", "Database", "Cache Server", "API Gateway"]

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
      // Simulate API call
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

  const isFormValid =
    formData.name && formData.subnet && formData.instanceType && formData.region && formData.operatingSystem

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-button" onClick={handleCancel}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-header">
          <div className="optimization-banner">
            <div className="banner-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <div className="banner-text">
              Based on your app context, click here to get optimal cost and performance for "Virtual Machine".
            </div>
          </div>

          <div className="modal-title-section">
            <div className="title-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            <FormInput
              label="Name"
              placeholder="Enter a name"
              value={formData.name}
              onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
              required
              error={errors.name}
            />

            <FormSelect
              label="Subnet"
              placeholder="-- Select Subnet --"
              value={formData.subnet}
              onChange={(value) => setFormData((prev) => ({ ...prev, subnet: value }))}
              options={subnetOptions}
              required
              error={errors.subnet}
            />

            <FormMultiSelect
              label="Connected To"
              placeholder="Add connection"
              values={formData.connectedTo}
              onChange={(values) => setFormData((prev) => ({ ...prev, connectedTo: values }))}
              suggestions={connectionSuggestions}
              error={errors.connectedTo}
            />

            <FormSelect
              label="Instance Type"
              placeholder="-- Select Instance Type --"
              value={formData.instanceType}
              onChange={(value) => setFormData((prev) => ({ ...prev, instanceType: value }))}
              options={instanceTypeOptions}
              required
              error={errors.instanceType}
            />

            <FormSelect
              label="Region"
              placeholder="-- Select Region --"
              value={formData.region}
              onChange={(value) => setFormData((prev) => ({ ...prev, region: value }))}
              options={regionOptions}
              required
              error={errors.region}
            />

            <FormSelect
              label="Operating System"
              placeholder="-- Select OS --"
              value={formData.operatingSystem}
              onChange={(value) => setFormData((prev) => ({ ...prev, operatingSystem: value }))}
              options={osOptions}
              required
              error={errors.operatingSystem}
            />
          </div>

          <ActionButtons
            onNext={handleNext}
            onCancel={handleCancel}
            isNextDisabled={!isFormValid}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
