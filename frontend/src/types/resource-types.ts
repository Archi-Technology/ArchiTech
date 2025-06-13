export interface ResourceOption {
  id: string
  provider: "AWS" | "azure"
  region?: string

  // Virtual machine specific fields
  productName?: string
  instanceType?: string
  os?: string
  pricePerHour?: number
  spotInstance?: boolean
  reservationTerm?: string | null
  savingsPlan?: boolean

  // Object storage specific fields
  pricePerGbPerMonth?: number
  redundancy?: string
  storageClass?: string
  storageTier?: string
}

export interface PricingOption {
  id: string
  name: string
  description: string
  discount: string
}
