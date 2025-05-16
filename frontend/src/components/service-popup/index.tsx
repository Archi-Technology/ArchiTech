import './index.scss';
import { useState, useEffect } from 'react';
import {
  getAllAvailableLocations,
  translateLocationToRegionCodes,
} from '../../utils/Mappers/regionMapper';

import {
  translateInstanceTypeCategory,
  getAllAvailableInstanceCategories,
} from '../../utils/Mappers/typeMapper';

import {
  translateOSTypeToCloudOptions,
  getAllAvailableOSNames,
} from '../../utils/Mappers/osMapper';

import {
  translateStorageClassToCloudOptions,
  getAllAvailableObjectStorageClasses,
} from '../../utils/Mappers/objectStorageMapper';

import {
  translateLoadBalancerTypeToCloudOptions,
  getAllAvailableLoadBalancerTypes,
} from '../../utils/Mappers/loadBalancerMapper';

import {
  translateDBInstanceTypeToCloudOptions,
  getAllAvailableDBInstanceTypes,
} from '../../utils/Mappers/dbInstanceTypeMapper';

import {
  translateDBEngineToCloudOptions,
  getAllAvailableDBEngineNames,
} from '../../utils/Mappers/dbEngineMapper';

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
  lbTypes?: string[];
  dbInstanceTypes?: string[];
  dbEngines?: string[];
}

export default function ServicePopup({
  service,
  onConfirm,
  onCancel,
}: ServicePopupProps) {
  const [selectedVPC, setSelectedVPC] = useState<string>('');
  const [selectedSubnet, setSelectedSubnet] = useState<string>('');
  const [selectedPricing, setSelectedPricing] = useState<string>('');
  const [selectedInstanceType, setSelectedInstanceType] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedOS, setSelectedOS] = useState<string>('');
  const [selectedStorageClass, setSelectedStorageClass] = useState<string>('');
  const [selectedLBType, setSelectedLBType] = useState<string>('');
  const [selectedDBInstanceType, setSelectedDBInstanceType] =
    useState<string>('');
  const [selectedDBEngine, setSelectedDBEngine] = useState<string>('');
  const [recommendation, setRecommendation] = useState<string>('');

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
    } else if (service.name === 'Object Storage') {
      onConfirm({
        region: selectedRegion,
        storageClass: selectedStorageClass,
        pricing: selectedPricing,
      });
    } else if (service.name === 'Load Balancer') {
      onConfirm({
        region: selectedRegion,
        lbType: selectedLBType,
        pricing: selectedPricing,
      });
    } else if (service.name === 'Database') {
      onConfirm({
        region: selectedRegion,
        dbInstanceType: selectedDBInstanceType,
        engine: selectedDBEngine,
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
              <label>Instance Type:</label>
              <select
                value={selectedInstanceType}
                onChange={(e) => setSelectedInstanceType(e.target.value)}
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
              <label>Region:</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
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
              <label>Operating System:</label>
              <select
                value={selectedOS}
                onChange={(e) => setSelectedOS(e.target.value)}
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

        {service.name === 'Object Storage' && (
          <>
            <div className="popup-selection">
              <label>Region:</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
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
              <label>Storage Class:</label>
              <select
                value={selectedStorageClass}
                onChange={(e) => setSelectedStorageClass(e.target.value)}
              >
                <option value="">-- Select Storage Class --</option>
                {getAllAvailableObjectStorageClasses().map((sc) => (
                  <option key={sc} value={sc}>
                    {sc}
                  </option>
                ))}
              </select>
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
              <label>Load Balancer Type:</label>
              <select
                value={selectedLBType}
                onChange={(e) => setSelectedLBType(e.target.value)}
              >
                <option value="">-- Select Type --</option>
                {getAllAvailableLoadBalancerTypes().map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
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
              <label>DB Instance Type:</label>
              <select
                value={selectedDBInstanceType}
                onChange={(e) => setSelectedDBInstanceType(e.target.value)}
              >
                <option value="">-- Select Type --</option>
                {getAllAvailableDBInstanceTypes().map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="popup-selection">
              <label>DB Engine:</label>
              <select
                value={selectedDBEngine}
                onChange={(e) => setSelectedDBEngine(e.target.value)}
              >
                <option value="">-- Select Engine --</option>
                {getAllAvailableDBEngineNames().map((engine) => (
                  <option key={engine} value={engine}>
                    {engine}
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
              !selectedPricing ||
              (service.name === 'Virtual Machine' &&
                (!selectedInstanceType || !selectedRegion || !selectedOS)) ||
              (service.name === 'Bucket' &&
                (!selectedRegion || !selectedStorageClass)) ||
              (service.name === 'Load Balancer' &&
                (!selectedRegion || !selectedLBType)) ||
              (service.name === 'DB' &&
                (!selectedRegion ||
                  !selectedDBInstanceType ||
                  !selectedDBEngine))
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
