import './index.scss';
import { useState, useEffect } from 'react';
import {
  getAllAvailableLocations,
  translateLocationToRegionCodes,
} from '../../utils/regionMapper';

import {
  translateInstanceTypeCategory,
  getAllAvailableInstanceCategories,
} from '../../utils/typeMapper';

import {
  translateOSTypeToCloudOptions,
  getAllAvailableOSNames,
} from '../../utils/osMapper';
import { set } from 'react-hook-form';

interface ServicePopupProps {
  service: { name: string; icon: JSX.Element };
  onConfirm: (params: any) => void;
  onCancel: () => void;
  availableVPCs: { id: string; name: string }[];
  availableSubnets: { id: string; name: string }[];
  pricingOptions: any[];
  instanceTypes?: { id: string; name: string }[];
  regions?: { id: string; name: string }[];
  oses?: string[];
  storageClasses?: string[];
}

interface RegionMapEntry {
  name: string;
  aws: string | string[];
  azure: string | string[];
}

export default function ServicePopup({
  service,
  onConfirm,
  onCancel,
  availableVPCs,
  availableSubnets,
  pricingOptions,
  instanceTypes = [],
  regions = [],
  oses = [],
  storageClasses = [],
}: ServicePopupProps) {
  const [selectedVPC, setSelectedVPC] = useState<string>('');
  const [selectedSubnet, setSelectedSubnet] = useState<string>('');
  const [selectedPricing, setSelectedPricing] = useState<string>('');
  const [selectedInstanceType, setSelectedInstanceType] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const [selectedOS, setSelectedOS] = useState<string>('');
  const [selectedStorageClass, setSelectedStorageClass] = useState<string>('');
  const [recommendation, setRecommendation] = useState<string>('');
  const [regionOptions, setRegionOptions] = useState<
    { id: string; name: string }[]
  >([]);

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    // const translation = translateLocationToRegionCodes(region, 'azure');
    // console.log('Region translation:', translation);
  };
  const handleInstanceTypeChange = (instanceType: string) => {
    setSelectedInstanceType(instanceType);
    // const translatedTypes = translateInstanceTypeCategory(instanceType, 'aws');
    // console.log('Translated instance types:', translatedTypes);
  };
  const handleOsChange = (os: string) => {
    setSelectedOS(os);
    // const translatedOS = translateOSTypeToCloudOptions(os, 'aws');
    // console.log('Translated OS:', translatedOS);
  };

  useEffect(() => {
    setRecommendation(
      `Based on your selection, we recommend using the "${service.name}" service for optimal cost and performance.`,
    );
  }, [service]);

  const handleConfirm = () => {
    if (service.name === 'Virtual Machine') {
      onConfirm({
        instanceType: selectedInstanceType,
        region: selectedRegion,
        os: selectedOS,
        pricing: selectedPricing,
      });
    } else if (service.name === 'Bucket') {
      onConfirm({
        vpc: selectedVPC,
        subnet: selectedSubnet,
        region: selectedRegion,
        storageClass: selectedStorageClass,
        pricing: selectedPricing,
      });
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-recommendation">
          <div className="chatbot-icon">🤖</div>
          <p>{recommendation}</p>
        </div>
        <h3>Confirm Add Service</h3>
        <div className="popup-service">
          <div className="popup-service-icon">{service.icon}</div>
          <div className="popup-service-name">{service.name}</div>
        </div>
        {service.name === 'Virtual Machine' && (
          <>
            <div className="popup-selection">
              <label htmlFor="instance-type-select">Instance Type:</label>
              <select
                id="instance-type-select"
                value={selectedInstanceType}
                onChange={(e) => handleInstanceTypeChange(e.target.value)}
              >
                <option value="">-- Select Instance Type --</option>
                {getAllAvailableInstanceCategories().map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="popup-selection">
              <label htmlFor="region-select">Region:</label>
              <select
                id="region-select"
                value={selectedRegion}
                onChange={(e) => handleRegionChange(e.target.value)}
              >
                <option value="">-- Select Region --</option>
                {getAllAvailableLocations().map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            <div className="popup-selection">
              <label htmlFor="os-select">Operating System:</label>
              <select
                id="os-select"
                value={selectedOS}
                onChange={(e) => handleOsChange(e.target.value)}
              >
                <option value="">-- Select OS --</option>
                {getAllAvailableOSNames().map((os) => (
                  <option key={os} value={os}>
                    {os}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        {service.name === 'Bucket' && (
          <>
            <div className="popup-selection">
              <label htmlFor="region-select">Region:</label>
              <select
                id="region-select"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="">-- Select Region --</option>
                {regionOptions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="popup-selection">
              <label htmlFor="storage-class-select">Storage Class:</label>
              <select
                id="storage-class-select"
                value={selectedStorageClass}
                onChange={(e) => setSelectedStorageClass(e.target.value)}
              >
                <option value="">-- Select Storage Class --</option>
                {storageClasses.map((sc) => (
                  <option key={sc} value={sc}>
                    {sc}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        <div className="popup-actions">
          <button
            className="popup-button confirm"
            onClick={handleConfirm}
            disabled={
              !selectedVPC ||
              !selectedSubnet ||
              !selectedPricing ||
              (service.name === 'Virtual Machine' &&
                (!selectedInstanceType || !selectedRegion || !selectedOS)) ||
              (service.name === 'Bucket' &&
                (!selectedRegion || !selectedStorageClass))
            }
          >
            Confirm
          </button>
          <button className="popup-button cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
