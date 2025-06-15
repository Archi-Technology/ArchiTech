import { TabList } from "./tab-list"
import { OnDemandTab } from "./tabs/on-demand-tab"
import { SpotInstancesTab } from "./tabs/spot-instances-tab"
import { SavingsPlansTab } from "./tabs/savings-plans-tab"

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

interface PricingOption {
  id: string
  name: string
  description: string
  discount: string
}

export function ResourceTabs({
  pricingOption,
  setPricingOption,
  resources,
  spotInstances,
  savingsPlans,
  selectedResource,
  setSelectedResource,
  isVirtualMachine,
}: {
  pricingOption: string
  setPricingOption: (option: string) => void
  resources: ResourceOption[]
  spotInstances: ResourceOption[]
  savingsPlans: ResourceOption[]
  selectedResource: string
  setSelectedResource: (id: string) => void
  isVirtualMachine: boolean
}) {
  // Define pricing options
  const pricingOptions: PricingOption[] = [
    {
      id: "on-demand",
      name: "On-Demand",
      description: "Pay as you go with no commitment",
      discount: "0%",
    },
    {
      id: "spot",
      name: "Spot Instances",
      description: "Up to 90% off on-demand pricing with variable availability",
      discount: "Up to 90%",
    },
    {
      id: "savings",
      name: "Savings Plans",
      description: "Commit to 1 or 3 years for significant discounts",
      discount: "Up to 72%",
    },
  ]

  // Filter options based on resource type
  const availablePricingOptions = isVirtualMachine
    ? pricingOptions
    : pricingOptions.filter((option) => option.id === "on-demand")

  return (
    <div className="pricing-section">
      <div className="tabs-container">
        <TabList
          pricingOptions={availablePricingOptions}
          activePricingOption={pricingOption}
          onTabChange={setPricingOption}
        />

        <OnDemandTab
          isActive={pricingOption === "on-demand"}
          resources={resources}
          selectedResource={selectedResource}
          setSelectedResource={setSelectedResource}
        />

        {isVirtualMachine && (
          <>
            <SpotInstancesTab
              isActive={pricingOption === "spot"}
              spotInstances={spotInstances}
              selectedResource={selectedResource}
              setSelectedResource={setSelectedResource}
            />

            <SavingsPlansTab
              isActive={pricingOption === "savings"}
              savingsPlans={savingsPlans}
              selectedResource={selectedResource}
              setSelectedResource={setSelectedResource}
            />
          </>
        )}
      </div>
    </div>
  )
}
