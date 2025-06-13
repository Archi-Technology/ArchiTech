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

export function OnDemandTab({
  isActive,
  resources,
  selectedResource,
  setSelectedResource,
}: {
  isActive: boolean
  resources: ResourceOption[]
  selectedResource: string
  setSelectedResource: (id: string) => void
}) {
  if (!isActive) return null

  const awsResources = resources.filter((r) => r.provider === "AWS")
  const azureResources = resources.filter((r) => r.provider === "azure")

  return (
    <div className="tab-panel active">
      <div className="pricing-header">
        <h3 className="pricing-option-name">On-Demand Pricing</h3>
        <p className="pricing-option-description">
          Pay as you go with no commitment. Standard pricing with maximum flexibility.
        </p>
      </div>
      <div className="toggle-container">
        <div className="provider-section">
          <ProviderResourceGrid
            provider="AWS"
            resources={awsResources}
            selectedResource={selectedResource}
            setSelectedResource={setSelectedResource}
            pricingType="on-demand"
          />

          <ProviderResourceGrid
            provider="Azure"
            resources={azureResources}
            selectedResource={selectedResource}
            setSelectedResource={setSelectedResource}
            pricingType="on-demand"
          />
        </div>
      </div>
    </div>
  )
}
