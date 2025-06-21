import React from "react";
import "./SecurityPosture.css";

export default function SecurityPosture() {
  const secure = 85;
  const insecure = 15;

  return (
    <div className="card">
      <h3 className="card-title">Security Posture</h3>
      <p className="card-subtitle">Secure vs. insecure resources</p>

      <div className="security-bar">
        <div
          className="secure-fill"
          style={{ width: `${secure}%` }}
        ></div>
        <div
          className="insecure-fill"
          style={{ width: `${insecure}%` }}
        ></div>
      </div>

      <div className="security-legend">
        <div className="legend-item">
          <div className="legend-color secure"></div> Secure ({secure}%)
        </div>
        <div className="legend-item">
          <div className="legend-color insecure"></div> Insecure ({insecure}%)
        </div>
      </div>
    </div>
  );
}
