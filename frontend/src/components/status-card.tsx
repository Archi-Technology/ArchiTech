import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Chip,
  Divider,
  useTheme,
} from "@mui/material";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "maintenance";
  lastUpdated: string;
}

const services: ServiceStatus[] = [
  { name: "API Gateway", status: "operational", lastUpdated: "2 min ago" },
  { name: "Database Cluster", status: "operational", lastUpdated: "5 min ago" },
  { name: "Authentication Service", status: "degraded", lastUpdated: "10 min ago" },
  { name: "Storage Service", status: "maintenance", lastUpdated: "1 hour ago" },
];

export function StatusCard() {
  const theme = useTheme();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle size={18} color={theme.palette.success.main} />;
      case "degraded":
        return <AlertCircle size={18} color={theme.palette.warning.main} />;
      case "maintenance":
        return <Clock size={18} color={theme.palette.info.main} />;
      default:
        return null;
    }
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case "operational":
        return <Chip label="Operational" size="small" color="success" />;
      case "degraded":
        return <Chip label="Degraded" size="small" color="warning" />;
      case "maintenance":
        return <Chip label="Maintenance" size="small" color="info" />;
      default:
        return null;
    }
  };

  return (
    <Card sx={{ backdropFilter: "blur(6px)", bgcolor: "rgba(255,255,255,0.85)" }}>
      <Box sx={{ height: 4, background: "linear-gradient(to right, #4caf50, #ff9800, #2196f3)" }} />
      <CardHeader
        title={
          <Typography variant="h6" fontWeight={600} color="primary">
            Service Status
          </Typography>
        }
        subheader="Current status of critical services"
      />
      <CardContent>
        {services.map((service, index) => (
          <Box
            key={service.name}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            bgcolor={theme.palette.grey[50]}
            borderRadius={2}
            border={`1px solid ${theme.palette.divider}`}
            mb={index < services.length - 1 ? 2 : 0}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              {getStatusIcon(service.status)}
              <Typography fontWeight={500}>{service.name}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1.5}>
              {getStatusChip(service.status)}
              <Typography variant="caption" color="text.secondary">
                {service.lastUpdated}
              </Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
