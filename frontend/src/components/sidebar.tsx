import { Box, Typography, List, ListItemButton, ListItemIcon, ListItemText, Divider, Button } from '@mui/material';
import {
  Home,
  BarChart3,
  Database,
  Settings,
  Activity,
  Users,
  HelpCircle,
  LogOut,
  Cpu,
  Cloud,
  Terminal,
  Shield,
} from 'lucide-react';

export function Sidebar() {
  return (
    <Box
      sx={{
        width: 260,
        height: '100vh',
        bgcolor: 'white',
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 3,
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 2,
            background: 'linear-gradient(to bottom right, #3b82f6, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Terminal color="white" size={18} />
        </Box>
        <Typography fontWeight={600} color="primary.dark">
          ArchiTech
        </Typography>
      </Box>

      {/* Sections */}
      <Box sx={{ flex: 1, py: 3 }}>
        <Box sx={{ px: 2, mb: 2 }}>
          <Typography variant="caption" fontWeight={500} color="text.secondary" mb={1}>
            INFRASTRUCTURE
          </Typography>
          <List disablePadding>
            <ListItemButton>
              <ListItemIcon><Home size={18} /></ListItemIcon>
              <ListItemText primary="Overview" />
            </ListItemButton>
            <ListItemButton selected>
              <ListItemIcon><BarChart3 size={18} /></ListItemIcon>
              <ListItemText primary="Resources" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon><Cloud size={18} /></ListItemIcon>
              <ListItemText primary="Cloud Services" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon><Cpu size={18} /></ListItemIcon>
              <ListItemText primary="Compute" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon><Database size={18} /></ListItemIcon>
              <ListItemText primary="Storage" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon><Shield size={18} /></ListItemIcon>
              <ListItemText primary="Security" />
            </ListItemButton>
          </List>
        </Box>

        <Box sx={{ px: 2, mt: 4 }}>
          <Typography variant="caption" fontWeight={500} color="text.secondary" mb={1}>
            MANAGEMENT
          </Typography>
          <List disablePadding>
            <ListItemButton>
              <ListItemIcon><Activity size={18} /></ListItemIcon>
              <ListItemText primary="Activity" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon><Users size={18} /></ListItemIcon>
              <ListItemText primary="Teams" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon><Settings size={18} /></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </List>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: '1px solid #e5e7eb' }}>
        <Button fullWidth startIcon={<HelpCircle size={18} />} sx={{ justifyContent: 'flex-start' }}>
          Support
        </Button>
        <Button fullWidth startIcon={<LogOut size={18} />} sx={{ justifyContent: 'flex-start' }}>
          Logout
        </Button>
      </Box>
    </Box>
  );
}
