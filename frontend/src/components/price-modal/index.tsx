'use client';

import type React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { FaRobot } from 'react-icons/fa';
import { AxiosInstence } from '../../services/axios/AxiosInstance';
import { getTranslationParams } from '../../utils/translate';
import PricePropositionCard from '../price-proposition-card/index';
import ResourceLoader from '../resource-loader';
import awsIcon from '../../assets/awsIcon.png';
import azureIcon from '../../assets/azureIcon.png';
import './index.scss';
import { getResourceSuggestion } from '../../utils/recommendation';

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
  const [isLoading, setIsLoading] = useState(false);
  const [showModalContent, setShowModalContent] = useState(false);
  const [spotInstances, setSpotInstances] = useState<ResourceOption[]>([]);
  const [savingsPlans, setSavingsPlans] = useState<ResourceOption[]>([]);
  const [useSpotInstances, setUseSpotInstances] = useState(false);
  const [useSavingsPlans, setUseSavingsPlans] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  useEffect(() => {
    if (selectedResourceName) {
      const fetchSuggestion = async () => {
        try {
          const recommendation = await getResourceSuggestion(selectedResourceName);
          
          setSuggestion(recommendation?.message || null);
        } catch (error) {
          console.error('Failed to fetch suggestion:', error);
          setSuggestion(null);
        }
      };

      fetchSuggestion();
    }
  }, [selectedResourceName]);

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

      if (!isLoading && !showModalContent) {
        setIsLoading(true);
        setShowModalContent(false);
        setResources([]);
        setSpotInstances([]);
        setSavingsPlans([]);

        let { awsParams, azureParams } = getTranslationParams(
          resourceParams || {},
        );

        const fetchResources = async () => {
          try {
            const awsName = mapServiceNameToProvider(
              selectedResourceName,
              'aws',
            );
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

            const combinedData = [...awsRes.data, ...azureRes.data];

            const onDemandResources = combinedData.filter(
              (resource) => !resource.spotInstance && !resource.reservationTerm,
            );

            const spotInstances = combinedData.filter(
              (resource) => resource.spotInstance === true,
            );

            const savingsPlans = combinedData.filter(
              (resource) => resource.reservationTerm !== null,
            );

            setResources(onDemandResources);
            setSpotInstances(spotInstances);
            setSavingsPlans(savingsPlans);

            if (combinedData.length > 0) {
              setSelectedResource(combinedData[0].id);
            }
          } catch (error) {
            console.error('Failed to fetch resources:', error);
            setIsLoading(false);
          }
        };

        fetchResources();
      }
    } else {
      setIsLoading(false);
      setShowModalContent(false);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, selectedResourceName, resourceParams]);

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
    setShowModalContent(true);
  }, []);

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
  ];

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const getAwsResources = (resourceList: ResourceOption[]) =>
    resourceList.filter((r) => r.provider === 'AWS');

  const getAzureResources = (resourceList: ResourceOption[]) =>
    resourceList.filter((r) => r.provider === 'azure');

  return (
    <>
      <ResourceLoader
        isVisible={isLoading}
        onComplete={handleLoaderComplete}
        duration={4000}
      />

      {showModalContent && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-container" role="dialog" aria-modal="true">
            <h2 className="modal-title">Select Resource</h2>

            <div className="pricing-section">
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

                {/* On-Demand Panel */}
                <div
                  className={`tab-panel ${pricingOption === 'on-demand' ? 'active' : ''}`}
                >
                  <div className="pricing-header">
                    <h3 className="pricing-option-name">On-Demand Pricing</h3>
                    <p className="pricing-option-description">
                      Pay as you go with no commitment. Standard pricing with
                      maximum flexibility.
                    </p>
                  </div>

                  <div className="provider-section">
                    <div className="provider-header">
                      <img
                        src={awsIcon || '/placeholder.svg'}
                        alt="AWS"
                        className="provider-icon"
                      />
                      <h4 className="provider-title">AWS Options</h4>
                    </div>
                    {getAwsResources(resources).length === 0 ? (
                      <div className="no-resources">
                        No AWS resources available for this configuration
                      </div>
                    ) : (
                      <div className="resource-grid">
                        {getAwsResources(resources).map((resource) => (
                          <PricePropositionCard
                            key={resource.id}
                            resource={resource}
                            isSelected={selectedResource === resource.id}
                            onSelect={setSelectedResource}
                            pricingType="on-demand"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="provider-section">
                    <div className="provider-header">
                      <img
                        src={azureIcon || '/placeholder.svg'}
                        alt="Azure"
                        className="provider-icon"
                      />
                      <h4 className="provider-title">Azure Options</h4>
                    </div>
                    {getAzureResources(resources).length === 0 ? (
                      <div className="no-resources">
                        No Azure resources available for this configuration
                      </div>
                    ) : (
                      <div className="resource-grid">
                        {getAzureResources(resources).map((resource) => (
                          <PricePropositionCard
                            key={resource.id}
                            resource={resource}
                            isSelected={selectedResource === resource.id}
                            onSelect={setSelectedResource}
                            pricingType="on-demand"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Spot Instances Panel */}
                <div
                  className={`tab-panel ${pricingOption === 'spot' ? 'active' : ''}`}
                >
                  <div className="pricing-header">
                    <h3 className="pricing-option-name">Spot Instances</h3>
                    <p className="pricing-option-description">
                      Up to 90% off on-demand pricing with variable
                      availability. Best for fault-tolerant workloads.
                    </p>
                  </div>

                  <div className="toggle-container">
                    {pricingOption === 'spot' && (
                      <>
                        <div className="provider-section">
                          <div className="provider-header">
                            <img
                              src={awsIcon || '/placeholder.svg'}
                              alt="AWS"
                              className="provider-icon"
                            />
                            <h4 className="provider-title">
                              AWS Spot Instances
                            </h4>
                          </div>
                          {getAwsResources(spotInstances).length === 0 ? (
                            <div className="no-resources">
                              No AWS spot instances available for this
                              configuration
                            </div>
                          ) : (
                            <div className="resource-grid">
                              {getAwsResources(spotInstances).map(
                                (resource) => (
                                  <PricePropositionCard
                                    key={resource.id}
                                    resource={resource}
                                    isSelected={
                                      selectedResource === resource.id
                                    }
                                    onSelect={setSelectedResource}
                                    pricingType="spot"
                                  />
                                ),
                              )}
                            </div>
                          )}
                        </div>

                        <div className="provider-section">
                          <div className="provider-header">
                            <img
                              src={azureIcon || '/placeholder.svg'}
                              alt="Azure"
                              className="provider-icon"
                            />
                            <h4 className="provider-title">
                              Azure Spot Instances
                            </h4>
                          </div>
                          {getAzureResources(spotInstances).length === 0 ? (
                            <div className="no-resources">
                              No Azure spot instances available for this
                              configuration
                            </div>
                          ) : (
                            <div className="resource-grid">
                              {getAzureResources(spotInstances).map(
                                (resource) => (
                                  <PricePropositionCard
                                    key={resource.id}
                                    resource={resource}
                                    isSelected={
                                      selectedResource === resource.id
                                    }
                                    onSelect={setSelectedResource}
                                    pricingType="spot"
                                  />
                                ),
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {useSpotInstances && (
                    <>
                      <div className="provider-section">
                        <div className="provider-header">
                          <img
                            src={awsIcon || '/placeholder.svg'}
                            alt="AWS"
                            className="provider-icon"
                          />
                          <h4 className="provider-title">AWS Spot Instances</h4>
                        </div>
                        {getAwsResources(spotInstances).length === 0 ? (
                          <div className="no-resources">
                            No AWS spot instances available for this
                            configuration
                          </div>
                        ) : (
                          <div className="resource-grid">
                            {getAwsResources(spotInstances).map((resource) => (
                              <PricePropositionCard
                                key={resource.id}
                                resource={resource}
                                isSelected={selectedResource === resource.id}
                                onSelect={setSelectedResource}
                                pricingType="spot"
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="provider-section">
                        <div className="provider-header">
                          <img
                            src={azureIcon || '/placeholder.svg'}
                            alt="Azure"
                            className="provider-icon"
                          />
                          <h4 className="provider-title">
                            Azure Spot Instances
                          </h4>
                        </div>
                        {getAzureResources(spotInstances).length === 0 ? (
                          <div className="no-resources">
                            No Azure spot instances available for this
                            configuration
                          </div>
                        ) : (
                          <div className="resource-grid">
                            {getAzureResources(spotInstances).map(
                              (resource) => (
                                <PricePropositionCard
                                  key={resource.id}
                                  resource={resource}
                                  isSelected={selectedResource === resource.id}
                                  onSelect={setSelectedResource}
                                  pricingType="spot"
                                />
                              ),
                            )}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Savings Plans Panel */}
                <div
                  className={`tab-panel ${pricingOption === 'savings' ? 'active' : ''}`}
                >
                  <div className="pricing-header">
                    <h3 className="pricing-option-name">
                      Savings Plans & Reserved Instances
                    </h3>
                    <p className="pricing-option-description">
                      Commit to 1 or 3 years for significant discounts. Best for
                      stable, predictable workloads.
                    </p>
                  </div>

                  <div className="toggle-container">
                    <div className="provider-section">
                      {savingsPlans.length === 0 ? (
                        <div className="no-resources">
                          No savings plans available for this configuration
                        </div>
                      ) : (
                        <table className="savings-table">
                          <thead>
                            <tr>
                              <th>Term</th>
                              <th>Provider</th>
                              <th>Price Per Hour</th>
                              <th>Select</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* 1-Year Term Rows */}
                            {savingsPlans
                              .filter(
                                (resource) =>
                                  resource.reservationTerm === '1 Year',
                              )
                              .map((resource) => (
                                <tr key={resource.id}>
                                  <td>1 Year</td>
                                  <td>
                                    <img
                                      src={
                                        resource.provider === 'AWS'
                                          ? awsIcon
                                          : azureIcon
                                      }
                                      alt={resource.provider}
                                      className="provider-icon"
                                    />
                                  </td>
                                  <td>
                                    $
                                    {resource.pricePerHour?.toFixed(4) || 'N/A'}
                                  </td>
                                  <td>
                                    <input
                                      type="radio"
                                      name="savings-plan"
                                      checked={selectedResource === resource.id}
                                      onChange={() =>
                                        setSelectedResource(resource.id)
                                      }
                                    />
                                  </td>
                                </tr>
                              ))}

                            {/* 3-Year Term Rows */}
                            {savingsPlans
                              .filter(
                                (resource) =>
                                  resource.reservationTerm === '3 Years',
                              )
                              .map((resource) => (
                                <tr key={resource.id}>
                                  <td>3 Years</td>
                                  <td>
                                    <img
                                      src={
                                        resource.provider === 'AWS'
                                          ? awsIcon
                                          : azureIcon
                                      }
                                      alt={resource.provider}
                                      className="provider-icon"
                                    />
                                  </td>
                                  <td>
                                    $
                                    {resource.pricePerHour?.toFixed(4) || 'N/A'}
                                  </td>
                                  <td>
                                    <input
                                      type="radio"
                                      name="savings-plan"
                                      checked={selectedResource === resource.id}
                                      onChange={() =>
                                        setSelectedResource(resource.id)
                                      }
                                    />
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>

                  {useSavingsPlans && (
                    <>
                      <div className="provider-section">
                        <div className="provider-header">
                          <img
                            src={awsIcon || '/placeholder.svg'}
                            alt="AWS"
                            className="provider-icon"
                          />
                          <h4 className="provider-title">AWS Savings Plans</h4>
                        </div>
                        {getAwsResources(savingsPlans).length === 0 ? (
                          <div className="no-resources">
                            No AWS savings plans available for this
                            configuration
                          </div>
                        ) : (
                          <table className="savings-table">
                            <thead>
                              <tr>
                                <th>Term</th>
                                <th>Price Per Hour</th>
                                <th>Select</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getAwsResources(savingsPlans).map((resource) => (
                                <tr key={resource.id}>
                                  <td>{resource.reservationTerm}</td>
                                  <td>${resource.pricePerHour?.toFixed(4)}</td>
                                  <td>
                                    <input
                                      type="radio"
                                      name="aws-savings-plan"
                                      checked={selectedResource === resource.id}
                                      onChange={() =>
                                        setSelectedResource(resource.id)
                                      }
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>

                      <div className="provider-section">
                        <div className="provider-header">
                          <img
                            src={azureIcon || '/placeholder.svg'}
                            alt="Azure"
                            className="provider-icon"
                          />
                          <h4 className="provider-title">
                            Azure Reserved Instances
                          </h4>
                        </div>
                        {getAzureResources(savingsPlans).length === 0 ? (
                          <div className="no-resources">
                            No Azure reserved instances available for this
                            configuration
                          </div>
                        ) : (
                          <table className="savings-table">
                            <thead>
                              <tr>
                                <th>Term</th>
                                <th>Price Per Hour</th>
                                <th>Select</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getAzureResources(savingsPlans).map(
                                (resource) => (
                                  <tr key={resource.id}>
                                    <td>{resource.reservationTerm}</td>
                                    <td>
                                      ${resource.pricePerHour?.toFixed(4)}
                                    </td>
                                    <td>
                                      <input
                                        type="radio"
                                        name="azure-savings-plan"
                                        checked={
                                          selectedResource === resource.id
                                        }
                                        onChange={() =>
                                          setSelectedResource(resource.id)
                                        }
                                      />
                                    </td>
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="suggestion-section">
              <div className="suggestion-container">
                <div className="bot-icon-container">
                  <FaRobot className="bot-icon" />
                </div>
                <div className="suggestion-content">
                  <div className="suggestion-title">{"Adam's Suggestion:"}</div>
                  <div className="suggestion-text">
                    {suggestion || 'No recommendation available at the moment.'}
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
      )}
    </>
  );
}
