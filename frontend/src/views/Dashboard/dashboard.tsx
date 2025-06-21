import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  useTheme,
  Divider,
} from '@mui/material';
import { Sidebar } from '../../components/sidebar'; 
import { Header } from '../../components/header';
import { MetricCard } from '../../components/metric-card';
import { CostDistributionChart } from '../../components/cost-distribution-chart';
import { ResourceDistribution } from '../../components/resource-distribution';
import { StatusCard } from '../../components/status-card';
import { TerminalCard } from '../../components/terminal-card';
import { Cpu, HardDrive, Activity, DollarSign } from 'lucide-react';
import  CostCalculator  from './CostCalculator';
import RegionDistribution from "./RegionDistribution"; // Add this import

export default function Dashboard() {
  const theme = useTheme();

  return (
    <Box display="flex" height="100vh" bgcolor={theme.palette.grey[100]}>
      {/* <TechBackground /> */}
      <Sidebar />

      <Box flex={1} display="flex" flexDirection="column" overflow="hidden">
        <Header />

        <Box component="main" flex={1} overflow="auto" p={3}>
          <Typography variant="h5" fontWeight={600} mb={2}>
            Resource Status
          </Typography>

          <Grid container spacing={3}>
            {/* Left Column */}
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography color="textSecondary" mb={2}>
                  Cloud Provider Distribution
                </Typography>
                <CostDistributionChart />
              </Paper>

              <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <RegionDistribution />
              </Paper>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 3 }}>
                <CostCalculator />
              </Box>
              <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography color="textSecondary" mb={2}>
                  Active resources by type
                </Typography>
                <ResourceDistribution />
              </Paper>

              
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
