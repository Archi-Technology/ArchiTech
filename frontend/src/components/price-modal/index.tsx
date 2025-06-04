'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { FaRobot } from 'react-icons/fa';
import { AxiosInstence } from '../../services/axios/AxiosInstance';
import { translateOSTypeToCloudOptions } from '../../utils/Mappers/osMapper';
import { translateDBEngineToCloudOptions } from '../../utils/Mappers/dbEngineMapper';
import { translateDBInstanceTypeToCloudOptions } from '../../utils/Mappers/dbInstanceTypeMapper';
import { translateLoadBalancerTypeToCloudOptions } from '../../utils/Mappers/loadBalancerMapper';
import { translateStorageClassToCloudOptions } from '../../utils/Mappers/objectStorageMapper';
import { translateLocationToRegionCodes } from '../../utils/Mappers/regionMapper';
import { translateInstanceTypeCategory } from '../../utils/Mappers/typeMapper';
import './index.scss';

interface ResourceOption {
  id: string;
  name: string;
  specs: string;
  price: string;
  features: string[];
}

interface PricingOption {
  id: string;
  name: string;
  description: string;
  discount: string;
}

export default function ResourceModal({
  isOpen,
  onClose,
  selectedResourceName,
  onResourceChange,
  onSubmit,
  resourceParams
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  selectedResourceName: string;
  onResourceChange?: (name: string) => void
  resourceParams?: Record<string, any>;
}) {
  const [selectedResource, setSelectedResource] = useState<string>('');
  const [resources, setResources] = useState<ResourceOption[]>([]);
  const [pricingOption, setPricingOption] = useState('on-demand');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Add event listener to handle ESC key
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';

      // Translate resourceParams for each cloud provider
      let awsParams = resourceParams;
      let azureParams = resourceParams;

      if (resourceParams) {
        awsParams = {
          ...resourceParams,
          ...(resourceParams.os != null && { os: translateOSTypeToCloudOptions(resourceParams.os, 'aws')[0] }),
          ...(resourceParams.dbEngine != null && { databaseEngine: translateDBEngineToCloudOptions(resourceParams.dbEngine, 'aws')[0] }),
          ...(resourceParams.dbInstanceType != null && { instanceType: translateDBInstanceTypeToCloudOptions(resourceParams.dbInstanceType, 'aws')[0] }),
          ...(resourceParams.lbType != null && { lbType: translateLoadBalancerTypeToCloudOptions(resourceParams.lbType, 'aws')[0] }),
          ...(resourceParams.storageClass != null && { storageClass: translateStorageClassToCloudOptions(resourceParams.storageClass, 'aws')[0] }),
          ...(resourceParams.region != null && { region: translateLocationToRegionCodes(resourceParams.region, 'aws')[0] }),
          ...(resourceParams.instanceType != null && { instanceType: translateInstanceTypeCategory(resourceParams.instanceType, 'aws')[0] }),
        };
        azureParams = {
          ...resourceParams,
          ...(resourceParams.os != null && { os: translateOSTypeToCloudOptions(resourceParams.os, 'azure')[0] }),
          ...(resourceParams.dbEngine != null && { databaseEngine: translateDBEngineToCloudOptions(resourceParams.dbEngine, 'azure')[0] }),
          ...(resourceParams.dbInstanceType != null && { instanceType: translateDBInstanceTypeToCloudOptions(resourceParams.dbInstanceType, 'azure')[0] }),
          ...(resourceParams.lbType != null && { lbType: translateLoadBalancerTypeToCloudOptions(resourceParams.lbType, 'azure')[0] }),
          ...(resourceParams.storageClass != null && { storageClass: translateStorageClassToCloudOptions(resourceParams.storageClass, 'azure')[0] }),
          ...(resourceParams.region != null && { region: translateLocationToRegionCodes(resourceParams.region, 'azure')[0] }),
          ...(resourceParams.instanceType != null && { instanceType: translateInstanceTypeCategory(resourceParams.instanceType, 'azure')[0] }),
        };
      }

      // Fetch resources from backend
      const fetchResources = async () => {
        try {
          const awsName = mapServiceNameToProvider(selectedResourceName, 'aws');
          const azureName = mapServiceNameToProvider(selectedResourceName, 'azure');
            const [awsRes, azureRes] = await Promise.all([
            AxiosInstence.get(`/aws/cost/${awsName}`, { 
              params: { 
              ...awsParams 
              } 
            }),
            AxiosInstence.get(`/azure/cost/${azureName}`, { 
              params: { 
              ...azureParams 
              } 
            }),
            ])
          const awsResources = awsRes.data || [];
          const azureResources = azureRes.data || [];
          const combined = [...awsResources, ...azureResources];
          setResources(combined);
          if (combined.length > 0) setSelectedResource(combined[0].id);
        } catch (error) {
          console.error('Failed to fetch resources:', error);
        }
      };

      fetchResources();
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);


  function mapServiceNameToProvider(serviceName: string, provider: 'aws' | 'azure'): string {
    const mapping: Record<string, { aws: string; azure: string }> = {
      'Virtual Machine': { aws: 'ec2', azure: 'vm' },
      'Load Balancer': { aws: 'elb', azure: 'loadbalancer' },
      'Database': { aws: 'rds', azure: 'sql' },
      'Object Storage': { aws: 's3', azure: 'blob' },
    };

    if (mapping[serviceName]) {
      return mapping[serviceName][provider];
    }
    // fallback to the original name if not found
    return serviceName;
  }


  // Don't render on server
  if (!mounted) return null;
  if (!isOpen) return null;


  const pricingOptions: PricingOption[] = [
    {
      id: 'on-demand',
      name: 'On-Demand',
      description: 'Pay as you go with no commitment',
      discount: '0%',
    },
    {
      id: 'spot',
      name: 'Spot Instances',
      description: 'Up to 90% off on-demand pricing with variable availability',
      discount: 'Up to 90%',
    },
    {
      id: 'savings',
      name: 'Savings Plans',
      description: 'Commit to 1 or 3 years for significant discounts',
      discount: 'Up to 72%',
    },
    {
      id: 'auto-scaling',
      name: 'Auto Scaling',
      description: 'Automatically adjust capacity based on demand',
      discount: 'Optimized usage',
    },
  ];

  const getResourceSuggestion = () => {
    if (selectedResource === 't2.small') {
      return 'For your current workload, the t2.small instance might be the most cost-effective option. It provides a good balance of compute power and memory.';
    } else if (selectedResource === 't2.micro') {
      return 'The t2.micro is perfect for low-traffic applications and development environments. Consider upgrading if you expect higher workloads.';
    } else {
      return 'The t2.medium offers more computing power, ideal for applications with moderate traffic or computational needs.';
    }
  };

  const getPricingAdvice = () => {
    switch (pricingOption) {
      case 'spot':
        return 'Spot instances can save you up to 90%, but they may be interrupted. Best for fault-tolerant workloads.';
      case 'savings':
        return 'Savings Plans offer significant discounts with a 1 or 3 year commitment. Ideal for predictable workloads.';
      case 'auto-scaling':
        return 'Auto Scaling optimizes costs by adjusting capacity to match demand. Great for variable workloads.';
      default:
        return 'On-Demand provides maximum flexibility but at standard pricing. Consider other options for cost savings.';
    }
  };

  // Handle click outside to close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container" role="dialog" aria-modal="true">
        <h2 className="modal-title">Select Resource</h2>

        <div className="resource-options">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className={`resource-option ${selectedResource === resource.id ? 'selected' : ''}`}
              onClick={() => setSelectedResource(resource.id)}
            >
              <div className="resource-option-content">
                <div className="radio-container">
                  <div className="radio-outer">
                    <div className="radio-inner"></div>
                  </div>
                </div>
                <div className="resource-details">
                  <div className="resource-name">{resource.name}</div>
                  <div className="resource-specs">{resource.specs}</div>
                  <div className="resource-price">{resource.price}</div>
                  <ul className="resource-features">
                    {resource.features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pricing-section">
          <h3 className="pricing-title">Pricing Options</h3>
          <div className="tabs-container">
            <div className="tabs-list">
              {pricingOptions.map((option) => (
                <button
                  key={option.id}
                  className={`tab-button ${pricingOption === option.id ? 'active' : ''}`}
                  onClick={() => setPricingOption(option.id)}
                >
                  {option.name}
                </button>
              ))}
            </div>

            {pricingOptions.map((option) => (
              <div
                key={option.id}
                className={`tab-panel ${pricingOption === option.id ? 'active' : ''}`}
              >
                <div className="pricing-option-name">{option.name}</div>
                <div className="pricing-option-description">
                  {option.description}
                </div>
                <div className="pricing-option-discount">
                  Discount: {option.discount}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="suggestion-section">
          <div className="suggestion-container">
            <div className="bot-icon-container">
              <FaRobot className="bot-icon" />
            </div>
            <div className="suggestion-content">
              <div className="suggestion-title">Adam's Suggestion:</div>
              <div className="suggestion-text">{getResourceSuggestion()}</div>
              <div className="pricing-advice">
                <span className="pricing-advice-label">Pricing advice:</span>{' '}
                {getPricingAdvice()}
              </div>
            </div>
          </div>
        </div>

        <div className="actions">
          <button className="button secondary" onClick={onClose}>
            Cancel
          </button>
          <button onClick={() => onSubmit()} className="button primary">Confirm Selection</button>
        </div>
      </div>
    </div>
  );
}
