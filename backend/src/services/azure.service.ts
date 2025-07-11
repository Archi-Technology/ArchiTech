import axios from "axios";

export interface BlobPricingParams {
  region: string;
  storageTier: string;
  redundancy: string;
}

export interface VmPricingParams {
  region: string;
  instanceType: string;
  os: string;
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

      return {
        region: params.region,
        storageTier: params.storageTier,
        redundancy: params.redundancy,
        pricePerGbPerMonth: parseFloat(storagePricePerGB.toFixed(4)),
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
      return parseFloat(item.retailPrice.toFixed(4));
    }
    return null;
  }

  async getVmPricing(params: VmPricingParams): Promise<any[] | null> {
    try {
      let filter = `serviceName eq 'Virtual Machines' and armRegionName eq '${params.region}' and armSkuName eq '${params.instanceType}' and indexof(skuName, 'Low Priority') eq -1 and type ne 'DevTestConsumption'`;

      if (params.os.toLowerCase() === "linux") {
        filter += " and indexof(productName, 'Windows') eq -1";
      } else if (params.os.toLowerCase() === "windows") {
        filter += " and contains(productName, 'Windows')";
      }

      const fullFilter = encodeURIComponent(filter);

      const response = await axios.get(
        `${this.pricingApiUrl}?$filter=${fullFilter}`
      );

      const priceItems = response.data.Items;

      if (!priceItems || priceItems.length === 0) {
        console.error("No pricing found for VM with provided parameters.");
        return null;
      }

      let filteredItems = priceItems.filter(
        (item: any) => !item.effectiveEndDate
      ); //we only want active items

      let results = filteredItems.map((item: any, index: number) => {
        let pricePerHour = parseFloat(item.retailPrice);

        if (item.reservationTerm === "1 Year") {
          pricePerHour = pricePerHour / (365 * 24);
        } else if (item.reservationTerm === "3 Years") {
          pricePerHour = pricePerHour / (3 * 365 * 24);
        }

        return {
          id: index,
          region: params.region,
          instanceType: params.instanceType,
          productName: item.productName,
          pricePerHour: parseFloat(pricePerHour.toFixed(6)),
          os: params.os,
          reservationTerm: item.reservationTerm || null,
          spotInstance: item.meterName.includes("Spot") ? true : false,
          provider: "azure",
        };
      });

      return results;
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
        `serviceName eq 'Load Balancer' and unitOfMeasure eq '1 Hour' and skuName eq '${loadBalancerType}'`
      );

      const response = await axios.get(
        `${this.pricingApiUrl}?$filter=${filter}`
      );

      const items = response.data.Items;

      if (!items || items.length === 0) {
        console.warn("No pricing items found for Load Balancer.");
        return null;
      }

      return {
        region,
        lbType: loadBalancerType,
        pricePerHour: parseFloat(items[0].retailPrice.toFixed(4)),
      };
    } catch (err) {
      console.error("Error fetching Load Balancer pricing:", err);
      return null;
    }
  }

  async getSqlDbPricing(params: {
    region: string;
    skuName: string;
  }): Promise<any | null> {
    try {
      const filter = encodeURIComponent(
        `serviceName eq 'SQL Database' and armRegionName eq '${params.region}' and contains(skuName, '${params.skuName}') and type eq 'Consumption'`
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
        id: 0,
        provider: "azure",
        region: params.region,
        instanceType: price.productName,
        sku: params.skuName,
        pricePerHour: price.retailPrice,
      };
    } catch (error) {
      console.error("Error fetching SQL DB pricing:", error);
      return null;
    }
  }
}
