import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from "react";
import { getAllAvailableDBEngineNames } from '../../utils/Mappers/dbEngineMapper';
import { getAllAvailableDBInstanceTypes } from '../../utils/Mappers/dbInstanceTypeMapper';
import { getAllAvailableLoadBalancerTypes } from '../../utils/Mappers/loadBalancerMapper';
import { getAllAvailableObjectStorageClasses } from '../../utils/Mappers/objectStorageMapper';
import { getAllAvailableOSNames } from '../../utils/Mappers/osMapper';
import { getAllAvailableLocations } from '../../utils/Mappers/regionMapper';
import { getAllAvailableInstanceCategories } from '../../utils/Mappers/typeMapper';
import ResourceModal from '../resource-modal'; // Import the ResourceModal component
import MultipleSelectChip from './multi-select'; // Import the MultipleSelectChip component
import {IBaseService} from '../../interfaces/canvas'; // Import the interface for base service
import { getAllAvailableVMInstanceCategories } from '../../utils/Mappers/vmInstanceTypeMapper';

import type { JSX } from 'react';


import {
  askOptimalChoices,
  parseGeminiRecommendation,
} from '../../utils/recommendation';
import { Button } from '../ui/button/button';
import "./index.scss";// Adjust the import path as needed
import { CloudProvider } from '../../interfaces/canvas';
import { IResource } from '../../services/resourceService';

'use client';

export enum ServiceType  {
  VPC = "Vpc",
  SUBNET = 'Subnet',
  LB = 'LoadBalancer',
  VM = 'VirtualMachine',
  DATABASE = 'Database',
  OBJECT_STORAGE = 'ObjectStorage'
}

 
function mapServiceNameToServiceType(serviceName: string): ServiceType  {
  switch (serviceName) {
    case 'Virtual Machine':
      return ServiceType.VM;
    case 'Object Storage':
      return ServiceType.OBJECT_STORAGE;
    case 'Load Balancer':
      return ServiceType.LB;
    case 'Database':
      return ServiceType.DATABASE;
    case 'Vpc':
      return ServiceType.VPC;
    case 'Subnet':
      return ServiceType.SUBNET;
    default:
      return ServiceType.SUBNET; // Return null if the service name doesn't match any enum value
  }
}


interface ServicePopupProps {
  service: { name: string; icon: JSX.Element };
  // onConfirm: (
    //   resourceInfo: {
      //     instanceType?: string;
      //     vmInstanceType?: string;
      //     region?: string;
      //     os?: string;
      //     pricing?: any;
      //     cloud?: string;
      //     storageClass?: any;
      //     lbType?: any;
      //     dbInstanceType?: string;
      //     engine?: any;
      //   },
      //   type: string,
  //   selectedCloud: string,
  // ) => Promise<void>;
  onConfirm: (selectedService: any) => Promise<void>;
  onCancel: () => void;
  availableVPCs: IBaseService[];
  availableSubnets: IBaseService[];
  availableSource?: IBaseService[];
  pricingOptions: any[];
  instanceTypes?: { id: string; name: string }[];
  regions?: { id: string; name: string }[];
  oses?: string[];
  storageClasses?: string[];
  lbTypes?: string[];
  dbInstanceTypes?: string[];
  dbEngines?: string[];
}

export default function ServicePopup({
  service,
  onConfirm,
  availableVPCs,
  availableSubnets,
  availableSource,
  onCancel,
}: ServicePopupProps) {
  const [selectedVPC, setSelectedVPC] = useState<string>('');
  const [selectedSubnet, setSelectedSubnet] = useState<string>('');
  const [selectedPricing, setSelectedPricing] = useState<string>('');
  const [selectedInstanceType, setSelectedInstanceType] = useState<string>('');
  const [selectedVmInstanceType, setSelectedVmInstanceType] =
  useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedOS, setSelectedOS] = useState<string>('');
  const [selectedName, setSelectedName] = useState<string>('');
  const [selectedStorageClass, setSelectedStorageClass] = useState<string>('');
  const [selectedLBType, setSelectedLBType] = useState<string>('');
  const [selectedDBInstanceType, setSelectedDBInstanceType] =
  useState<string>('');
  const [selectedDBEngine, setSelectedDBEngine] = useState<string>('');
  const [selectedRedundancy, setSelectedRedundancy] = useState<string>('');
  const [recommendation, setRecommendation] = useState<string>('');
  const [selectedCloudProvider, setSelectedCloudProvider] = useState<CloudProvider | ''>('');
  const [currentPage, setCurrentPage] = useState<'form' | 'price-comparison'>(
    'form',
  );
  const [formData, setFormData] = useState<any>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showValidation, setShowValidation] = useState(false);
  const [shakingFields, setShakingFields] = useState<string[]>([]);
  
  const [selectedConnections, setSelectedConnections] = useState<string[]>([]);
  const projectId = sessionStorage.getItem('selectedProjectId');
  console.log('service popup Project ID:', projectId);
  
  useEffect(() => {
    setRecommendation(
      `Based on your app context, click here to get optimal cost and performance for "${service.name}".`,
    );
  }, [service]);

