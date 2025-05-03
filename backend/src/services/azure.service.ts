import axios from "axios";

export interface BlobPricingParams {
  region: string;
  storageTier: string;
  redundancy: string;
  dataStoredGB: number;
  operations: Record<string, number>;
  dataRetrievalGB: number;
  blobType?: string;
  blobSizeMB?: number;
  numberOfBlobs?: number;
  snapshotsEnabled?: boolean;
  versioningEnabled?: boolean;
  lifecyclePolicyEnabled?: boolean;
}

export interface VmPricingParams {
  region: string;
  vmSize: string;
  osType: string;
  savingPlan?: boolean;
}

export class AzureService {
  private pricingApiUrl = "https://prices.azure.com/api/retail/prices";

  async getBlobStoragePrice(params: BlobPricingParams): Promise<any | null> {
    try {
      // Fetch storage pricing
      const storagePricePerGB = await this.getStoragePricePerGB(
        params.region,
        params.storageTier,
        params.redundancy
      );
      if (storagePricePerGB === null) {
        console.error("Storage pricing not found.");
        return null;
      }
      let storageCost = storagePricePerGB * params.dataStoredGB;

      return {
        region: params.region,
        tier: params.storageTier,
        redundancy: params.redundancy,
        storageCost: parseFloat(storageCost.toFixed(4)),
      };
    } catch (err) {
      console.error("Error querying Azure pricing API:", err);
      return null;
    }
  }

  private async getStoragePricePerGB(
    region: string,
    storageTier: string,
    redundancy: string
  ): Promise<number | null> {
    const filter = encodeURIComponent(
      `serviceName eq 'Storage' and armRegionName eq '${region}' and productName eq 'Blob Storage' and skuName eq '${storageTier} ${redundancy}' and contains(meterName, 'Data Stored')`
    );
    const response = await axios.get(`${this.pricingApiUrl}?$filter=${filter}`);
    const priceItems = response.data.Items;
    if (priceItems && priceItems.length > 0) {
      const item = priceItems[0];
      return parseFloat(item.retailPrice);
    }
    return null;
  }

  async getVmPricing(params: VmPricingParams): Promise<any | null> {
    try {
      const baseFilter = `serviceName eq 'Virtual Machines' and armRegionName eq '${params.region}' and armSkuName eq '${params.vmSize}' and contains(productName, '${params.osType}')`;
      const fullFilter = encodeURIComponent(baseFilter);

      const response = await axios.get(
        `${this.pricingApiUrl}?$filter=${fullFilter}`
      );
      const priceItems = response.data.Items;

      if (!priceItems || priceItems.length === 0) {
        console.error("No pricing found for VM with provided parameters.");
        return null;
      }

      const vmItem = priceItems[0];
      const unitPrice = parseFloat(vmItem.retailPrice);
      const unitOfMeasure = vmItem.unitOfMeasure;

      return {
        region: params.region,
        vmSize: params.vmSize,
        osType: params.osType,
        savingPlanApplied: !!params.savingPlan,
        unitPrice,
        unitOfMeasure,
      };
    } catch (error) {
      console.error("Error fetching VM pricing:", error);
      return null;
    }
  }
}
