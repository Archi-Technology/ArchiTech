import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import {
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  LucideIcon,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  color: string; // Accepts MUI colors: "blue", "purple", etc.
}

export function MetricCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
}: MetricCardProps) {
  const theme = useTheme();

  const changeColors = {
    positive: theme.palette.success.main,
    negative: theme.palette.error.main,
    neutral: theme.palette.text.secondary,
  };

  const ChangeIcon = {
    positive: ArrowUpRight,
    negative: ArrowDownRight,
    neutral: ArrowRight,
  }[changeType];

  return (
    <Card
      elevation={3}
      sx={{
        backgroundColor: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(6px)",
        overflow: "hidden",
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: 6 },
      }}
    >
      <Box
        sx={{
          height: 4,
          backgroundColor: color,
        }}
      />
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box
            sx={{
              p: 1.2,
              borderRadius: 2,
              backgroundColor: `${color}22`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={20} color={color} />
          </Box>
        </Box>

        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>

        <Typography variant="h5" fontWeight={700} color="primary" gutterBottom>
          {value}
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <ChangeIcon size={16} color={changeColors[changeType]} />
          <Typography variant="body2" color={changeColors[changeType]}>
            {change}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
