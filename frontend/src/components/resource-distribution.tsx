import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  useTheme,
  LinearProgress,
} from "@mui/material";
import { Database, Server, Zap, Shield } from "lucide-react";

const resources = [
  { name: "Storage", value: 45, icon: Database, color: "#0070F3" },
  { name: "Compute", value: 30, icon: Server, color: "#7928CA" },
  { name: "Network", value: 15, icon: Zap, color: "#00C7B7" },
  { name: "Security", value: 10, icon: Shield, color: "#009688" },
];

export function ResourceDistribution() {
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
          background: "linear-gradient(to right, #7928CA, #00C7B7, #009688)",
        }}
      />
      <CardHeader
        title={
          <Typography variant="h6" fontWeight={600} color="primary">
            Resource Distribution
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            Active resources by service type
          </Typography>
        }
      />
      <CardContent>
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <Box key={resource.name} mb={3}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: `${resource.color}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={16} color={resource.color} />
                  </Box>
                  <Typography fontSize={14} fontWeight={500}>
                    {resource.name}
                  </Typography>
                </Box>
                <Typography fontSize={14} fontWeight={600} color="text.primary">
                  {resource.value}%
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={resource.value}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: theme.palette.grey[200],
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: resource.color,
                  },
                }}
              />
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
}
