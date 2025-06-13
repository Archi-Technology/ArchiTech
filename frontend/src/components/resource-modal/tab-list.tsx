"use client"

import type { PricingOption } from "../../types/resource-types"

export function TabList({
  pricingOptions,
  activePricingOption,
  onTabChange,
}: {
  pricingOptions: PricingOption[]
  activePricingOption: string
  onTabChange: (option: string) => void
}) {
  return (
    <div className="tabs-list">
      {pricingOptions.map((option) => (
        <button
          key={option.id}
          className={`tab-button ${activePricingOption === option.id ? "active" : ""}`}
          onClick={() => onTabChange(option.id)}
        >
          {option.name}
        </button>
      ))}
    </div>
  )
}
