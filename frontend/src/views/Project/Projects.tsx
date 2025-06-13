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
  TextField,
} from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../../services/projectService';

interface Project {
  _id: string;
  name: string;
  lastEdited?: string;
  data?: Record<string, any>;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [newProjectName, setNewProjectName] = useState('');
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects', err);
    }
  };

  useEffect(() => {
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

  const handleEditProject = async (projectId: string, newName: string) => {
    try {
      await updateProject(
        projectId,
        newName,
        projects.find((p) => p._id === projectId)?.data || {}
      );
      setEditMode(null);
      await fetchProjects();
    } catch (err) {
      console.error('Error updating project', err);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
        await fetchProjects();
      } catch (err) {
        console.error('Error deleting project', err);
      }
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
        bgcolor: '#fff',
        color: '#000',
        minHeight: '100vh',
        py: 6,
      }}
    >
      <Container>
        <Grid container spacing={4} mb={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" mb={1}>
                <FolderOpenIcon sx={{ mr: 1, color: '#000' }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  Continue Existing Project
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Resume work on your cloud architecture designs.
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Access your ongoing projects and pick up where you left off.
              </Typography>
              <Box mt={3}>
                <Button fullWidth variant="contained" onClick={() => setOpenDialog(true)}>
                  View Existing Projects
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" mb={1}>
                <AddIcon sx={{ mr: 1, color: '#000' }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  Create New Project
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Start a fresh cloud architecture design.
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Begin a new project from scratch or use a template.
              </Typography>
              <Box mt={3}>
                <Button fullWidth variant="contained" onClick={handleCreateProject}>
                  Create New Project
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {projects.length > 0 && (
          <>
            <Typography variant="subtitle1" mb={2}>
              Recent Projects
            </Typography>
            <Grid container spacing={3}>
              {projects.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project._id}>
                  <Paper sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <FolderOpenIcon sx={{ mr: 1, color: '#000' }} />
                      <Typography fontWeight="bold">{project.name}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Last edited: {formatDate(project.lastEdited)}
                    </Typography>
                    <Box mt={2}>
                      <Button fullWidth variant="contained">
                        Open Project
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Your Projects</Typography>
              <IconButton onClick={() => setOpenDialog(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              {projects.map((project) => (
                <Grid item xs={12} key={project._id}>
                  <Paper sx={{ p: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box display="flex" alignItems="center" flex={1}>
                        <FolderOpenIcon sx={{ mr: 1, color: '#000' }} />
                        {editMode === project._id ? (
                          <TextField
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                            size="small"
                            fullWidth
                            autoFocus
                            onBlur={() => {
                              if (newProjectName.trim()) {
                                handleEditProject(project._id, newProjectName);
                              }
                              setEditMode(null);
                            }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && newProjectName.trim()) {
                                handleEditProject(project._id, newProjectName);
                              }
                            }}
                          />
                        ) : (
                          <Typography>{project.name}</Typography>
                        )}
                      </Box>
                      <Box>
                        <IconButton
                          onClick={() => {
                            setEditMode(project._id);
                            setNewProjectName(project.name);
                          }}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteProject(project._id)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => {
                            sessionStorage.setItem('selectedProjectId', project._id); // Save project ID in session storage
                            setOpenDialog(false);
                            navigate(`/home?projectId=${project._id}`);
                          }}
                          sx={{ ml: 1 }}
                        >
                          Open
                        </Button>
                      </Box>
                    </Box>
                    <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                      Last edited: {formatDate(project.lastEdited)}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
