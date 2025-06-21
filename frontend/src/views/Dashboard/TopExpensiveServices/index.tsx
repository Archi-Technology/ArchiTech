import React from "react";
import "./TopExpensiveServices.css";

export default function TopExpensiveServices() {
  const services = [
    { name: "EC2 Instances", cost: 2000 },
    { name: "Azure VMs", cost: 1500 },
    { name: "GCP Compute", cost: 1000 },
    { name: "AWS S3", cost: 800 },
    { name: "Azure SQL", cost: 500 },
  ];

  return (
    <div className="card">
      <h3 className="card-title">Top 5 Expensive Services</h3>
      <p className="card-subtitle">Current monthly cost per service</p>

      <table className="services-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Cost ($)</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>
              <td>${s.cost.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
