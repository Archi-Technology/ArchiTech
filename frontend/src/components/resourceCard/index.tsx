import React from 'react';

interface ResourceOption {
  id: string;
  productName?: string;
  instanceType?: string;
  os?: string;
  region?: string;
  pricePerHour?: number;
}

export default function ResourceCard({
  resource,
  isSelected,
  onSelect,
}: {
  resource: ResourceOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      className={`resource-option ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(resource.id)}
    >
      <div className="resource-option-content">
        <div className="radio-container">
          <div className="radio-outer">
            <div className={`radio-inner ${isSelected ? 'checked' : ''}`}></div>
          </div>
        </div>
        <div className="resource-details">
          <div className="resource-name">
            {resource.productName ?? 'Unnamed Resource'}
          </div>
          <div className="resource-meta">
            <div>
              <strong>Instance Type:</strong> {resource.instanceType ?? 'N/A'}
            </div>
            <div>
              <strong>OS:</strong> {resource.os ?? 'N/A'}
            </div>
            <div>
              <strong>Region:</strong> {resource.region ?? 'N/A'}
            </div>
            <div>
              <strong>Price per Hour:</strong> $
              {resource.pricePerHour?.toFixed(4) ?? 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
