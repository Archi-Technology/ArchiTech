'use client';
import awsIcon from '../../assets/awsIcon.png';
import azureIcon from '../../assets/azureIcon.png';
import './index.scss';

interface ResourceOption {
  id: string;
  productName?: string;
  instanceType?: string;
  os?: string;
  region?: string;
  pricePerHour?: number;
  provider: 'AWS' | 'azure';
  spotInstance?: boolean;
  reservationTerm?: string | null;
  savingsPlan?: boolean;
}

interface PricePropositionCardProps {
  resource: ResourceOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
  pricingType?: 'on-demand' | 'spot' | 'savings';
}

export default function PricePropositionCard({
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

  const getProviderName = () => {
    return resource.provider === 'AWS'
      ? 'Amazon Web Services'
      : 'Microsoft Azure';
  };

  const getPricingBadge = () => {
    if (resource.spotInstance || pricingType === 'spot') {
      return (
        <span className="pricing-badge spot">
          <span className="badge-icon">⚡</span>
          Spot Instance
        </span>
      );
    }

    if (
      resource.reservationTerm ||
      resource.savingsPlan ||
      pricingType === 'savings'
    ) {
      const term = resource.reservationTerm || '1-3 years';
      return (
        <span className="pricing-badge savings">
          <span className="badge-icon">💰</span>
          {resource.provider === 'AWS' ? 'Savings Plan' : 'Reserved'} ({term})
        </span>
      );
    }

    return (
      <span className="pricing-badge on-demand">
        <span className="badge-icon">🔄</span>
        On-Demand
      </span>
    );
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'Contact for pricing';
    return `$${price.toFixed(4)}/hour`;
  };

  const getDiscountInfo = () => {
    if (pricingType === 'spot') {
      return 'Up to 90% savings';
    }
    if (pricingType === 'savings') {
      return 'Up to 72% savings';
    }
    return null;
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
          <div className="provider-details">
            <span className="provider-name">{getProviderName()}</span>
            <span className="provider-short">{resource.provider}</span>
          </div>
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
              'Standard Instance'}
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
              {formatPrice(resource.pricePerHour)}
            </span>
            {getDiscountInfo() && (
              <span className="discount-info">{getDiscountInfo()}</span>
            )}
          </div>
          {getPricingBadge()}
        </div>
      </div>

      {isSelected && (
        <div className="selected-overlay">
          <div className="checkmark">✓</div>
        </div>
      )}
    </div>
  );
}
