import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
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
const ServiceContext = createContext(undefined);
export const ServiceProvider = ({ children }) => {
    return _jsx(ServiceContext.Provider, { value: services, children: children });
};
export const useServices = () => {
    const context = useContext(ServiceContext);
    if (!context) {
        throw new Error("useServices must be used within a ServiceProvider");
    }
    return context;
};
//# sourceMappingURL=serviceContext.js.map