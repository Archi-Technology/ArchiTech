import { useEffect, useState, useRef } from 'react';
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
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Player from 'react-lottie-player';
import createAnimation from '../../assets/lotties/create.json';
import openAnimation from '../../assets/lotties/open.json';
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

  const createRef = useRef<any>(null);
  const openRef = useRef<any>(null);

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

      const newProject = await createProject('New Project');
      sessionStorage.setItem('selectedProjectId', newProject._id);
      console.log('project component Project ID:', newProject._id);
      navigate(`/home?projectId=${newProject._id}`);
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

  useEffect(() => {
    const handleCloseParentModal = () => setOpenDialog(false);

    document.addEventListener("closeParentModal", handleCloseParentModal);
    return () => document.removeEventListener("closeParentModal", handleCloseParentModal);
  }, []);
  const paperStyle = {
    p: 4,
    textAlign: 'center',
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: '0.3s',
    backgroundColor: '#ffffff',
    '&:hover': {
      borderColor: '#3C82F7',
      backgroundColor: 'rgba(60, 130, 247, 0.08)',
      boxShadow: '0 0 0 4px rgba(60, 130, 247, 0.15)',
      '& .hoverTitle': {
        color: '#3C82F7',
      },
    },
  };

  const titleStyle = {
    color: 'black',
    fontWeight: 'bold',
    transition: '0.3s',
  };

  const descriptionStyle = {
    color: 'text.secondary',
    transition: '0.3s',
  };

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', py: 6 }}>
      <Container>
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          gutterBottom
          sx={{ color: 'black' }}
        >
          Manage Your Architecture Projects
        </Typography>

        <Grid container spacing={4} mb={6}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={paperStyle}
              onClick={() => setOpenDialog(true)}
              onMouseEnter={() => openRef.current?.goToAndPlay(0)}
            >
              <Player
                ref={openRef}
                animationData={openAnimation}
                loop={false}
                play={false}
                style={{ width: 80, height: 80, margin: '0 auto' }}
              />
              <Typography
                variant="subtitle1"
                mt={1}
                className="hoverTitle"
                sx={titleStyle}
              >
                Continue Existing Project
              </Typography>
              <Typography variant="body2" sx={descriptionStyle}>
                Resume work on your cloud architecture designs.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={paperStyle}
              onClick={handleCreateProject}
              onMouseEnter={() => createRef.current?.goToAndPlay(0)}
            >
              <Player
                ref={createRef}
                animationData={createAnimation}
                loop={false}
                play={false}
                style={{ width: 80, height: 80, margin: '0 auto' }}
              />
              <Typography
                variant="subtitle1"
                mt={1}
                className="hoverTitle"
                sx={titleStyle}
              >
                Create New Project
              </Typography>
              <Typography variant="body2" sx={descriptionStyle}>
                Start a fresh cloud architecture design.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {projects.length > 0 && (
          <>
            <Typography variant="h5" fontWeight="bold" sx={{ color: 'black', mb: 3 }}>
              Recent Projects
            </Typography>
            <Grid container spacing={4}>
              {projects.slice(0, 3).map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project._id}>
                  <Paper
                    sx={{
                      ...paperStyle,
                      p: 3,
                      textAlign: 'left',
                    }}
                    onClick={() => {
                      sessionStorage.setItem('selectedProjectId', project._id);
                      navigate(`/home?projectId=${project._id}`)}
                    }
                  >
                    <Typography
                      variant="subtitle1"
                      className="hoverTitle"
                      sx={titleStyle}
                    >
                      {project.name}
                    </Typography>
                    <Typography variant="body2" sx={descriptionStyle}>
                      Last edited: {formatDate(project.lastEdited)}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
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
                            console.log('exist project id:', project._id);
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
