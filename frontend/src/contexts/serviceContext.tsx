// import React, { createContext, useContext } from "react";
// import ec2Icon from "../assets/canvas/aws/ec2.svg";
// import s3Icon from "../assets/canvas/aws/s3.svg";
// import lambdaIcon from "../assets/canvas/aws/lambda.svg";
// import apiGatewayIcon from "../assets/canvas/aws/api-gateway.svg";
// import vpcIcon from "../assets/canvas/aws/vpc.svg";
// import cloudFrontIcon from "../assets/canvas/aws/cloudfront.svg";
// import route53Icon from "../assets/canvas/aws/route53.svg";
// import ecsIcon from "../assets/canvas/aws/ecs.svg";
// import elbIcon from "../assets/canvas/aws/elb.svg";

// interface Service {
//     name: string;
//     icon: JSX.Element;
// }

// const services: Service[] = [
//     { name: "EC2", icon: <img src={ec2Icon} alt="EC2" /> },
//     { name: "S3", icon: <img src={s3Icon} alt="S3" /> },
//     { name: "Lambda", icon: <img src={lambdaIcon} alt="Lambda" /> },
//     { name: "API Gateway", icon: <img src={apiGatewayIcon} alt="API Gateway" /> },
//     { name: "VPC", icon: <img src={vpcIcon} alt="VPC" /> },
//     { name: "CloudFront", icon: <img src={cloudFrontIcon} alt="CloudFront" /> },
//     { name: "Route 53", icon: <img src={route53Icon} alt="Route 53" /> },
//     { name: "ECS", icon: <img src={ecsIcon} alt="ECS" /> },
//     { name: "ELB", icon: <img src={elbIcon} alt="ELB" /> },
// ];

// const ServiceContext = createContext<Service[] | undefined>(undefined);

// export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     return <ServiceContext.Provider value={services}>{children}</ServiceContext.Provider>;
// };

// export const useServices = () => {
//     const context = useContext(ServiceContext);
//     if (!context) {
//         throw new Error("useServices must be used within a ServiceProvider");
//     }
//     return context;
// };
