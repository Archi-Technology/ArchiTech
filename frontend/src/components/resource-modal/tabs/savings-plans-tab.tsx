import { SavingsTable } from "../savings-table"

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

export function SavingsPlansTab({
  isActive,
  savingsPlans,
  selectedResource,
  setSelectedResource,
}: {
  isActive: boolean
  savingsPlans: ResourceOption[]
  selectedResource: string
  setSelectedResource: (id: string) => void
}) {
  if (!isActive) return null

  return (
    <div className="tab-panel active">
      <div className="pricing-header">
        <h3 className="pricing-option-name">Savings Plans & Reserved Instances</h3>
        <p className="pricing-option-description">
          Commit to 1 or 3 years for significant discounts. Best for stable, predictable workloads.
        </p>
      </div>
      <div className="toggle-container">
        <div className="provider-section">
          {savingsPlans.length === 0 ? (
            <div className="no-resources">No savings plans available for this configuration</div>
          ) : (
            <SavingsTable
              savingsPlans={savingsPlans}
              selectedResource={selectedResource}
              setSelectedResource={setSelectedResource}
            />
          )}
        </div>
      </div>
    </div>
  )
}
