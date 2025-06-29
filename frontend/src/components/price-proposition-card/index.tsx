'use client';
import type { ResourceOption } from '../../types/resource-types';
import awsIcon from '../../assets/awsIcon.png';
import azureIcon from '../../assets/azureIcon.png';
import './index.scss';

interface PricePropositionCardProps {
  serviceName?: string;
  resource: ResourceOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
  pricingType?: 'on-demand' | 'spot' | 'savings';
}

export default function PricePropositionCard({
  serviceName,
  resource,
  isSelected,
  onSelect,
  pricingType = 'on-demand',
}: PricePropositionCardProps) {
  const getProviderIcon = () => {
    if (resource.provider === 'AWS') {
      return awsIcon || '/placeholder.svg?height=24&width=32';
    }

    return azureIcon || '/placeholder.svg?height=24&width=24';
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'Contact for pricing';
    if (serviceName === 'Object Storage') {
      return `$${price.toFixed(4)}/Month`;
    }
    return `$${price.toFixed(4)}/Hour`;
  };

  return (
    <div
      className={`price-proposition-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(resource.id)}
    >
      <div className="card-header">
        <div className="provider-info">
          <img
            src={getProviderIcon() || '/placeholder.svg'}
            alt={`${resource.provider} logo`}
            className="provider-logo"
          />
        </div>
        <div className="selection-indicator">
          <div className="radio-button">
            <div className="radio-inner"></div>
          </div>
        </div>
      </div>

      <div className="card-content">
        <div className="instance-info">
          <h4 className="instance-name">
            {resource.productName ||
              resource.instanceType ||
              resource.lbType ||
              resource.storageTier}
          </h4>
          {resource.instanceType && resource.productName && (
            <p className="instance-type">Type: {resource.instanceType}</p>
          )}
          {resource.os && <p className="instance-os">OS: {resource.os}</p>}
          {resource.region && (
            <p className="instance-region">Region: {resource.region}</p>
          )}
        </div>

        <div className="pricing-info">
          <div className="price-display">
            <span className="price-amount">
              {formatPrice(
                resource.pricePerHour ?? resource.pricePerGbPerMonth,
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
