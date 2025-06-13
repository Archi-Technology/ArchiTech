"use client"

import awsIcon from "../../assets/awsIcon.png"
import azureIcon from "../../assets/azureIcon.png"

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

export function SavingsTable({
  savingsPlans,
  selectedResource,
  setSelectedResource,
}: {
  savingsPlans: ResourceOption[]
  selectedResource: string
  setSelectedResource: (id: string) => void
}) {
  // Group savings plans by term
  const oneYearPlans = savingsPlans.filter((resource) => resource.reservationTerm === "1 Year")

  const threeYearPlans = savingsPlans.filter((resource) => resource.reservationTerm === "3 Years")

  return (
    <table className="savings-table">
      <thead>
        <tr>
          <th>Term</th>
          <th>Provider</th>
          <th>Price Per Hour</th>
          <th>Select</th>
        </tr>
      </thead>
      <tbody>
        {/* 1-Year Term Rows */}
        {oneYearPlans.map((resource) => (
          <tr key={resource.id}>
            <td>1 Year</td>
            <td>
              <img
                src={resource.provider === "AWS" ? awsIcon : azureIcon}
                alt={resource.provider}
                className="provider-icon"
              />
            </td>
            <td>${resource.pricePerHour?.toFixed(4) || "N/A"}</td>
            <td>
              <input
                type="radio"
                name="savings-plan"
                checked={selectedResource === resource.id}
                onChange={() => setSelectedResource(resource.id)}
              />
            </td>
          </tr>
        ))}

        {/* 3-Year Term Rows */}
        {threeYearPlans.map((resource) => (
          <tr key={resource.id}>
            <td>3 Years</td>
            <td>
              <img
                src={resource.provider === "AWS" ? awsIcon : azureIcon}
                alt={resource.provider}
                className="provider-icon"
              />
            </td>
            <td>${resource.pricePerHour?.toFixed(4) || "N/A"}</td>
            <td>
              <input
                type="radio"
                name="savings-plan"
                checked={selectedResource === resource.id}
                onChange={() => setSelectedResource(resource.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
