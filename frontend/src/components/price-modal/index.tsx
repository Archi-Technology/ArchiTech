'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { FaRobot } from 'react-icons/fa';
import { AxiosInstence } from '../../services/axios/AxiosInstance';
import { translateDBEngineToCloudOptions } from '../../utils/Mappers/dbEngineMapper';
import { translateDBInstanceTypeToCloudOptions } from '../../utils/Mappers/dbInstanceTypeMapper';
import { translateLoadBalancerTypeToCloudOptions } from '../../utils/Mappers/loadBalancerMapper';
import { translateStorageClassToCloudOptions } from '../../utils/Mappers/objectStorageMapper';
import { translateLocationToRegionCodes } from '../../utils/Mappers/regionMapper';
import { translateInstanceTypeCategory } from '../../utils/Mappers/typeMapper';
import './index.scss';
import ResourceCard from '../resourceCard';

interface ResourceOption {
  id: string;
  productName?: string;
  instanceType?: string;
  os?: string;
  region?: string;
  pricePerHour?: number;
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
  resourceParams,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedResourceName: string;
  onResourceChange?: (name: string) => void;
  resourceParams?: Record<string, any>;
}) {
  const [selectedResource, setSelectedResource] = useState<string>('');
  const [resources, setResources] = useState<ResourceOption[]>([]);
  const [pricingOption, setPricingOption] = useState('on-demand');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';

      let awsParams = resourceParams;
      let azureParams = resourceParams;

      if (resourceParams) {
        awsParams = {
          ...resourceParams,
          ...(resourceParams.os && { os: resourceParams.os }),
          ...(resourceParams.dbEngine && {
            databaseEngine: translateDBEngineToCloudOptions(
              resourceParams.dbEngine,
              'aws',
            )[0],
          }),
          ...(resourceParams.dbInstanceType && {
            instanceType: translateDBInstanceTypeToCloudOptions(
              resourceParams.dbInstanceType,
              'aws',
            )[0],
          }),
          ...(resourceParams.lbType && {
            lbType: translateLoadBalancerTypeToCloudOptions(
              resourceParams.lbType,
              'aws',
            )[0],
          }),
          ...(resourceParams.storageClass && {
            storageClass: translateStorageClassToCloudOptions(
              resourceParams.storageClass,
              'aws',
            )[0],
          }),
          ...(resourceParams.region && {
            region: translateLocationToRegionCodes(
              resourceParams.region,
              'aws',
            )[0],
          }),
          ...(resourceParams.instanceType && {
            instanceType: translateInstanceTypeCategory(
              resourceParams.instanceType,
              'aws',
            )[0],
          }),
        };

        azureParams = {
          ...resourceParams,
          ...(resourceParams.os && { os: resourceParams.os }),
          ...(resourceParams.dbEngine && {
            databaseEngine: translateDBEngineToCloudOptions(
              resourceParams.dbEngine,
              'azure',
            )[0],
          }),
          ...(resourceParams.dbInstanceType && {
            instanceType: translateDBInstanceTypeToCloudOptions(
              resourceParams.dbInstanceType,
              'azure',
            )[0],
          }),
          ...(resourceParams.lbType && {
            lbType: translateLoadBalancerTypeToCloudOptions(
              resourceParams.lbType,
              'azure',
            )[0],
          }),
          ...(resourceParams.storageClass && {
            storageClass: translateStorageClassToCloudOptions(
              resourceParams.storageClass,
              'azure',
            )[0],
          }),
          ...(resourceParams.region && {
            region: translateLocationToRegionCodes(
              resourceParams.region,
              'azure',
            )[0],
          }),
          ...(resourceParams.instanceType && {
            instanceType: translateInstanceTypeCategory(
              resourceParams.instanceType,
              'azure',
            )[0],
          }),
        };
      }

      const fetchResources = async () => {
        try {
          const awsName = mapServiceNameToProvider(selectedResourceName, 'aws');
          const azureName = mapServiceNameToProvider(
            selectedResourceName,
            'azure',
          );

          const [awsRes, azureRes] = await Promise.all([
            AxiosInstence.get(`/aws/cost/${awsName}`, { params: awsParams }),
            AxiosInstence.get(`/azure/cost/${azureName}`, {
              params: azureParams,
            }),
          ]);

          console.log('AWS Resources:', awsRes.data);
          console.log('Azure Resources:', azureRes.data);

          const combined = [...awsRes.data, ...azureRes.data];
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

  function mapServiceNameToProvider(
    serviceName: string,
    provider: 'aws' | 'azure',
  ): string {
    const mapping: Record<string, { aws: string; azure: string }> = {
      'Virtual Machine': { aws: 'ec2', azure: 'vm' },
      'Load Balancer': { aws: 'elb', azure: 'loadbalancer' },
      Database: { aws: 'rds', azure: 'sql' },
      'Object Storage': { aws: 's3', azure: 'blob' },
    };
    return mapping[serviceName]?.[provider] ?? serviceName;
  }

  if (!mounted || !isOpen) return null;

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
      return 'For your current workload, the t2.small instance might be the most cost-effective option.';
    } else if (selectedResource === 't2.micro') {
      return 'The t2.micro is perfect for low-traffic applications and development environments.';
    } else {
      return 'The t2.medium offers more computing power, ideal for moderate applications.';
    }
  };

  const getPricingAdvice = () => {
    switch (pricingOption) {
      case 'spot':
        return 'Spot instances can save up to 90%, but may be interrupted.';
      case 'savings':
        return 'Savings Plans offer discounts with a 1 or 3 year commitment.';
      case 'auto-scaling':
        return 'Auto Scaling adjusts capacity to match demand.';
      default:
        return 'On-Demand provides flexibility but at standard pricing.';
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container" role="dialog" aria-modal="true">
        <h2 className="modal-title">Select Resource</h2>

        <div className="resource-options">
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              isSelected={selectedResource === resource.id}
              onSelect={setSelectedResource}
            />
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
          <button className="button primary">Confirm Selection</button>
        </div>
      </div>
    </div>
  );
}
