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
                  Cloud Provider Cost Distribution
                </Typography>
                <CostDistributionChart />
              </Paper>

              <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography color="textSecondary" mb={2}>
                  Service Status
                </Typography>
                <StatusCard />
              </Paper>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography color="textSecondary" mb={2}>
                  Active resources by type
                </Typography>
                <ResourceDistribution />
              </Paper>

              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  bgcolor: '#1e1e2f',
                  color: '#fff',
                  fontFamily: 'monospace',
                }}
              >
                <Typography variant="subtitle2" mb={1}>
                  ▸ System Logs
                </Typography>
                <Divider sx={{ bgcolor: '#444', mb: 1 }} />
                <Box component="pre" sx={{ m: 0, whiteSpace: 'pre-wrap' }}>
                  [INFO] System initialized{'\n'}
                  [LOAD] Loading resources from AWS region us-east-1{'\n'}
                  [LOAD] Loading resources from Azure West US{'\n'}
                  [WARN] High CPU usage detected on instance i-0123456789{'\n'}
                  [INFO] Auto-scaling group triggered{'\n'}
                  [LOAD] Loading resources from GCP us-central1{'\n'}
                  [INFO] All resources loaded successfully
                </Box>
              </Paper>
            </Grid>

            {/* Metrics Section Full Width */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <MetricCard
                    title="CPU Usage"
                    value="78%"
                    change="+2.5% from last month"
                    changeType="positive"
                    icon={Cpu}
                    color="blue"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <MetricCard
                    title="Storage Used"
                    value="1.2 TB"
                    change="+50GB from last month"
                    changeType="neutral"
                    icon={HardDrive}
                    color="purple"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <MetricCard
                    title="Active Resources"
                    value="284"
                    change="+12 new resources"
                    changeType="positive"
                    icon={Activity}
                    color="cyan"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <MetricCard
                    title="Total Cost"
                    value="$13,500"
                    change="+8% from last month"
                    changeType="negative"
                    icon={DollarSign}
                    color="teal"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
