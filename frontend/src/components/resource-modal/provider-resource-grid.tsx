"use client"

import type { ResourceOption } from "../../types/resource-types"
import PricePropositionCard from "../price-proposition-card"

export function ProviderResourceGrid({
  provider,
  resources,
  selectedResource,
  setSelectedResource,
  pricingType,
}: {
  provider: "AWS" | "Azure"
  resources: ResourceOption[]
  selectedResource: string
  setSelectedResource: (id: string) => void
  pricingType: "on-demand" | "spot" | "savings"
}) {
  if (resources.length === 0) {
    return <div className="no-resources">No {provider} resources available for this configuration</div>
  }

  return (
    <div className="resource-grid">
      {resources.map((resource) => (
        <PricePropositionCard
          key={resource.id}
          resource={resource}
          isSelected={selectedResource === resource.id}
          onSelect={(id) => setSelectedResource(id)}
          pricingType={pricingType}
        />
      ))}
    </div>
  )
}
