import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  Avatar,
  Paper,
  useTheme
} from "@mui/material";
import { Search, Notifications, AccountCircle } from "@mui/icons-material";

export function Header() {
  const theme = useTheme();

  return (
    <Paper
      elevation={1}
      sx={{
        px: 3,
        py: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backdropFilter: "blur(6px)",
        backgroundColor: "rgba(255,255,255,0.8)",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Left - Title + Environment Badge */}
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="h6" fontWeight={600} color="primary">
          Resource Status
        </Typography>
        <Badge
          color="primary"
          variant="standard"
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            fontSize: "0.75rem",
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.dark,
          }}
        >
          Production
        </Badge>
      </Box>

      {/* Right - Search, Notification, Avatar */}
      <Box display="flex" alignItems="center" gap={2}>
        <TextField
          placeholder="Search resources..."
          size="small"
          variant="outlined"
          sx={{ width: 280 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <IconButton color="default">
          <Badge variant="dot" color="primary">
            <Notifications />
          </Badge>
        </IconButton>

        <IconButton>
          <Avatar sx={{ width: 32, height: 32 }}>
            <AccountCircle />
          </Avatar>
        </IconButton>
      </Box>
    </Paper>
  );
}