//   const handleConfirm = async () => {
//     if (selectedCloud && addressRange) {
//         const resourceMap: Record<string, (name: string, cloud: string, cidr: string) => Promise<any>> = {
//             VPC: createVPC,
//             Subnet: (name, cloud, cidr) => createSubnet(name, "default-vpc", cloud, cidr),
//         };

//         const resourceType = services.find((s) => s.name === service.name)?.name; // Match service name with the list

//         if (resourceType && resourceMap[resourceType]) {
//             try {
//                 const response = await resourceMap[resourceType]("default-resource", selectedCloud, addressRange); // Call the appropriate function
//                 console.log(`${resourceType} created:`, response); // Log the response for debugging
//                 onConfirm(response.id, "default-subnet"); // Pass the resource ID to onConfirm
//             } catch (error) {
//                 console.error(`Error creating ${resourceType}:`, error); // Handle errors
//             }
//         } else {
//             console.error(`Unsupported resource type: ${service.name}`);
//         }
//     }
// };

  const handleNext = () => {
    setShowValidation(true);

    const errors: Record<string, string> = {};
    const fieldsToShake: string[] = [];

    if (service.name === 'Virtual Machine') {
      if (!selectedVmInstanceType) {
        errors.instanceType = 'Please select an instance type';
        fieldsToShake.push('instanceType');
      }
      if (!selectedRegion) {
        errors.region = 'Please select a region';
        fieldsToShake.push('region');
      }
      if (!selectedOS) {
        errors.os = 'Please select an operating system';
        fieldsToShake.push('os');
      }
    } else if (service.name === 'Object Storage') {
      if (!selectedRegion) {
        errors.region = 'Please select a region';
        fieldsToShake.push('region');
      } 
      if (!selectedStorageClass) {
        errors.storageClass = 'Please select a storage class';
        fieldsToShake.push('storageClass');
      }
    } else if (service.name === 'Load Balancer') {
      if (!selectedRegion) {
        errors.region = 'Please select a region';
        fieldsToShake.push('region');
      }
      if (!selectedLBType) {
        errors.lbType = 'Please select a load balancer type';
        fieldsToShake.push('lbType');
      }
    } else if (service.name === 'Database') {
      if (!selectedRegion) {
        errors.region = 'Please select a region';
        fieldsToShake.push('region');
      }
      if (!selectedDBInstanceType) {
        errors.dbInstanceType = 'Please select a database instance type';
        fieldsToShake.push('dbInstanceType');
      }
      if (!selectedDBEngine) {
        errors.dbEngine = 'Please select a database engine';
        fieldsToShake.push('dbEngine');
      }
    } else if (service.name === 'Vpc' || service.name === 'Subnet') {
      if (!selectedRegion) {
        errors.region = 'Please select a region';
        fieldsToShake.push('region');
      }
    }

    if(service.name !== 'Object Storage' && service.name !== 'Vpc' && service.name !== 'Subnet') {
     
      if (!selectedSubnet) {  
        errors.subnet = 'Please select a subnet';
        fieldsToShake.push('subnet');
      }
    }
    if(service.name === 'Subnet') {
       if (!selectedVPC) { 
        errors.vpc = 'Please select a VPC';
        fieldsToShake.push('vpc');
      } 
    }
    if (service.name === 'Vpc') {
      if (!selectedCloudProvider) {
        errors.cloudProvider = 'Please select a cloud provider';
        fieldsToShake.push('cloudProvider');
      }
    }
    if (!selectedName) {
      errors.name = 'Please enter a name';
      fieldsToShake.push('name');
    }
    setFormErrors(errors);

    // Trigger shaking animation
    setShakingFields(fieldsToShake);
    setTimeout(() => {
      setShakingFields([]);
    }, 500);

    if (Object.keys(errors).length === 0) {
      const data = {
        service: service.name,
        ...(service.name === 'Virtual Machine' && {
          vmInstanceType: selectedVmInstanceType,
          region: selectedRegion,
          os: selectedOS,
        }),
        ...(service.name === 'Object Storage' && {
          region: selectedRegion,
          storageClass: selectedStorageClass,
        }),
        ...(service.name === 'Load Balancer' && {
          region: selectedRegion,
          lbType: selectedLBType,
        }),
        ...(service.name === 'Database' && {
          region: selectedRegion,
          instanceType: selectedDBInstanceType,
          databaseEngine: selectedDBEngine,
        }),
      };

      setFormData(data);
      if(service.name === 'Vpc' || service.name === 'Subnet') {
        const findCloudProvider = availableVPCs.find(vpc => vpc._id === selectedVPC)?.cloudProvider || CloudProvider.AZURE;
        handleConfirm(selectedCloudProvider || findCloudProvider, 500); // Default pricing for VPC and Subnet
      } else {

        setCurrentPage('price-comparison');
      }
    }
  };

  const handleConfirm = async(selectedCloud: CloudProvider, pricing: any) => {
    const data = prepereDataForSave();
    console.log('handleConfirm selected connections', data.connectedTo);
    data.cloudProvider = selectedCloud;
     // Assuming cloud provider is passed as a parameter
    if (service.name === 'Virtual Machine') {
      data.extraData.instanceType = selectedInstanceType,
      data.extraData.region = selectedRegion,
      data.extraData.os = selectedOS,
      data.extraData.pricing = pricing
      } else if (service.name === 'Object Storage') {
      data.extraData.region = selectedRegion,
      data.extraData.storageClass = selectedStorageClass,
      data.extraData.pricing = pricing
      
    } else if (service.name === 'Load Balancer') {
        data.extraData.region = selectedRegion,
        data.extraData.lbType = selectedLBType,
        data.extraData.pricing = pricing
      } else if (service.name === 'Database') {
        data.extraData.region = selectedRegion,
        data.extraData.dbInstanceType = selectedDBInstanceType,
        data.extraData.engine = selectedDBEngine,
        data.extraData.pricing = pricing
      } else if (service.name === 'Vpc') {
        data.parentId = undefined;
        data.extraData.region = selectedRegion
      } else if (service.name === 'Subnet') {
        data.parentId = selectedVPC; // Assuming VPC is the parent for Subnet
        data.extraData.region = selectedRegion
      }

      console.log('connected to', selectedConnections);
    await onConfirm(data);
  };


  const prepereDataForSave = useCallback(() => { 
      const type = mapServiceNameToServiceType(service.name)
      const data: IResource = {
        type: type,
        cloudProvider: CloudProvider.AZURE, // Assuming Azure as default, can be parameterized
        parentId: type != ServiceType.SUBNET && type != ServiceType.VPC ?  selectedSubnet : undefined,
        name: selectedName,
        connectedTo: selectedConnections, // Assuming no connections for now, can be updated later
        extraData: {},
        projectId: projectId ? projectId : 'default-project-id', // Use sessionStorage or a default value
      };
  
      if (service.name === 'Virtual Machine') {
        data.extraData.instanceType = selectedInstanceType;
        data.extraData.os = selectedOS;
      } else if (service.name === 'Object Storage') {
        data.extraData.storageClass = selectedStorageClass;
      } else if (service.name === 'Load Balancer') {
        data.extraData.lbType = selectedLBType;
      } else if (service.name === 'Database') {
        data.extraData.dbInstanceType = selectedDBInstanceType;
        data.extraData.dbEngine = selectedDBEngine;
      }
  
      console.log('data.connected to', data.connectedTo  );
      return data;
   },[selectedSubnet, service, projectId, selectedInstanceType, selectedOS, selectedStorageClass, selectedLBType, selectedDBInstanceType, selectedDBEngine, selectedName, selectedConnections]);

  const isFormValid = () => {
    if (service.name === 'Virtual Machine') {
      return selectedVmInstanceType && selectedRegion && selectedOS;
    } else if (service.name === 'Object Storage') {
      return selectedRegion && selectedStorageClass;
    } else if (service.name === 'Load Balancer') {
      return selectedRegion && selectedLBType;
    } else if (service.name === 'Database') {
      return selectedRegion && selectedDBInstanceType && selectedDBEngine;
    }
    return false;
  };

  return (
    <div className="popup-overlay">
      <AnimatePresence mode="wait">
        {currentPage === 'form' ? (
          <motion.div
            key="form"
            className="popup-content"
            initial={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
          >
            {
              service.name !== 'Vpc' && service.name !== 'Subnet' && (
                <div className="popup-recommendation">
              <div className="chatbot-icon">🤖</div>
              <button
                className="popup-button ai"
                style={{ background: 'none' }}
                onClick={async () => {
                  const answer = await askOptimalChoices(service.name);
                  const parsed = parseGeminiRecommendation(
                    answer?.message ?? '',
                  );
                  if (parsed) {
                    try {
                      if (service.name === 'Virtual Machine') {
                        setSelectedVmInstanceType(parsed.type || '');
                        setSelectedRegion(parsed.region || '');
                        setSelectedOS(parsed.os || '');
                      } else if (service.name === 'Object Storage') {
                        setSelectedRegion(parsed.region || '');
                        setSelectedStorageClass(parsed.storageClass || '');
                      } else if (service.name === 'Load Balancer') {
                        setSelectedRegion(parsed.region || '');
                        setSelectedLBType(parsed.lbType || '');
                      } else if (service.name === 'Database') {
                        setSelectedRegion(parsed.region || '');
                        setSelectedDBInstanceType(parsed.dbType || '');
                        setSelectedDBEngine(parsed.dbEngine || '');
                      }

                      setRecommendation(
                        `Optimal choices for "${service.name}" have been set.`,
                      );
                    } catch (e) {
                      if (e instanceof Error) {
                        setRecommendation(e.message);
                      } else {
                        setRecommendation(String(e));
                      }
                    }
                  }
                }}
              >
                <p>{recommendation}</p>
              </button>
            </div>
              )
            }
            <div className="popup-service">
              <div className="popup-service-icon">{service.icon}</div>
              <div className="popup-service-name">{service.name}</div>
            </div>
            {
              <>
              <div className="popup-selection">
                        <label>Name:</label>
                        <input
                          type="text"
                          value={selectedName}
                          onChange={(e) => setSelectedName(e.target.value)}
                          className={`${showValidation && formErrors.name ? 'error' : ''} ${
                            shakingFields.includes('name') ? 'shake' : ''
                          }`}
                          placeholder="Enter a name"
                        />
                        {showValidation && formErrors.name && (
                          <div className="error-message">{formErrors.name}</div>
                        )}
                      </div>
              </>
            }
            {
              service.name === 'Vpc' && (
                <>
      <div className="popup-selection">
        <label>Cloud Provider:</label>
        <select
          value={selectedCloudProvider}
          onChange={(e) => setSelectedCloudProvider(e.target.value as CloudProvider)}
          className={`${showValidation && formErrors.cloudProvider ? 'error' : ''} ${
            shakingFields.includes('cloudProvider') ? 'shake' : ''
          }`}
        >
          <option value="">-- Select Cloud Provider --</option>
          {Object.values(CloudProvider).map((provider) => (
            <option key={provider} value={provider}>
              {provider}
            </option>
          ))}
        </select>
        {showValidation && formErrors.cloudProvider && (
          <div className="error-message">{formErrors.cloudProvider}</div>
        )}
      </div>
    </>
              )
            }
            {
              service.name === 'Subnet' && (
                
                       
                      <div className="popup-selection">
                        <label>Vpc:</label>
                        <select
                          value={selectedVPC}
                          onChange={(e) => setSelectedVPC(e.target.value)}
                          className={`${showValidation && formErrors.vpc ? 'error' : ''} ${
                            shakingFields.includes('vpc') ? 'shake' : ''
                          }`}
                        >
                          <option value="">-- Select Vpc --</option>
                          {availableVPCs.map((vpc) => (
                            <option key={vpc._id} value={vpc._id}>
                              {vpc.name}
                            </option>
                          ))}
                        </select>
                        {showValidation && formErrors.vpc && (
                          <div className="error-message">{formErrors.vpc}</div>
                        )}
                      </div>
              )
            }
                {
                  service.name !== 'Object Storage' && service.name !== 'Vpc' && service.name !== 'Subnet' && (
                    
                      <div className="popup-selection">
                        <label>Subnet:</label>
                        <select
                          value={selectedSubnet}
                          onChange={(e) => setSelectedSubnet(e.target.value)}
                          className={`${showValidation && formErrors.subnet ? 'error' : ''} ${
                            shakingFields.includes('subnet') ? 'shake' : ''
                          }`}
                        >
                          <option value="">-- Select Subnet --</option>
                          {availableSubnets.map((subnet) => (
                            <option key={subnet._id} value={subnet._id}>
                              {subnet.name}
                            </option>
                          ))}
                        </select>
                        {showValidation && formErrors.subnet && (
                          <div className="error-message">{formErrors.subnet}</div>
                        )}
                      </div>
                    
                  )
                }

                {
                  service.name !== 'Vpc' && service.name !== 'Subnet' && (
                    <MultipleSelectChip
  availableSource={availableSource}
  selectedConnections={selectedConnections}
  setSelectedConnections={setSelectedConnections}
/>
                  )
                }
            {service.name === 'Virtual Machine' && (
              
              <>
                <div className="popup-selection">
                  <label>Instance Type:</label>
                  <select
                    value={selectedVmInstanceType}
                    onChange={(e) => setSelectedVmInstanceType(e.target.value)}
                    className={`text-center ${showValidation && formErrors.vmInstanceType ? 'error' : ''} ${
                      shakingFields.includes('vmInstanceType') ? 'shake' : ''
                    }`}
                  >
                    <option value="">-- Select Instance Type --</option>
                    {getAllAvailableVMInstanceCategories().map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {showValidation && formErrors.vmInstanceType && (
                    <div className="error-message">
                      {formErrors.vmInstanceType}
                    </div>
                  )}
                </div>
                <div className="popup-selection">
                  <label>Region:</label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className={`text-center ${showValidation && formErrors.region ? 'error' : ''} ${
                      shakingFields.includes('region') ? 'shake' : ''
                    }`}
                  >
                    <option value="">-- Select Region --</option>
                    {getAllAvailableLocations().map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  {showValidation && formErrors.region && (
                    <div className="error-message">{formErrors.region}</div>
                  )}
                </div>
                <div className="popup-selection">
                  <label>Operating System:</label>
                  <select
                    value={selectedOS}
                    onChange={(e) => setSelectedOS(e.target.value)}
                    className={`text-center ${showValidation && formErrors.os ? 'error' : ''} ${
                      shakingFields.includes('os') ? 'shake' : ''
                    }`}
                  >
                    <option value="">-- Select OS --</option>
                    {getAllAvailableOSNames().map((os) => (
                      <option key={os} value={os}>
                        {os}
                      </option>
                    ))}
                  </select>
                  {showValidation && formErrors.os && (
                    <div className="error-message">{formErrors.os}</div>
                  )}
                </div>
              </>
            )}

            {service.name === 'Object Storage' && (
              <>
                <div className="popup-selection">
                  <label>Region:</label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className={`text-center ${showValidation && formErrors.region ? 'error' : ''} ${
                      shakingFields.includes('region') ? 'shake' : ''
                    }`}
                  >
                    <option value="">-- Select Region --</option>
                    {getAllAvailableLocations().map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  {showValidation && formErrors.region && (
                    <div className="error-message">{formErrors.region}</div>
                  )}
                </div>
                <div className="popup-selection">
                  <label>Storage Class:</label>
                  <select
                    value={selectedStorageClass}
                    onChange={(e) => setSelectedStorageClass(e.target.value)}
                    className={`text-center ${showValidation && formErrors.storageClass ? 'error' : ''} ${
                      shakingFields.includes('storageClass') ? 'shake' : ''
                    }`}
                  >
                    <option value="">-- Select Storage Class --</option>
                    {getAllAvailableObjectStorageClasses().map((sc) => (
                      <option key={sc} value={sc}>
                        {sc}
                      </option>
                    ))}
                  </select>
                  {showValidation && formErrors.storageClass && (
                    <div className="error-message">
                      {formErrors.storageClass}
                    </div>
                  )}
                </div>
              </>
            )}

            {service.name === 'Load Balancer' && (
              <>
                <div className="popup-selection">
                  <label>Region:</label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className={`text-center ${showValidation && formErrors.region ? 'error' : ''} ${
                      shakingFields.includes('region') ? 'shake' : ''
                    }`}
                  >
                    <option value="">-- Select Region --</option>
                    {getAllAvailableLocations().map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  {showValidation && formErrors.region && (
                    <div className="error-message">{formErrors.region}</div>
                  )}
                </div>
                <div className="popup-selection">
                  <label>Load Balancer Type:</label>
                  <select
                    value={selectedLBType}
                    onChange={(e) => setSelectedLBType(e.target.value)}
                    className={`text-center ${showValidation && formErrors.lbType ? 'error' : ''} ${
                      shakingFields.includes('lbType') ? 'shake' : ''
                    }`}
                  >
                    <option value="">-- Select Type --</option>
                    {getAllAvailableLoadBalancerTypes().map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {showValidation && formErrors.lbType && (
                    <div className="error-message">{formErrors.lbType}</div>
                  )}
                </div>
              </>
            )}

            {service.name === 'Database' && (
              <>
                <div className="popup-selection">
                  <label>Region:</label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className={`text-center ${showValidation && formErrors.region ? 'error' : ''} ${
                      shakingFields.includes('region') ? 'shake' : ''
                    }`}
                  >
                    <option value="">-- Select Region --</option>
                    {getAllAvailableLocations().map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  {showValidation && formErrors.region && (
                    <div className="error-message">{formErrors.region}</div>
                  )}
                </div>
                <div className="popup-selection">
                  <label>DB Instance Type:</label>
                  <select
                    value={selectedDBInstanceType}
                    onChange={(e) => setSelectedDBInstanceType(e.target.value)}
                    className={`text-center ${showValidation && formErrors.dbInstanceType ? 'error' : ''} ${
                      shakingFields.includes('dbInstanceType') ? 'shake' : ''
                    }`}
                  >
                    <option value="">-- Select Type --</option>
                    {getAllAvailableDBInstanceTypes().map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {showValidation && formErrors.dbInstanceType && (
                    <div className="error-message">
                      {formErrors.dbInstanceType}
                    </div>
                  )}
                </div>
                <div className="popup-selection">
                  <label>DB Engine:</label>
                  <select
                    value={selectedDBEngine}
                    onChange={(e) => setSelectedDBEngine(e.target.value)}
                    className={`text-center ${showValidation && formErrors.dbEngine ? 'error' : ''} ${
                      shakingFields.includes('dbEngine') ? 'shake' : ''
                    }`}
                  >
                    <option value="">-- Select Engine --</option>
                    {getAllAvailableDBEngineNames().map((engine) => (
                      <option key={engine} value={engine}>
                        {engine}
                      </option>
                    ))}
                  </select>
                  {showValidation && formErrors.dbEngine && (
                    <div className="error-message">{formErrors.dbEngine}</div>
                  )}
                </div>
              </>
            )}
            {
  (service.name === 'Vpc' || service.name === 'Subnet') && (
    <>
      <div className="popup-selection">
        <label>Region:</label>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className={`${showValidation && formErrors.region ? 'error' : ''} ${
            shakingFields.includes('region') ? 'shake' : ''
          }`}
        >
          <option value="">-- Select Region --</option>
          {getAllAvailableLocations().map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        {showValidation && formErrors.region && (
          <div className="error-message">{formErrors.region}</div>
        )}
      </div>
    </>
  )
}

            <div className="popup-actions">
              <Button onClick={handleNext}>{service.name == 'Vpc' || service.name == 'Subnet' ? 'Submit' : 'next'}</Button>
              <Button variant='destructive' onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="price-comparison"
            className="popup-content"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ResourceModal
              isOpen={currentPage === 'price-comparison'}
              onClose={() => {
                setCurrentPage('form');
              }}
              onConfirm={handleConfirm}
              selectedResourceName={service.name}
              resourceParams={formData}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
