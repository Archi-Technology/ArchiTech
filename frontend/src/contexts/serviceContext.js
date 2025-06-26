"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useServices = exports.ServiceProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const services = [
// { name: "EC2", icon: <img src={ec2Icon} alt="EC2" /> },
// { name: "S3", icon: <img src={s3Icon} alt="S3" /> },
// { name: "Lambda", icon: <img src={lambdaIcon} alt="Lambda" /> },
// { name: "API Gateway", icon: <img src={apiGatewayIcon} alt="API Gateway" /> },
// { name: "VPC", icon: <img src={vpcIcon} alt="VPC" /> },
// { name: "CloudFront", icon: <img src={cloudFrontIcon} alt="CloudFront" /> },
// { name: "Route 53", icon: <img src={route53Icon} alt="Route 53" /> },
// { name: "ECS", icon: <img src={ecsIcon} alt="ECS" /> },
// { name: "ELB", icon: <img src={elbIcon} alt="ELB" /> },
];
const ServiceContext = (0, react_1.createContext)(undefined);
const ServiceProvider = ({ children }) => {
    return (0, jsx_runtime_1.jsx)(ServiceContext.Provider, { value: services, children: children });
};
exports.ServiceProvider = ServiceProvider;
const useServices = () => {
    const context = (0, react_1.useContext)(ServiceContext);
    if (!context) {
        throw new Error("useServices must be used within a ServiceProvider");
    }
    return context;
};
exports.useServices = useServices;
//# sourceMappingURL=serviceContext.js.map