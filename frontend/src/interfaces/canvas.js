export var ServiceType;
(function (ServiceType) {
    ServiceType["VPC"] = "VPC";
    ServiceType["Subnet"] = "Subnet";
    ServiceType["LB"] = "LoadBalancer";
    ServiceType["VM"] = "VirtualMachine";
    ServiceType["Databases"] = "databases";
    ServiceType["OBJECT_STORAGE"] = "ObjectStorage";
})(ServiceType || (ServiceType = {}));
export var CloudProvider;
(function (CloudProvider) {
    CloudProvider["GCP"] = "GCP";
    CloudProvider["AZURE"] = "AZURE";
    CloudProvider["AWS"] = "AWS";
})(CloudProvider || (CloudProvider = {}));
//# sourceMappingURL=canvas.js.map