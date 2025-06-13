import type { ResourceOption, PricingOption } from "../../../types/resource-types"
import { TabList } from "../tab-list"
import { OnDemandTab } from "./on-demand-tab"
import { SpotInstancesTab } from "./spot-instances-tab"
import { SavingsPlansTab } from "./savings-plans-tab"

export function ResourceTabs({
  serviceName,
  pricingOption,
  setPricingOption,
  resources,
  spotInstances,
  savingsPlans,
  selectedResource,
  setSelectedResource,
  isVirtualMachine,
}: {
  serviceName: string
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
          serviceName={serviceName}
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
