import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
  Box,
  Divider,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { getProviderDistribution } from "../services/dashboardService";

const providerColors: Record<string, string> = {
  AWS: "#0070F3",
  AZURE: "#7928CA",
  GCP: "#00C7B7",
};
interface ResourceDistributionByProvider {
  [provider: string]: number;
}



export function CostDistributionChart() {
  const theme = useTheme();
  const [data, setData] = useState<{ name: string; value: number; color: string }[]>([]);

  // Get projectId from sessionStorage
  const projectId = sessionStorage.getItem('selectedProjectId');

  useEffect(() => {
    if (!projectId) return;
    getProviderDistribution(projectId).then((distribution: ResourceDistributionByProvider) => {
      const chartData = Object.entries(distribution).map(([name, value]) => ({
        name,
        value,
        color: providerColors[name] || "#ccc",
      }));
      setData(chartData);
    });
  }, [projectId]);

  return (
    <Card
      sx={{
        backgroundColor: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(6px)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: 4,
          background: "linear-gradient(to right, #0070F3, #7928CA, #00C7B7)",
        }}
      />

      <CardHeader
        title={
          <Typography variant="h6" fontWeight={600} color="primary">
            Cloud Provider Resource Distribution
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            Breakdown of resources by cloud provider
          </Typography>
        }
      />

      <Divider />

      <CardContent>
        <Box sx={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                stroke="#ffffff"
                strokeWidth={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value: number) => [`${value}%`, "Percentage"]}
                contentStyle={{
                  backgroundColor: "rgba(255,255,255,0.95)",
                  borderRadius: 8,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.shadows[2],
                }}
              />

              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value: string, entry: any) => (
                  <span style={{ color: entry.color, fontSize: 13 }}>
                    {value} {entry.payload?.value ?? 0}%
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
