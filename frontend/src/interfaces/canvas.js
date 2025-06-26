"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudProvider = exports.ServiceType = void 0;
var ServiceType;
(function (ServiceType) {
    ServiceType["VPC"] = "VPC";
    ServiceType["Subnet"] = "Subnet";
    ServiceType["LB"] = "LoadBalancer";
    ServiceType["VM"] = "VirtualMachine";
    ServiceType["Databases"] = "databases";
    ServiceType["OBJECT_STORAGE"] = "ObjectStorage";
})(ServiceType || (exports.ServiceType = ServiceType = {}));
var CloudProvider;
(function (CloudProvider) {
    CloudProvider["GCP"] = "GCP";
    CloudProvider["AZURE"] = "AZURE";
    CloudProvider["AWS"] = "AWS";
})(CloudProvider || (exports.CloudProvider = CloudProvider = {}));
//# sourceMappingURL=canvas.js.map