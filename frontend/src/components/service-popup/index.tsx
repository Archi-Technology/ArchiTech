import "./index.scss";
import { useState, useEffect } from "react";

interface ServicePopupProps {
    service: { name: string; icon: JSX.Element };
    onConfirm: (vpc: string, subnet: string) => void;
    onCancel: () => void;
}

const availableVPCs = [
    { id: "vpc-1", name: "VPC 1" },
    { id: "vpc-2", name: "VPC 2" },
];

const availableSubnets = [
    { id: "subnet-1", name: "Subnet 1" },
    { id: "subnet-2", name: "Subnet 2" },
];

const pricingOptions = [
    {
        id: "us-east-1a",
        region: "US East (N. Virginia)",
        availabilityZone: "us-east-1a",
        onDemand: "$0.10",
        reserved: "$0.07",
        spot: "$0.03",
    },
    {
        id: "us-east-1b",
        region: "US East (N. Virginia)",
        availabilityZone: "us-east-1b",
        onDemand: "$0.11",
        reserved: "$0.08",
        spot: "$0.04",
    },
    {
        id: "us-west-1a",
        region: "US West (N. California)",
        availabilityZone: "us-west-1a",
        onDemand: "$0.12",
        reserved: "$0.09",
        spot: "$0.05",
    },
];

const instanceTypes = [
    { id: "t2.micro", name: "t2.micro" },
    { id: "t2.small", name: "t2.small" },
    { id: "m5.large", name: "m5.large" },
    { id: "c5.xlarge", name: "c5.xlarge" },
];

export default function ServicePopup({ service, onConfirm, onCancel }: ServicePopupProps) {
    const [selectedVPC, setSelectedVPC] = useState<string>("");
    const [selectedSubnet, setSelectedSubnet] = useState<string>("");
    const [selectedPricing, setSelectedPricing] = useState<string>("");
    const [selectedInstanceType, setSelectedInstanceType] = useState<string>(""); // New state for instance type
    const [recommendation, setRecommendation] = useState<string>("");

    useEffect(() => {
        // Simulate chatbot recommendation
        setRecommendation(`Based on your selection, we recommend using the "${service.name}" service in the "us-east-1a" availability zone with the "Reserved" pricing option for optimal cost and performance.`);
    }, [service]);

    const handleConfirm = () => {
        if (selectedVPC && selectedSubnet && selectedPricing && (service.name !== "EC2" || selectedInstanceType)) {
            onConfirm(selectedVPC, selectedSubnet);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="popup-recommendation">
                    <div className="chatbot-icon">🤖</div>
                    <p>{recommendation}</p>
                </div>
                <h3>Confirm Add Service</h3>
                <div className="popup-service">
                    <div className="popup-service-icon">{service.icon}</div>
                    <div className="popup-service-name">{service.name}</div>
                </div>
                <div className="popup-selection">
                    <label htmlFor="vpc-select">Select VPC:</label>
                    <select
                        id="vpc-select"
                        value={selectedVPC}
                        onChange={(e) => setSelectedVPC(e.target.value)}
                    >
                        <option value="">-- Select VPC --</option>
                        {availableVPCs.map((vpc) => (
                            <option key={vpc.id} value={vpc.id}>
                                {vpc.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="popup-selection">
                    <label htmlFor="subnet-select">Select Subnet:</label>
                    <select
                        id="subnet-select"
                        value={selectedSubnet}
                        onChange={(e) => setSelectedSubnet(e.target.value)}
                    >
                        <option value="">-- Select Subnet --</option>
                        {availableSubnets.map((subnet) => (
                            <option key={subnet.id} value={subnet.id}>
                                {subnet.name}
                            </option>
                        ))}
                    </select>
                </div>
                {service.name === "EC2" && (
                    <div className="popup-selection">
                        <label htmlFor="instance-type-select">Select Instance Type:</label>
                        <select
                            id="instance-type-select"
                            value={selectedInstanceType}
                            onChange={(e) => setSelectedInstanceType(e.target.value)}
                        >
                            <option value="">-- Select Instance Type --</option>
                            {instanceTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="popup-pricing">
                    <h4>Pricing Options</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Region</th>
                                <th>Availability Zone</th>
                                <th>On-Demand</th>
                                <th>Reserved</th>
                                <th>Spot</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pricingOptions.map((option) => (
                                <tr
                                    key={option.id}
                                    onClick={() => setSelectedPricing(option.id)}
                                    className={selectedPricing === option.id ? "selected" : ""}
                                >
                                    <td>{option.region}</td>
                                    <td>{option.availabilityZone}</td>
                                    <td>
                                        <span
                                            style={{
                                                backgroundColor: "#d1fae5",
                                                padding: "0.25rem 0.5rem",
                                                borderRadius: "0.25rem",
                                            }}
                                        >
                                            {option.onDemand}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            style={{
                                                backgroundColor: "#bfdbfe",
                                                padding: "0.25rem 0.5rem",
                                                borderRadius: "0.25rem",
                                            }}
                                        >
                                            {option.reserved}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            style={{
                                                backgroundColor: "#fde68a",
                                                padding: "0.25rem 0.5rem",
                                                borderRadius: "0.25rem",
                                            }}
                                        >
                                            {option.spot}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="popup-actions">
                    <button
                        className="popup-button confirm"
                        onClick={handleConfirm}
                        disabled={!selectedVPC || !selectedSubnet || !selectedPricing || (service.name === "EC2" && !selectedInstanceType)}
                    >
                        Confirm
                    </button>
                    <button className="popup-button cancel" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
