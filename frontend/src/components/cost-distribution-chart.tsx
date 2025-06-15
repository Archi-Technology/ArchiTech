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

const data = [
  { name: "AWS", value: 44, color: "#0070F3" },
  { name: "Azure", value: 33, color: "#7928CA" },
  { name: "GCP", value: 23, color: "#00C7B7" },
];

export function CostDistributionChart() {
  const theme = useTheme();

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
            Cloud Provider Cost Distribution
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            Breakdown of costs by cloud provider
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
