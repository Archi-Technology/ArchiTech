import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { getAllProjects, createProject } from '../../services/projectService';

interface Project {
  _id: string;
  name: string;
  lastEdited?: string;
  data?: Record<string, any>;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects', err);
      }
    };

    fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    try {
      await createProject('New Project');
      navigate('/home');
    } catch (err) {
      console.error('Error creating project', err);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Unknown';
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Box
      sx={{
        bgcolor: '#0d0d0d',
        color: '#fff',
        minHeight: '100vh',
        py: 6,
        backgroundImage:
          'radial-gradient(#444 1px, transparent 1px), radial-gradient(#444 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        backgroundPosition: '0 0, 14px 14px',
      }}
    >
      <Container>
        <Grid container spacing={4} mb={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, bgcolor: '#1a1a1a' }}>
              <Box display="flex" alignItems="center" mb={1}>
                <FolderOpenIcon sx={{ mr: 1, color: '#fff' }} />
                <Typography variant="subtitle1" fontWeight="bold" color="white">
                  Continue Existing Project
                </Typography>
              </Box>
              <Typography variant="body2" color="gray" gutterBottom>
                Resume work on your cloud architecture designs.
              </Typography>
              <Typography variant="caption" color="gray">
                Access your ongoing projects and pick up where you left off.
              </Typography>
              <Box mt={3}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ bgcolor: '#fff', color: '#000' }}
                  onClick={() => setOpenDialog(true)}
                >
                  View Existing Projects
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, bgcolor: '#1a1a1a' }}>
              <Box display="flex" alignItems="center" mb={1}>
                <AddIcon sx={{ mr: 1, color: '#fff' }} />
                <Typography variant="subtitle1" fontWeight="bold" color="white">
                  Create New Project
                </Typography>
              </Box>
              <Typography variant="body2" color="gray" gutterBottom>
                Start a fresh cloud architecture design.
              </Typography>
              <Typography variant="caption" color="gray">
                Begin a new project from scratch or use a template.
              </Typography>
              <Box mt={3}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ bgcolor: '#fff', color: '#000' }}
                  onClick={handleCreateProject}
                >
                  Create New Project
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {projects.length > 0 && (
          <>
            <Typography variant="subtitle1" mb={2} color="white">
              Recent Projects
            </Typography>
            <Grid container spacing={3}>
              {projects.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project._id}>
                  <Paper sx={{ bgcolor: '#1a1a1a', p: 3 }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <FolderOpenIcon sx={{ mr: 1, color: '#fff' }} />
                      <Typography fontWeight="bold" color="white">
                        {project.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="gray">
                      Last edited: {formatDate(project.lastEdited)}
                    </Typography>
                    <Box mt={2}>
                      <Button fullWidth variant="contained" sx={{ bgcolor: '#fff', color: '#000' }}>
                        Open Project
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
          <DialogTitle>
            Select a Project
            <IconButton
              aria-label="close"
              onClick={() => setOpenDialog(false)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {projects.length === 0 ? (
              <Typography>No projects available.</Typography>
            ) : (
              projects.map((project) => (
                <Box
                  key={project._id}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography>{project.name}</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      navigate(`/home?projectId=${project._id}`);
                      setOpenDialog(false);
                    }}
                  >
                    Open
                  </Button>
                </Box>
              ))
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
