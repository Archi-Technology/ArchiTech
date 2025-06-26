import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  useTheme,
  Divider,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import { Sidebar } from "../../components/sidebar";
import { Header } from "../../components/header";
import { MetricCard } from "../../components/metric-card";
import { CostDistributionChart } from "../../components/cost-distribution-chart";
import { ResourceDistribution } from "../../components/resource-distribution";
import { StatusCard } from "../../components/status-card";
import { TerminalCard } from "../../components/terminal-card";
import { Cpu, HardDrive, Activity, DollarSign } from "lucide-react";
import CostCalculator from "./CostCalculator";
import RegionDistribution from "./RegionDistribution";
import { getAllProjects } from "../../services/projectService";

export default function Dashboard() {
  const theme = useTheme();
  const [projects, setProjects] = useState<{ _id: string; name: string }[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");

  useEffect(() => {
    getAllProjects().then((data) => {
      setProjects(data);
      // Set default project id from sessionStorage or first project
      const savedId = sessionStorage.getItem("selectedProjectId");
      if (savedId && data.some((p: any) => p._id === savedId)) {
        setSelectedProjectId(savedId);
      } else if (data.length > 0) {
        setSelectedProjectId(data[0]._id);
        sessionStorage.setItem("selectedProjectId", data[0]._id);
      }
    });
  }, []);

  // Update sessionStorage when project changes
  useEffect(() => {
    if (selectedProjectId) {
      sessionStorage.setItem("selectedProjectId", selectedProjectId);
    }
  }, [selectedProjectId]);

  return (
    <Box display="flex" height="92vh" bgcolor={theme.palette.grey[100]}>
      {/* <TechBackground /> */}
      {/* <Sidebar /> */}

      <Box flex={1} display="flex" flexDirection="column" overflow="hidden">
        {/* <Header /> */}

        <Box component="main" flex={1} overflow="auto" p={3}>
          <Box display="flex" alignItems="center" mb={2} gap={2}>
            <Typography variant="h5" fontWeight={600}>
              Resource Status
            </Typography>
            <FormControl size="small" sx={{ minWidth: 220 }}>
              <InputLabel id="project-select-label">Select Project</InputLabel>
              <Select
                labelId="project-select-label"
                value={selectedProjectId}
                label="Select Project"
                onChange={(e) => setSelectedProjectId(e.target.value)}
              >
                {projects.map((project) => (
                  <MenuItem key={project._id} value={project._id}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Grid container spacing={3}>
            {/* Left Column */}
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography color="textSecondary" mb={2}>
                  Cloud Provider Distribution
                </Typography>
                <CostDistributionChart projectId={selectedProjectId} />
              </Paper>

              <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <RegionDistribution projectId={selectedProjectId} />
              </Paper>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 3 }}>
                <CostCalculator projectId={selectedProjectId} />
              </Box>
              <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography color="textSecondary" mb={2}>
                  Active resources by type
                </Typography>
                <ResourceDistribution projectId={selectedProjectId} />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
