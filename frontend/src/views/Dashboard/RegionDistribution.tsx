import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  LinearProgress,
  Stack,
  useTheme,
} from "@mui/material";
import { getRegionDistribution } from "../../services/dashboardService"; // <-- Add this import

// Color palette for regions
const colorPalette = [
  "#2979ff", "#8e24aa", "#43a047", "#fb8c00", "#e53935", "#00acc1", "#7e57c2", "#c0ca33",
  "#f57c00", "#d81b60", "#5c6bc0", "#00897b", "#6d4c41", "#3949ab", "#ffb300",
];

interface ResourceDistributionByRegion {
  [region: string]: { count: number; percent: number };
}

export default function RegionDistribution({ projectId }: { projectId: string }) {
  const theme = useTheme();
  const [regionDistribution, setRegionDistribution] = useState<ResourceDistributionByRegion>({});

  useEffect(() => {
    if (!projectId) return;
    getRegionDistribution(projectId).then((data) => {
      setRegionDistribution(data);
    });
  }, [projectId]);

  const regionKeys = Object.keys(regionDistribution);

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(6px)",
        overflow: "hidden",
        borderRadius: 3,
        p: 0,
      }}
    >
      {/* Top color line for style consistency */}
      <Box
        sx={{
          height: 4,
          background: "linear-gradient(to right, #0070F3, #7928CA, #00C7B7)",
        }}
      />

      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} color="primary" gutterBottom>
          Distribution by Region
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Resource distribution across geographical regions
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={2}>
          {regionKeys.map((regionName, index) => {
            const regionData = regionDistribution[regionName];
            return (
              <Box key={regionName}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        backgroundColor: colorPalette[index % colorPalette.length],
                        mr: 1.2,
                      }}
                    />
                    <Typography fontSize={16} fontWeight={500}>
                      {regionName} <span style={{ color: "#888", fontWeight: 400 }}>({regionData.count})</span>
                    </Typography>
                  </Box>
                  <Typography fontSize={16} fontWeight={600} color="text.primary">
                    {regionData.percent}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={regionData.percent}
                  sx={{
                    mt: 1,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: theme.palette.grey[200],
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: colorPalette[index % colorPalette.length],
                    },
                  }}
                />
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
