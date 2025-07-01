'use client';

import type React from 'react';
import { useState, useEffect, useCallback } from 'react';
import apiService from '../../services/axios/AxiosInstance';
import { getTranslationParams } from '../../utils/translate';
import { getResourceSuggestion } from '../../utils/recommendation';
import type { ResourceOption } from '../../types/resource-types';
import ResourceLoader from '../resource-loader';
import { ResourceTabs } from './tabs/resource-tabs';
import { SuggestionSection } from './suggestion-section';
import { ModalActions } from './modal-actions';
import './index.scss';
import { CloudProvider } from '../../interfaces/canvas';

export default function ResourceModal({
  isOpen,
  onClose,
  onConfirm,
  selectedResourceName,
  onResourceChange,
  resourceParams,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: (selectedCloud: CloudProvider, pricing: any) => void
  selectedResourceName: string
  onResourceChange?: (name: string) => void
  resourceParams?: Record<string, any>
}) {
  const [selectedResource, setSelectedResource] = useState<string>('');
  const [resources, setResources] = useState<ResourceOption[]>([]);
  const [pricingOption, setPricingOption] = useState('on-demand');
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModalContent, setShowModalContent] = useState(false);
  const [spotInstances, setSpotInstances] = useState<ResourceOption[]>([]);
  const [savingsPlans, setSavingsPlans] = useState<ResourceOption[]>([]);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  // Check if the resource is a virtual machine to determine tab visibility
  const isVirtualMachine = selectedResourceName === 'Virtual Machine';

  useEffect(() => {
    if (selectedResourceName) {
      const fetchSuggestion = async () => {
        try {
          const recommendation =
            await getResourceSuggestion(selectedResourceName);
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

        const { awsParams, azureParams } = getTranslationParams(
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
              apiService.apiClient.get(`/aws/cost/${awsName}`, {
                params: awsParams,
                validateStatus: (status) => status === 200 || status === 400,
              }),
              apiService.apiClient.get(`/azure/cost/${azureName}`, {
                params: azureParams,
                validateStatus: (status) => status === 200 || status === 400,
              }),
            ]);

            const awsData = awsRes && awsRes.status === 200 ? awsRes.data : [];
            const azureData =
              azureRes && azureRes.status === 200
                ? azureRes.data.map(
                    (
                      item: Record<string, any>,
                      index: number,
                    ): ResourceOption => ({
                      ...item,
                      id: `${index + awsData.length}`,
                      provider: 'azure',
                    }),
                  )
                : [];

            const combinedData = [...awsData, ...azureData];

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

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!mounted || !isOpen) return null;

  return (
    <>
      <ResourceLoader
        isVisible={isLoading}
        onComplete={handleLoaderComplete}
        duration={4000}
        steps={[
          'Analyzing your answers',
          'Analyzing your preferences',
          'Selecting budget-friendly options',
        ]}
      />

      {showModalContent && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-container" role="dialog" aria-modal="true">
            <h2 className="modal-title">Select Resource</h2>

            <ResourceTabs
              serviceName={selectedResourceName}
              pricingOption={pricingOption}
              setPricingOption={setPricingOption}
              resources={resources}
              spotInstances={spotInstances}
              savingsPlans={savingsPlans}
              selectedResource={selectedResource}
              setSelectedResource={setSelectedResource}
              isVirtualMachine={isVirtualMachine}
            />

            <SuggestionSection suggestion={suggestion} />

            <ModalActions
              onClose={onClose}
              onConfirm={() => {
                if (selectedResource !== null) {
                  const selectedResourceDetails = resources.find((resource) => resource.id === selectedResource);
                  const selectedCloud = (selectedResourceDetails?.provider || CloudProvider.AWS).toLocaleUpperCase() as CloudProvider;
                  const price = selectedResourceName == 'Object Storage' ? selectedResourceDetails?.pricePerGbPerMonth || 0.1 : selectedResourceDetails?.pricePerHour || 0.1; 
                  onConfirm(selectedCloud, price); // Pass the selected cloud provider
                  document.dispatchEvent(new Event("closeParentModal")); // Trigger parent modal close
                }
              }}
            />
          </div>
        // </div>
      )}
    </>
  );
}
