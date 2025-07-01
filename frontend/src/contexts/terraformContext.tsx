import React, { createContext, useContext, useState } from "react";

interface TerraformContextProps {
  terraformCode: string;
  updateTerraformCode: (newCode: string) => void;
  resetTerraformCode: () => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const TerraformContext = createContext<TerraformContextProps | undefined>(undefined);

export const TerraformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [terraformCode, setTerraformCode] = useState<string>("click on a service to generate \n Terraform code");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateTerraformCode = (newCode: string) => {
    setTerraformCode(newCode);
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  }

  const resetTerraformCode = () => {
    setTerraformCode("click on a service to generate \n Terraform code");
  };

  return (
    <TerraformContext.Provider value={{ terraformCode, updateTerraformCode, resetTerraformCode, setLoading, isLoading }}>
      {children}
    </TerraformContext.Provider>
  );
};

export const useTerraform = () => {
  const context = useContext(TerraformContext);
  if (!context) {
    throw new Error("useTerraform must be used within a TerraformProvider");
  }
  return context;
};