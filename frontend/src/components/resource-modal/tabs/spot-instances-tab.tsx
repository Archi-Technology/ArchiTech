import { ProviderResourceGrid } from "../provider-resource-grid"

interface ResourceOption {
  id: string
  provider: "AWS" | "azure"
  region?: string
  productName?: string
  instanceType?: string
  os?: string
  pricePerHour?: number
  spotInstance?: boolean
  reservationTerm?: string | null
  savingsPlan?: boolean
  pricePerGbPerMonth?: number
  redundancy?: string
  storageClass?: string
  storageTier?: string
}

export function SpotInstancesTab({
  isActive,
  spotInstances,
  selectedResource,
  setSelectedResource,
}: {
  isActive: boolean
  spotInstances: ResourceOption[]
  selectedResource: string
  setSelectedResource: (id: string) => void
}) {
  if (!isActive) return null

  const awsSpotInstances = spotInstances.filter((r) => r.provider === "AWS")
  const azureSpotInstances = spotInstances.filter((r) => r.provider === "azure")

  return (
    <div className="tab-panel active">
      <div className="pricing-header">
        <h3 className="pricing-option-name">Spot Instances</h3>
        <p className="pricing-option-description">
          Up to 90% off on-demand pricing with variable availability. Best for fault-tolerant workloads.
        </p>
      </div>
      <div className="toggle-container">
        <div className="provider-section">
          <ProviderResourceGrid
            provider="AWS"
            resources={awsSpotInstances}
            selectedResource={selectedResource}
            setSelectedResource={setSelectedResource}
            pricingType="spot"
          />

          <ProviderResourceGrid
            provider="Azure"
            resources={azureSpotInstances}
            selectedResource={selectedResource}
            setSelectedResource={setSelectedResource}
            pricingType="spot"
          />
        </div>
      </div>
    </div>
  )
}
