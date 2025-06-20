import { Request, Response } from "express";
import UserContextModel from "../models/userContext.model";
import mongoose from "mongoose";
import { exractUserIdFromToken } from "../utils/user.util";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { IVpcAndSubnet, ResourceService } from "../services/resource.service";
import { IResource } from "../models/resource.model";
import { ServiceType } from "../types/enums/service";

class TerraformController {
  private genAI: GoogleGenerativeAI;
  private service: ResourceService;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    this.service = new ResourceService();
  }

  async generateterraform(req: Request, res: Response) {
    const { resourceId } = req.body;

    try {
      if (!resourceId) {
        throw new Error("No resourceId provided");
      }
      const resource =  await this.service.getById(resourceId);
      let vpcAndSubnet: IVpcAndSubnet | undefined = undefined;
      if(resource.type !== ServiceType.OBJECT_STORAGE) {
         vpcAndSubnet = await this.service.getVpcAndSubnetOfResourceId(resourceId);
      }
      
       const terraformPrompt = getterraformPrompt(resource, vpcAndSubnet?.subnet?.name, vpcAndSubnet?.vpc?.name);
      
      if (!terraformPrompt.trim()) throw new Error("No terraform prompt generated for the resource");
      const model = this.genAI.getGenerativeModel({
        model: "gemini-1.5-flash", // or gemini-1.5-pro-latest
      });

      const chat = model.startChat({
        generationConfig: {
          temperature: 0.7,
        },
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ],
      });

      console.log(terraformPrompt)
      // Ask the model the current question
      const result = await chat.sendMessage(terraformPrompt);
      const answer = result.response.text() || "failed to generate terraform.";
  
      res.status(200).json({ answer });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export const terraformController = new TerraformController();


const getterraformPrompt =  (resource: IResource, subnetName?: string, vpcName?: string) => {
  const resourceType = resource.type.toLowerCase();
  switch (resourceType) {
    case "vpc": return vpcPrompt(resource);
    case "subnet":return subnetPrompt(resource, vpcName!!);
    case "database": return dbPrompt(resource, subnetName!!, vpcName!!);
    case "virtualmachine": return vmPrompt(resource, subnetName!!, vpcName!!);
    case "loadbalancer": return loadBalancerPrompt(resource, subnetName!!, vpcName!!);
    case "objectstorage":  return objectStoragePrompt(resource);   
    default: return ``  
}}

const vmPrompt = (resource: IResource, subnetName: string, vpcName: string) => {
  return `Generate Terraform code to create a Virtual Machine.

Cloud Provider: ${resource.cloudProvider}
Region: ${resource.extraData.region}

Use defaults for missing values.
Only generate VM and directly required networking/storage resources.
Mark clearly where user input is needed (e.g., <<REPLACE_WITH_SUBNET_ID>>).

Parameters:
- VM Name: ${resource.name}
- OS: ${resource.extraData.os || "default"}
- Instance Type: ${resource.extraData.instanceType || "default"}
- Subnet Name: ${subnetName}
- Public IP: true 
- SSH Public Key: default
- VPC Name: ${vpcName}

consider that the answer will display as it so do not add any additional text or explanation, just the terraform code.
`
}


const dbPrompt = (resource: IResource, subnetName: string, vpcName: string) => {
  return `Generate Terraform code to create a managed Database instance.

Cloud Provider: ${resource.cloudProvider}
Region: ${resource.extraData.region}

Use default resources and values where input is missing.
Only generate the database, subnet group/network, and security rules if required.
Mark clearly where user input is needed (e.g., <<REPLACE_WITH_SUBNET_ID>>).

Parameters:
- Engine: ${resource.extraData.dbEngine || "default"}
- Version: default to latest stable
- DB Name: ${resource.name}
- Instance Type: ${resource.extraData.dbInstanceType || "default"}
- Username: default
- Password: generate using random_password
- Public Access: true
- Subnet IDs or Network Info: ${subnetName}
- VPC / Resource Group: ${vpcName}

consider that the answer will display as it so do not add any additional text or explanation, just the terraform code.
`
}

const loadBalancerPrompt = (resource: IResource, subnetName: string, vpcName: string) => {
  return `Generate Terraform code to create a Load Balancer.

  Cloud Provider: ${resource.cloudProvider}
  Region: ${resource.extraData.region}

  Use defaults for missing values.
  Only include the LB, listener, target group (or backend service), and required networking.
  Mark clearly where user input is needed (e.g., <<REPLACE_WITH_SUBNET_ID>>).

  Parameters:
  - LB Type: ${resource.extraData.lbType || "default"}
  - Protocol: default to HTTP
  - Listener  default to port 80
  - Backend Port(s): – attach placeholder if none given>>
  - Subnet IDs or Names: ${subnetName}
  - VPC / Network: ${vpcName}
  - Backend targets: <<OPTIONAL – attach placeholder if none given>>
  consider that the answer will display as it so do not add any additional text or explanation, just the terraform code.
`
}

const objectStoragePrompt = (resource: IResource) => {
  return `Generate Terraform code to create a storage bucket or blob container.

      Cloud Provider: ${resource.cloudProvider}
      Region: ${resource.extraData.region}

      Use only the relevant storage resources.
      Use default settings where values are missing.
        Mark clearly where user input is needed (e.g., <<REPLACE_WITH_SUBNET_ID>>).

      Parameters:
      - Bucket/Container Name: ${resource.name}
      - storage Class: ${resource.extraData.storageClass || "default"}
      - Access: public
      - Versioning: true
      - Lifecycle Rules: default
      - Resource Group / Project ID: <<REPLACE_IF_NEEDED>>
  consider that the answer will display as it so do not add any additional text or explanation, just the terraform code.
`
}

const subnetPrompt = (resource: IResource, vpcName: string) => {
  return `Generate Terraform code to create a subnet.

      Cloud Provider: ${resource.cloudProvider}
      Region: ${resource.extraData.region}

      Only generate the subnet and its directly related dependencies if required.
      Use default values where parameters are missing.
      Mark clearly where input is needed (e.g., <<REPLACE_WITH_VPC_NAME>>).

      Parameters:
      - Subnet Name: ${resource.name}
      - CIDR Block: <<REPLACE_WITH_CIDR_BLOCK>>
      - VPC / Virtual Network Name: ${vpcName}
      - Availability Zone: default 
      - Resource Group (Azure): <<REPLACE_IF_AZURE>>
      - Auto-assign Public IP (AWS): true
      - Secondary IP range (GCP only): <<OPTIONAL>>
  consider that the answer will display as it so do not add any additional text or explanation, just the terraform code.
`
}


const vpcPrompt = (resource: IResource) => {
  return `Generate Terraform code to create a virtual network.

      Cloud Provider: ${resource.cloudProvider}
      Region: ${resource.extraData.region}

     Use default values where possible.
    Generate only the relevant resources to create the network.
    Mark clearly where user input is required (e.g., <<REPLACE_WITH_NAME>>).

      Parameters:
      - VPC/VNet Name: ${resource.name}
      - CIDR Block: <<REPLACE_WITH_CIDR>> (e.g., 10.0.0.0/16)
      - Enable DNS support: true (AWS)
      - Resource Group (Azure only): <<REPLACE_IF_AZURE>>
      - Auto-create default route table or tags: no
  consider that the answer will display as it so do not add any additional text or explanation, just the terraform code.
`
}