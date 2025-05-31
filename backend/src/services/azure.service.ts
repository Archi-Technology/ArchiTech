import axios from "axios";

export interface BlobPricingParams {
  region: string;
  storageTier: string;
  redundancy: string;
  dataStoredGB: number;
}

export interface VmPricingParams {
  region: string;
  vmSize: string;
  osType: string;
}

export interface SqlDbPricingParams {
  region: string;
  skuName: string;
  licenseType?: string;
  tier?: string;
}

export class AzureService {
  private pricingApiUrl = "https://prices.azure.com/api/retail/prices";

  async getBlobStoragePrice(params: BlobPricingParams): Promise<any | null> {
    try {
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

  async getAllRegions(): Promise<
    { regionCode: string; regionName: string }[] | null
  > {
    try {
      let allRegionsSet = new Set<string>();
      let regionsDetailsMap = new Map<string, string>();

      // We'll page through the pricing API to collect all unique regions
      let url = this.pricingApiUrl + "?$top=100";
      let done = false;

      while (!done) {
        const response = await axios.get(url);
        const items = response.data.Items;

        if (!items || items.length === 0) break;

        for (const item of items) {
          if (item.armRegionName) {
            allRegionsSet.add(item.armRegionName);
            if (!regionsDetailsMap.has(item.armRegionName) && item.region) {
              regionsDetailsMap.set(item.armRegionName, item.region);
            }
          }
        }

        if (response.data.NextPageLink) {
          url = response.data.NextPageLink;
        } else {
          done = true;
        }
      }

      const regions = Array.from(allRegionsSet).map((regionCode) => ({
        regionCode,
        // Use the friendly region name from pricing API if available, otherwise fallback to regionCode
        regionName: regionsDetailsMap.get(regionCode) ?? regionCode,
      }));

      return regions;
    } catch (err) {
      console.error("Error fetching Azure regions:", err);
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
        unitPrice,
        unitOfMeasure,
      };
    } catch (error) {
      console.error("Error fetching VM pricing:", error);
      return null;
    }
  }

  async getLoadBalancerPrice(
    region: string,
    loadBalancerType: string
  ): Promise<any | null> {
    try {
      if (loadBalancerType.toLowerCase() === "basic") {
        return {
          region,
          loadBalancerType,
          totalHourlyCost: 0,
          pricingDetails: [],
        };
      }

      const filter = encodeURIComponent(
        `serviceName eq 'Load Balancer' and skuName eq '${loadBalancerType}'`
      );

      const response = await axios.get(
        `${this.pricingApiUrl}?$filter=${filter}`
      );

      const items = response.data.Items;

      if (!items || items.length === 0) {
        console.warn("No pricing items found for Load Balancer.");
        return null;
      }

      const summarized = items.map((item: any) => ({
        skuName: item.skuName,
        meterName: item.meterName,
        retailPrice: item.retailPrice,
        unitOfMeasure: item.unitOfMeasure,
      }));

      const totalHourlyCost = items.reduce(
        (sum: number, item: any) => sum + item.retailPrice,
        0
      );

      return {
        region,
        loadBalancerType,
        totalHourlyCost: parseFloat(totalHourlyCost.toFixed(4)),
        pricingDetails: summarized,
      };
    } catch (err) {
      console.error("Error fetching Load Balancer pricing:", err);
      return null;
    }
  }

  async getSqlDbPricing(params: {
    region: string;
    skuName: string;
    productName: string;
  }): Promise<any | null> {
    try {
      const filter = encodeURIComponent(
        `serviceName eq 'SQL Database' and armRegionName eq '${params.region}' and contains(skuName, '${params.skuName}') and contains(productName, '${params.productName}') and type eq 'Consumption'`
      );

      const response = await axios.get(
        `${this.pricingApiUrl}?$filter=${filter}`
      );
      const items = response.data.Items;

      if (!items || items.length === 0) {
        console.warn("No SQL DB pricing found:", params);
        return null;
      }

      const price = items[0];
      return {
        region: params.region,
        sku: params.skuName,
        productName: params.productName,
        unitOfMeasure: price.unitOfMeasure,
        pricePerUnit: price.retailPrice,
      };
    } catch (error) {
      console.error("Error fetching SQL DB pricing:", error);
      return null;
    }
  }
}
