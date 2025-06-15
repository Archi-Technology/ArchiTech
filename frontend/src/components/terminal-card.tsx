import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  Divider,
} from "@mui/material";
import { Terminal } from "lucide-react";

export function TerminalCard() {
  const theme = useTheme();

  const logs = [
    { type: "info", text: "System initialized" },
    { type: "load", text: "Loading resources from AWS region us-east-1" },
    { type: "load", text: "Loading resources from Azure West US" },
    { type: "warn", text: "High CPU usage detected on instance i-0123456789" },
    { type: "info", text: "Auto-scaling group triggered" },
    { type: "load", text: "Loading resources from GCP us-central1" },
    { type: "info", text: "All resources loaded successfully" },
  ];

  const getColor = (type: string) => {
    switch (type) {
      case "info":
        return "#4caf50";
      case "load":
        return "#2196f3";
      case "warn":
        return "#ff9800";
      default:
        return "#e0e0e0";
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: "#1e1e2f",
        color: "#ffffff",
        fontFamily: "monospace",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1.5,
          borderBottom: "1px solid #333",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ display: "flex", alignItems: "center", gap: 1, color: "#9ca3af" }}
        >
          <Terminal size={16} /> System Logs
        </Typography>
        <Box display="flex" gap={1}>
          <Box sx={{ width: 10, height: 10, bgcolor: "#f87171", borderRadius: "50%" }} />
          <Box sx={{ width: 10, height: 10, bgcolor: "#facc15", borderRadius: "50%" }} />
          <Box sx={{ width: 10, height: 10, bgcolor: "#4ade80", borderRadius: "50%" }} />
        </Box>
      </Box>

      <CardContent sx={{ fontSize: "0.8rem", p: 2 }}>
        {logs.map((log, index) => (
          <Typography
            key={index}
            sx={{ color: getColor(log.type), mb: 0.5 }}
          >
            [{log.type.toUpperCase()}]{' '}
            <span style={{ color: "#cbd5e1" }}>{log.text}</span>
          </Typography>
        ))}
        <Typography sx={{ color: "#6b7280", mt: 1 }}>$ _</Typography>
      </CardContent>
    </Card>
  );
}
