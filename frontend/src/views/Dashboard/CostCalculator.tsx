import React, { useState, useMemo, useEffect } from "react";
import { Box, Typography, Paper, LinearProgress, Divider } from "@mui/material";
import { getTotalPrice } from "../../services/dashboardService";

export default function CostCalculator({ projectId }: { projectId: string }) {
  const [costData, setCostData] = useState({
    AWS: 0,
    AZURE: 0,
    GCP: 0,
    total: 0,
  });

  useEffect(() => {
    if (!projectId) return;
    getTotalPrice(projectId).then((data) => {
      setCostData({
        AWS: data.AWS ?? 0,
        AZURE: data.AZURE ?? 0,
        GCP: data.GCP ?? 0,
        total: data.total ?? 0,
      });
    });
  }, [projectId]);

  const distribution = useMemo(() => {
    const awsPercent = costData.total ? ((costData.AWS / costData.total) * 100).toFixed(2) : "0.00";
    const azurePercent = costData.total ? ((costData.AZURE / costData.total) * 100).toFixed(2) : "0.00";
    const gcpPercent = costData.total ? ((costData.GCP / costData.total) * 100).toFixed(2) : "0.00";
    return {
      AWS: awsPercent,
      AZURE: azurePercent,
      GCP: gcpPercent,
    };
  }, [costData]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 0,
        borderRadius: 3,
        overflow: "hidden",
        background: "#fff",
        minWidth: 340,
      }}
    >
      {/* Top color line */}
      <Box
        sx={{
          height: 4,
          background: "linear-gradient(to right, #0070F3, #7928CA, #00C7B7)",
        }}
      />

      <Box sx={{ p: 3 }}>
        <Typography variant="h5" color="primary" fontWeight={700} gutterBottom>
          Cost Calculator
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Current spending and budget analysis
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Current Month Costs Section */}
        <Box
          sx={{
            mb: 3,
            bgcolor: "#f8fafd",
            borderRadius: 2,
            px: 3,
            py: 2.5,
          }}
        >
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Current Month Costs
          </Typography>
          <Box display="flex" justifyContent="space-between" fontWeight={500} mb={1}>
            <Typography>AWS</Typography>
            <Typography>${costData.AWS.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" fontWeight={500} mb={1}>
            <Typography>Azure</Typography>
            <Typography>${costData.AZURE.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" fontWeight={500}>
            <Typography>GCP</Typography>
            <Typography>${costData.GCP.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={700}>
              Total
            </Typography>
            <Typography variant="h6" fontWeight={700} color="primary">
              ${costData.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </Typography>
          </Box>
        </Box>

        {/* Highlighted Total */}
        <Box
          sx={{
            bgcolor: 'rgb(239, 246, 255)',
            textAlign: "center",
            p: 3,
            mb: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" color="primary" fontWeight={700}>
            ${costData.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Total Current Costs
          </Typography>
        </Box>

        {/* <Typography variant="h6" fontWeight={700} gutterBottom>
          Cost Distribution
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography fontWeight={500}>
              AWS <span style={{ color: "#0070F3" }}>({distribution.AWS}%)</span>
            </Typography>
            <Typography fontWeight={500}>${costData.AWS.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={parseFloat(distribution.AWS)}
            sx={{
              height: 10,
              borderRadius: 5,
              mb: 1,
              "& .MuiLinearProgress-bar": { backgroundColor: "#0070F3" },
            }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography fontWeight={500}>
              Azure <span style={{ color: "#7928CA" }}>({distribution.AZURE}%)</span>
            </Typography>
            <Typography fontWeight={500}>${costData.AZURE.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={parseFloat(distribution.AZURE)}
            sx={{
              height: 10,
              borderRadius: 5,
              mb: 1,
              backgroundColor: "#eee",
              "& .MuiLinearProgress-bar": { backgroundColor: "#7928CA" },
            }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography fontWeight={500}>
              GCP <span style={{ color: "#00C7B7" }}>({distribution.GCP}%)</span>
            </Typography>
            <Typography fontWeight={500}>${costData.GCP.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={parseFloat(distribution.GCP)}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#eee",
              "& .MuiLinearProgress-bar": { backgroundColor: "#00C7B7" },
            }}
          />
        </Box> */}
      </Box>
    </Paper>
  );
}
