'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { FaRobot } from 'react-icons/fa';
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
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedResource, setSelectedResource] = useState('t2.micro');
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
      // Prevent scrolling on body when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Don't render on server
  if (!mounted) return null;
  if (!isOpen) return null;

  const resources: ResourceOption[] = [
    {
      id: 't2.micro',
      name: 't2.micro',
      specs: '1 vCPU, 1 GiB Memory',
      price: '$0.0116 per hour',
      features: [
        'Free tier eligible',
        'EBS storage',
        'Low to moderate network performance',
      ],
    },
    {
      id: 't2.small',
      name: 't2.small',
      specs: '1 vCPU, 2 GiB Memory',
      price: '$0.023 per hour',
      features: [
        'Moderate network performance',
        'EBS storage',
        'Balanced resources',
      ],
    },
    {
      id: 't2.medium',
      name: 't2.medium',
      specs: '2 vCPU, 4 GiB Memory',
      price: '$0.0464 per hour',
      features: [
        'Moderate network performance',
        'EBS storage',
        'Enhanced computing power',
      ],
    },
  ];

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
          <button className="button primary">Confirm Selection</button>
        </div>
      </div>
    </div>
  );
}
