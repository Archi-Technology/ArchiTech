"use client"

export default function OldDashboard() {
  // Sample data for regions and costs
  const regionData = [
    {
      name: "us-east-1",
      percentage: 18,
      color: "#3b82f6",
      cost: 896.55,
      resources: 23,
      latency: 12,
      status: "healthy",
    },
    {
      name: "us-west-2",
      percentage: 15,
      color: "#8b5cf6",
      cost: 747.26,
      resources: 19,
      latency: 15,
      status: "healthy",
    },
    {
      name: "eu-west-1",
      percentage: 12,
      color: "#10b981",
      cost: 597.81,
      resources: 15,
      latency: 28,
      status: "healthy",
    },
    {
      name: "ap-southeast-1",
      percentage: 10,
      color: "#f59e0b",
      cost: 498.18,
      resources: 13,
      latency: 45,
      status: "warning",
    },
    { name: "us-west-1", percentage: 8, color: "#ef4444", cost: 398.54, resources: 10, latency: 18, status: "healthy" },
    {
      name: "eu-central-1",
      percentage: 7,
      color: "#06b6d4",
      cost: 348.72,
      resources: 9,
      latency: 32,
      status: "healthy",
    },
    {
      name: "ap-northeast-1",
      percentage: 6,
      color: "#8b5cf6",
      cost: 298.91,
      resources: 8,
      latency: 38,
      status: "healthy",
    },
    {
      name: "ap-southeast-2",
      percentage: 6,
      color: "#14b8a6",
      cost: 298.91,
      resources: 8,
      latency: 52,
      status: "healthy",
    },
    {
      name: "ca-central-1",
      percentage: 5,
      color: "#84cc16",
      cost: 249.09,
      resources: 6,
      latency: 22,
      status: "healthy",
    },
    {
        name: "ca-central-1",
        percentage: 5,
        color: "#84cc16",
        cost: 249.09,
        resources: 6,
        latency: 22,
        status: "healthy",
      },
      {
        name: "ca-central-1",
        percentage: 5,
        color: "#84cc16",
        cost: 249.09,
        resources: 6,
        latency: 22,
        status: "healthy",
      },
    { name: "ap-south-1", percentage: 5, color: "#f97316", cost: 249.09, resources: 6, latency: 48, status: "warning" },
    { name: "eu-north-1", percentage: 4, color: "#ec4899", cost: 199.27, resources: 5, latency: 35, status: "healthy" },
    { name: "sa-east-1", percentage: 4, color: "#6366f1", cost: 199.27, resources: 5, latency: 65, status: "critical" },
  ]

  const costData = {
    aws: 2847.5,
    azure: 2134.25,
    gcp: 0,
    total: 4981.75,
    dailyAverage: 165.39,
    weeklyTrend: 3.2,
    monthlyGrowth: 12.5,
  }

  const performanceMetrics = {
    cpuUtilization: 68,
    memoryUsage: 74,
    diskUsage: 45,
    networkThroughput: 82,
    responseTime: 245,
    errorRate: 0.12,
    uptime: 99.97,
    activeConnections: 1247,
  }

  const securityMetrics = {
    vulnerabilities: { critical: 2, high: 8, medium: 15, low: 23 },
    complianceScore: 94,
    securityIncidents: 3,
    patchCompliance: 87,
    accessAttempts: { successful: 1456, failed: 23 },
    firewallBlocks: 156,
  }

  const storageMetrics = {
    totalStorage: 2.4, // TB
    usedStorage: 1.8, // TB
    storageGrowth: 8.5, // % monthly
    backupSize: 0.9, // TB
    backupSuccess: 98.5, // %
    compressionRatio: 2.3,
  }

  const databaseMetrics = {
    connections: 45,
    maxConnections: 100,
    queryTime: 125, // ms
    slowQueries: 12,
    cacheHitRatio: 94.2,
    replicationLag: 0.8, // seconds
  }

  const apiMetrics = {
    totalRequests: 125000,
    successfulRequests: 123750,
    failedRequests: 1250,
    averageResponseTime: 180,
    rateLimit: 1000,
    currentRate: 847,
  }

  const alertsData = [
    { id: 1, type: "critical", message: "High CPU usage in us-east-1", time: "2 min ago", status: "active" },
    { id: 2, type: "warning", message: "Storage usage above 80% in eu-west-1", time: "15 min ago", status: "active" },
    { id: 3, type: "info", message: "Scheduled maintenance completed", time: "1 hour ago", status: "resolved" },
    {
      id: 4,
      type: "warning",
      message: "Network latency spike in ap-south-1",
      time: "2 hours ago",
      status: "investigating",
    },
    { id: 5, type: "critical", message: "Database connection pool exhausted", time: "3 hours ago", status: "resolved" },
  ]

  const complianceData = [
    { framework: "SOC 2", score: 96, status: "compliant", lastAudit: "2024-01-15" },
    { framework: "ISO 27001", score: 94, status: "compliant", lastAudit: "2024-01-10" },
    { framework: "GDPR", score: 92, status: "compliant", lastAudit: "2024-01-20" },
    { framework: "HIPAA", score: 89, status: "minor-issues", lastAudit: "2024-01-12" },
    { framework: "PCI DSS", score: 97, status: "compliant", lastAudit: "2024-01-18" },
  ]

  const resourceTags = [
    { tag: "Environment", values: { production: 45, staging: 25, development: 30 } },
    { tag: "Team", values: { frontend: 35, backend: 40, devops: 25 } },
    { tag: "Cost Center", values: { engineering: 60, marketing: 25, sales: 15 } },
  ]

  const networkTopology = [
    { connection: "Internet Gateway", status: "healthy", bandwidth: "10 Gbps", utilization: 23 },
    { connection: "NAT Gateway", status: "healthy", bandwidth: "5 Gbps", utilization: 45 },
    { connection: "VPN Connection", status: "healthy", bandwidth: "1 Gbps", utilization: 67 },
    { connection: "Direct Connect", status: "warning", bandwidth: "10 Gbps", utilization: 89 },
    { connection: "Load Balancer", status: "healthy", bandwidth: "20 Gbps", utilization: 34 },
  ]

  const capacityPlanning = {
    compute: { current: 68, projected: 85, recommendation: "Scale up in 2 weeks" },
    storage: { current: 75, projected: 92, recommendation: "Add 500GB in 1 week" },
    network: { current: 45, projected: 67, recommendation: "Monitor closely" },
    database: { current: 52, projected: 78, recommendation: "Optimize queries" },
  }

  const costOptimization = [
    { resource: "Unused EBS Volumes", potential: 245.5, priority: "high" },
    { resource: "Idle EC2 Instances", potential: 189.25, priority: "high" },
    { resource: "Oversized RDS", potential: 156.75, priority: "medium" },
    { resource: "Unattached EIPs", potential: 89.5, priority: "low" },
    { resource: "Old Snapshots", potential: 67.25, priority: "low" },
  ]

  const userActivity = {
    activeUsers: 1247,
    newUsers: 89,
    sessionDuration: 24.5, // minutes
    bounceRate: 23.4,
    topPages: [
      { page: "/dashboard", visits: 2456 },
      { page: "/analytics", visits: 1789 },
      { page: "/settings", visits: 1234 },
    ],
  }

  const backupStatus = [
    { service: "Database", lastBackup: "2 hours ago", size: "450 MB", status: "success" },
    { service: "File Storage", lastBackup: "4 hours ago", size: "2.1 GB", status: "success" },
    { service: "Configuration", lastBackup: "1 day ago", size: "15 MB", status: "success" },
    { service: "Logs", lastBackup: "6 hours ago", size: "890 MB", status: "warning" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6-fix">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resource Status Dashboard</h1>
            <p className="text-gray-600 mt-2">Comprehensive overview of your cloud infrastructure</p>
          </div>
          <div className="flex space-x-4">
            <div className="bg-white rounded-lg shadow-sm border px-4 py-2">
              <div className="text-sm text-gray-600">Last Updated</div>
              <div className="text-lg font-semibold">2 min ago</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border px-4 py-2">
              <div className="text-sm text-gray-600">Status</div>
              <div className="text-lg font-semibold text-green-600">Operational</div>
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-3 animate-pulse"></div>
            <div>
              <h3 className="text-red-800 font-semibold">Active Alerts</h3>
              <p className="text-red-700 text-sm">2 critical alerts require immediate attention</p>
            </div>
          </div>
        </div>

        {/* Main Grid - Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Cloud Provider Cost Distribution */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-semibold text-blue-600">Cloud Provider Cost Distribution</h2>
              <p className="text-sm text-gray-600">Breakdown of costs by cloud provider</p>
            </div>

            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <div className="donut-chart">
                  <div
                    className="donut-segment aws"
                    style={{
                      background: `conic-gradient(#3b82f6 0deg 206deg, transparent 206deg)`,
                    }}
                  ></div>
                  <div
                    className="donut-segment azure"
                    style={{
                      background: `conic-gradient(transparent 0deg 206deg, #8b5cf6 206deg 360deg, transparent 360deg)`,
                    }}
                  ></div>
                  <div className="donut-hole"></div>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-6 text-sm mb-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-teal-400 rounded mr-2"></div>
                <span>GCP 0%</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-600 rounded mr-2"></div>
                <span>AZURE 42.86%</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded mr-2"></div>
                <span>AWS 57.14%</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t">
              <div>
                <div className="text-xl font-bold text-blue-600">${costData.dailyAverage}</div>
                <div className="text-xs text-gray-600">Daily Average</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-600">+{costData.weeklyTrend}%</div>
                <div className="text-xs text-gray-600">Weekly Trend</div>
              </div>
              <div>
                <div className="text-xl font-bold text-purple-600">{costData.monthlyGrowth}%</div>
                <div className="text-xs text-gray-600">Monthly Growth</div>
              </div>
            </div>
          </div>

          {/* Resource Distribution */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-semibold text-blue-600">Resource Distribution</h2>
              <p className="text-sm text-gray-600">Active resources by service type</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                  <span className="text-sm font-medium">Storage</span>
                </div>
                <span className="text-sm font-semibold">14.29%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: "14.29%" }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-600 rounded mr-3"></div>
                  <span className="text-sm font-medium">Compute</span>
                </div>
                <span className="text-sm font-semibold">35.71%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: "35.71%" }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-teal-500 rounded mr-3"></div>
                  <span className="text-sm font-medium">Network</span>
                </div>
                <span className="text-sm font-semibold">50%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-teal-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Resource Health</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">98</div>
                  <div className="text-xs text-gray-600">Healthy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">5</div>
                  <div className="text-xs text-gray-600">Warning</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">2</div>
                  <div className="text-xs text-gray-600">Critical</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">CPU Utilization</h3>
              <span className="text-2xl font-bold text-blue-600">{performanceMetrics.cpuUtilization}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${performanceMetrics.cpuUtilization}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-2">Optimal range: 60-80%</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">Memory Usage</h3>
              <span className="text-2xl font-bold text-purple-600">{performanceMetrics.memoryUsage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-purple-600 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${performanceMetrics.memoryUsage}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-2">Available: {100 - performanceMetrics.memoryUsage}%</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">Disk Usage</h3>
              <span className="text-2xl font-bold text-green-600">{performanceMetrics.diskUsage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${performanceMetrics.diskUsage}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-2">Free space: {100 - performanceMetrics.diskUsage}%</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">Network I/O</h3>
              <span className="text-2xl font-bold text-orange-600">{performanceMetrics.networkThroughput}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-orange-600 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${performanceMetrics.networkThroughput}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-2">Bandwidth utilization</div>
          </div>
        </div>

        {/* Second Row - Regions and Cost Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Distribution Chart by Region */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-semibold text-blue-600">Distribution by Region</h2>
              <p className="text-sm text-gray-600">Resource distribution across geographical regions</p>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {regionData.map((region, index) => (
                <div key={region.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded mr-3" style={{ backgroundColor: region.color }}></div>
                      <span className="text-sm font-medium">{region.name}</span>
                      <div
                        className={`ml-2 w-2 h-2 rounded-full ${
                          region.status === "healthy"
                            ? "bg-green-500"
                            : region.status === "warning"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold">{region.percentage}%</span>
                      <div className="text-xs text-gray-500">${region.cost}</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${region.percentage}%`,
                        backgroundColor: region.color,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{region.resources} resources</span>
                    <span>{region.latency}ms latency</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-xs text-gray-600">Active Regions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">127</div>
                  <div className="text-xs text-gray-600">Total Resources</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">99.9%</div>
                  <div className="text-xs text-gray-600">Availability</div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Cost Calculating Box */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-semibold text-blue-600">Cost Calculator</h2>
              <p className="text-sm text-gray-600">Current spending and budget analysis</p>
            </div>

            <div className="space-y-4">
              {/* Current Costs */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Current Month Costs</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">AWS</span>
                    <span className="text-sm font-medium">${costData.aws.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Azure</span>
                    <span className="text-sm font-medium">${costData.azure.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">GCP</span>
                    <span className="text-sm font-medium">${costData.gcp.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-800">Total</span>
                      <span className="text-lg font-bold text-blue-600">${costData.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Cost Display */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">${costData.total.toLocaleString()}</div>
                  <div className="text-sm text-blue-700">Total Current Costs</div>
                </div>
              </div>

              {/* Cost Breakdown Chart */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700">Cost Distribution</h3>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">AWS (57.14%)</span>
                    <span className="text-sm font-medium">${costData.aws.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: "57.14%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Azure (42.86%)</span>
                    <span className="text-sm font-medium">${costData.azure.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: "42.86%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">GCP (0%)</span>
                    <span className="text-sm font-medium">${costData.gcp.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Cost Optimization */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-green-800 mb-2">Potential Savings</h3>
                <div className="text-2xl font-bold text-green-600">$748.25</div>
                <div className="text-xs text-green-700">Monthly optimization opportunities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Security and Compliance Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Security Metrics */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-semibold text-red-600">Security Overview</h2>
              <p className="text-sm text-gray-600">Security posture and threat monitoring</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-600">{securityMetrics.vulnerabilities.critical}</div>
                  <div className="text-sm text-red-700">Critical Vulnerabilities</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-600">{securityMetrics.vulnerabilities.high}</div>
                  <div className="text-sm text-orange-700">High Risk Issues</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Compliance Score</span>
                  <span className="text-lg font-bold text-green-600">{securityMetrics.complianceScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${securityMetrics.complianceScore}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-blue-600">{securityMetrics.accessAttempts.successful}</div>
                  <div className="text-xs text-gray-600">Successful Logins</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-red-600">{securityMetrics.accessAttempts.failed}</div>
                  <div className="text-xs text-gray-600">Failed Attempts</div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-700">Firewall Blocks (24h)</span>
                  <span className="text-lg font-bold text-blue-600">{securityMetrics.firewallBlocks}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Status */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-semibold text-green-600">Compliance Status</h2>
              <p className="text-sm text-gray-600">Regulatory compliance monitoring</p>
            </div>

            <div className="space-y-4">
              {complianceData.map((compliance, index) => (
                <div key={compliance.framework} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">{compliance.framework}</h3>
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        compliance.status === "compliant"
                          ? "bg-green-100 text-green-800"
                          : compliance.status === "minor-issues"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {compliance.status.replace("-", " ").toUpperCase()}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Score: {compliance.score}%</span>
                    <span className="text-sm text-gray-500">Last audit: {compliance.lastAudit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        compliance.score >= 95
                          ? "bg-green-500"
                          : compliance.score >= 90
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${compliance.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Storage and Database Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Storage Analytics */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-semibold text-purple-600">Storage Analytics</h2>
              <p className="text-sm text-gray-600">Storage utilization and backup status</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">{storageMetrics.totalStorage} TB</div>
                  <div className="text-sm text-purple-700">Total Storage</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">{storageMetrics.usedStorage} TB</div>
                  <div className="text-sm text-blue-700">Used Storage</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Storage Utilization</span>
                  <span className="text-sm font-semibold">
                    {Math.round((storageMetrics.usedStorage / storageMetrics.totalStorage) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-purple-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${(storageMetrics.usedStorage / storageMetrics.totalStorage) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-green-600">{storageMetrics.storageGrowth}%</div>
                  <div className="text-xs text-gray-600">Monthly Growth</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600">{storageMetrics.backupSize} TB</div>
                  <div className="text-xs text-gray-600">Backup Size</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-orange-600">{storageMetrics.compressionRatio}x</div>
                  <div className="text-xs text-gray-600">Compression</div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">Backup Success Rate</span>
                  <span className="text-lg font-bold text-green-600">{storageMetrics.backupSuccess}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Database Performance */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-semibold text-indigo-600">Database Performance</h2>
              <p className="text-sm text-gray-600">Database metrics and optimization</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-indigo-600">{databaseMetrics.connections}</div>
                  <div className="text-sm text-indigo-700">Active Connections</div>
                  <div className="text-xs text-gray-500">Max: {databaseMetrics.maxConnections}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">{databaseMetrics.queryTime}ms</div>
                  <div className="text-sm text-green-700">Avg Query Time</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Connection Pool Usage</span>
                  <span className="text-sm font-semibold">
                    {Math.round((databaseMetrics.connections / databaseMetrics.maxConnections) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-indigo-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${(databaseMetrics.connections / databaseMetrics.maxConnections) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-red-600">{databaseMetrics.slowQueries}</div>
                  <div className="text-xs text-gray-600">Slow Queries</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600">{databaseMetrics.cacheHitRatio}%</div>
                  <div className="text-xs text-gray-600">Cache Hit Rate</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-orange-600">{databaseMetrics.replicationLag}s</div>
                  <div className="text-xs text-gray-600">Replication Lag</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Cache Hit Ratio</span>
                  <span className="text-sm font-semibold">{databaseMetrics.cacheHitRatio}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${databaseMetrics.cacheHitRatio}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API and Network Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* API Metrics */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-semibold text-cyan-600">API Performance</h2>
              <p className="text-sm text-gray-600">API usage and performance metrics</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cyan-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-cyan-600">{apiMetrics.totalRequests.toLocaleString()}</div>
                  <div className="text-sm text-cyan-700">Total Requests</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">{apiMetrics.averageResponseTime}ms</div>
                  <div className="text-sm text-green-700">Avg Response Time</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="text-sm font-semibold">
                    {((apiMetrics.successfulRequests / apiMetrics.totalRequests) * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${(apiMetrics.successfulRequests / apiMetrics.totalRequests) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-green-600">
                    {apiMetrics.successfulRequests.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">Successful</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-red-600">{apiMetrics.failedRequests.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Failed</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Rate Limit Usage</span>
                  <span className="text-sm font-semibold">
                    {Math.round((apiMetrics.currentRate / apiMetrics.rateLimit) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-cyan-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(apiMetrics.currentRate / apiMetrics.rateLimit) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {apiMetrics.currentRate}/{apiMetrics.rateLimit} requests/min
                </div>
              </div>
            </div>
          </div>

          {/* Network Topology */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-semibold text-teal-600">Network Topology</h2>
              <p className="text-sm text-gray-600">Network infrastructure status</p>
            </div>

            <div className="space-y-4">
              {networkTopology.map((connection, index) => (
                <div key={connection.connection} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">{connection.connection}</h3>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        connection.status === "healthy"
                          ? "bg-green-500"
                          : connection.status === "warning"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Bandwidth: {connection.bandwidth}</span>
                    <span className="text-sm text-gray-600">Utilization: {connection.utilization}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        connection.utilization > 80
                          ? "bg-red-500"
                          : connection.utilization > 60
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${connection.utilization}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts and Activity Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Active Alerts */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-semibold text-red-600">Active Alerts</h2>
              <p className="text-sm text-gray-600">System alerts and notifications</p>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {alertsData.map((alert) => (
                <div
                  key={alert.id}
                  className={`border-l-4 p-4 rounded ${
                    alert.type === "critical"
                      ? "border-red-500 bg-red-50"
                      : alert.type === "warning"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-blue-500 bg-blue-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div
                        className={`text-sm font-semibold ${
                          alert.type === "critical"
                            ? "text-red-800"
                            : alert.type === "warning"
                              ? "text-yellow-800"
                              : "text-blue-800"
                        }`}
                      >
                        {alert.type.toUpperCase()}
                      </div>
                      <div className="text-sm text-gray-700 mt-1">{alert.message}</div>
                      <div className="text-xs text-gray-500 mt-2">{alert.time}</div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        alert.status === "active"
                          ? "bg-red-100 text-red-800"
                          : alert.status === "investigating"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {alert.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Activity */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-semibold text-indigo-600">User Activity</h2>
              <p className="text-sm text-gray-600">User engagement and activity metrics</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-indigo-600">{userActivity.activeUsers.toLocaleString()}</div>
                  <div className="text-sm text-indigo-700">Active Users</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">{userActivity.newUsers}</div>
                  <div className="text-sm text-green-700">New Users</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-600">{userActivity.sessionDuration}min</div>
                  <div className="text-xs text-gray-600">Avg Session</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-orange-600">{userActivity.bounceRate}%</div>
                  <div className="text-xs text-gray-600">Bounce Rate</div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700">Top Pages</h3>
                {userActivity.topPages.map((page, index) => (
                  <div key={page.page} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{page.page}</span>
                    <span className="text-sm font-medium">{page.visits.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Capacity Planning and Optimization Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Capacity Planning */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-semibold text-purple-600">Capacity Planning</h2>
              <p className="text-sm text-gray-600">Resource capacity and growth projections</p>
            </div>

            <div className="space-y-4">
              {Object.entries(capacityPlanning).map(([resource, data]) => (
                <div key={resource} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800 capitalize">{resource}</h3>
                    <span className="text-sm text-gray-600">
                      {data.current}% → {data.projected}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className={`h-3 rounded-full transition-all duration-1000 ${
                        data.projected > 90 ? "bg-red-500" : data.projected > 75 ? "bg-yellow-500" : "bg-green-500"
                      }`}
                      style={{ width: `${data.current}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600">{data.recommendation}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Optimization */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-semibold text-green-600">Cost Optimization</h2>
              <p className="text-sm text-gray-600">Potential cost savings opportunities</p>
            </div>

            <div className="space-y-4">
              {costOptimization.map((item, index) => (
                <div key={item.resource} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">{item.resource}</h3>
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        item.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : item.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item.priority.toUpperCase()}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Potential Monthly Savings</span>
                    <span className="text-lg font-bold text-green-600">${item.potential}</span>
                  </div>
                </div>
              ))}

              <div className="bg-green-50 rounded-lg p-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${costOptimization.reduce((sum, item) => sum + item.potential, 0).toFixed(2)}
                  </div>
                  <div className="text-sm text-green-700">Total Monthly Savings Potential</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resource Tags and Backup Status Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Resource Tags Analysis */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-semibold text-orange-600">Resource Tags Analysis</h2>
              <p className="text-sm text-gray-600">Resource organization and tagging</p>
            </div>

            <div className="space-y-6">
              {resourceTags.map((tagGroup, index) => (
                <div key={tagGroup.tag}>
                  <h3 className="font-semibold text-gray-800 mb-3">{tagGroup.tag}</h3>
                  <div className="space-y-2">
                    {Object.entries(tagGroup.values).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600 capitalize">{key}</span>
                          <span className="text-sm font-medium">{value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backup Status */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-semibold text-blue-600">Backup Status</h2>
              <p className="text-sm text-gray-600">Backup and disaster recovery status</p>
            </div>

            <div className="space-y-4">
              {backupStatus.map((backup, index) => (
                <div key={backup.service} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">{backup.service}</h3>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        backup.status === "success"
                          ? "bg-green-500"
                          : backup.status === "warning"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Last Backup:</span>
                      <div className="font-medium">{backup.lastBackup}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Size:</span>
                      <div className="font-medium">{backup.size}</div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">98.5%</div>
                  <div className="text-sm text-blue-700">Overall Backup Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Summary */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{performanceMetrics.uptime}%</div>
              <div className="text-sm text-gray-600">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{performanceMetrics.activeConnections}</div>
              <div className="text-sm text-gray-600">Active Connections</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{performanceMetrics.responseTime}ms</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{performanceMetrics.errorRate}%</div>
              <div className="text-sm text-gray-600">Error Rate</div>
            </div>
          </div>
        </div>
      </div>

      <style >{`
        .donut-chart {
          position: relative;
          width: 192px;
          height: 192px;
          border-radius: 50%;
          background: conic-gradient(
            #3b82f6 0deg 206deg,
            #8b5cf6 206deg 360deg
          );
          animation: rotate 10s linear infinite;
        }
        
        .donut-hole {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 96px;
          height: 96px;
          background: white;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }

        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        .duration-1000 {
          transition-duration: 1000ms;
        }

        .duration-500 {
          transition-duration: 500ms;
        }

        .ease-out {
          transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
        }

        .max-h-96 {
          max-height: 24rem;
        }

        .max-h-80 {
          max-height: 20rem;
        }

        .overflow-y-auto {
          overflow-y: auto;
        }

        .scrollbar-thin {
          scrollbar-width: thin;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        .hover-scale:hover {
          transform: scale(1.02);
          transition: transform 0.2s ease-in-out;
        }

        .shadow-hover:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transition: box-shadow 0.3s ease-in-out;
        }

        .gradient-bg {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .text-shadow {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .border-gradient {
          border-image: linear-gradient(45deg, #3b82f6, #8b5cf6) 1;
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-bounce-in {
          animation: bounceIn 0.8s ease-out;
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .progress-bar {
          position: relative;
          overflow: hidden;
        }

        .progress-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        .metric-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .metric-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .status-indicator {
          position: relative;
        }

        .status-indicator::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .status-indicator.healthy::before {
          background: rgba(34, 197, 94, 0.4);
        }

        .status-indicator.warning::before {
          background: rgba(251, 191, 36, 0.4);
        }

        .status-indicator.critical::before {
          background: rgba(239, 68, 68, 0.4);
        }

        @keyframes ping {
          75%, 100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }

        .data-visualization {
          position: relative;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .chart-container {
          position: relative;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .loading-skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        .tooltip {
          position: relative;
        }

        .tooltip:hover::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          white-space: nowrap;
          z-index: 1000;
          opacity: 1;
          animation: tooltipFadeIn 0.2s ease-in-out;
        }

        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
