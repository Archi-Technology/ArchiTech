import "./index.scss";
import { useState, useEffect } from "react";
import { createVPC, createSubnet } from "../../services/canvasService"; // Import createVPC and createSubnet functions
import { useServices } from "../../contexts/serviceContext"; // Import useServices

interface ServicePopupProps {
    service: { name: string; icon: JSX.Element };
    onConfirm: (vpc: string, subnet: string) => void;
    onCancel: () => void;
}

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

const cloudOptions = [
    { id: "aws", name: "AWS" },
    { id: "azure", name: "Azure" },
    { id: "gcp", name: "GCP" },
];

export default function ServicePopup({ service, onConfirm, onCancel }: ServicePopupProps) {
    const services = useServices(); // Access services from context
    const [selectedPricing, setSelectedPricing] = useState<string>("");
    const [selectedInstanceType, setSelectedInstanceType] = useState<string>(""); // New state for instance type
    const [selectedCloud, setSelectedCloud] = useState<string>(""); // New state for target cloud
    const [addressRange, setAddressRange] = useState<string>(""); // New state for address range
    const [recommendation, setRecommendation] = useState<string>("");

    useEffect(() => {
        // Simulate chatbot recommendation
        setRecommendation(`Based on your selection, we recommend using the "${service.name}" service in the "us-east-1a" availability zone with the "Reserved" pricing option for optimal cost and performance.`);
    }, [service]);

    const handleConfirm = async () => {
        if (selectedCloud && addressRange) {
            const resourceMap: Record<string, (name: string, cloud: string, cidr: string) => Promise<any>> = {
                VPC: createVPC,
                Subnet: (name, cloud, cidr) => createSubnet(name, "default-vpc", cloud, cidr),
            };

            const resourceType = services.find((s) => s.name === service.name)?.name; // Match service name with the list

            if (resourceType && resourceMap[resourceType]) {
                try {
                    const response = await resourceMap[resourceType]("default-resource", selectedCloud, addressRange); // Call the appropriate function
                    console.log(`${resourceType} created:`, response); // Log the response for debugging
                    onConfirm(response.id, "default-subnet"); // Pass the resource ID to onConfirm
                } catch (error) {
                    console.error(`Error creating ${resourceType}:`, error); // Handle errors
                }
            } else {
                console.error(`Unsupported resource type: ${service.name}`);
            }
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
                <div className="popup-selection">
                    <label htmlFor="cloud-select">Select Target Cloud:</label>
                    <select
                        id="cloud-select"
                        value={selectedCloud}
                        onChange={(e) => setSelectedCloud(e.target.value)}
                    >
                        <option value="">-- Select Cloud --</option>
                        {cloudOptions.map((cloud) => (
                            <option key={cloud.id} value={cloud.id}>
                                {cloud.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="popup-selection">
                    <label htmlFor="address-range">Address Range (CIDR):</label>
                    <input
                        id="address-range"
                        type="text"
                        placeholder="e.g., 192.168.0.0/16"
                        value={addressRange}
                        onChange={(e) => setAddressRange(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontSize: "1rem",
                        }}
                    />
                </div>
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
                        disabled={!selectedCloud || !addressRange} // Ensure cloud and CIDR are mandatory
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
