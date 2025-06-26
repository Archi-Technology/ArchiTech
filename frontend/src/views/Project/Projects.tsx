import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Chip,
  Container,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  TextField,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
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
import { useTerraform } from '../../contexts/terraformContext';

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
  const {resetTerraformCode} = useTerraform();
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
       // Clear Terraform code on new project creation
      navigate(`/home?projectId=${newProject._id}`);
      resetTerraformCode();
    } catch (err) {
      console.error('Error creating project', err);
    }
  };

  const handleEditProject = async (projectId: string, newName: string) => {
    try {
      await updateProject(
        projectId,
        newName,
        projects.find((p) => p._id === projectId)?.data || {},
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

    document.addEventListener('closeParentModal', handleCloseParentModal);
    return () =>
      document.removeEventListener('closeParentModal', handleCloseParentModal);
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
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              color: '#4c8bf5',
              mb: 2,
              background: 'linear-gradient(135deg, #4c8bf5 0%, #6ba3f7 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Architecture Projects
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: '#64748b', maxWidth: 600, mx: 'auto' }}
          >
            Design, manage, and deploy your cloud infrastructure with ease
          </Typography>
        </Box>

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
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: 'black', mb: 3 }}
            >
              Recent Projects{' '}
              <Chip
                label={`${projects.length} total`}
                size="small"
                sx={{
                  ml: 2,
                  backgroundColor: '#4c8bf5',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              />
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
                      resetTerraformCode();
                      navigate(`/home?projectId=${project._id}`);
                    }}
                  >
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar
                        sx={{
                          backgroundColor: '#4c8bf5',
                          width: 40,
                          height: 40,
                          mr: 2,
                        }}
                      >
                        <FolderIcon />
                      </Avatar>
                      <Typography
                        variant="h6"
                        className="hoverTitle"
                        sx={{ ...titleStyle, fontSize: '1.1rem' }}
                      >
                        {project.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={descriptionStyle}>
                      Last edited: {formatDate(project.lastEdited)}
                    </Typography>
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
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)',
            },
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{
                    color: '#4c8bf5',
                    background:
                      'linear-gradient(135deg, #4c8bf5 0%, #6ba3f7 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Your Projects
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
                  Manage and organize your architecture projects
                </Typography>
              </Box>
              <IconButton
                onClick={() => setOpenDialog(false)}
                sx={{
                  backgroundColor: '#f1f5f9',
                  '&:hover': { backgroundColor: '#e2e8f0' },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>

          <Divider sx={{ borderColor: '#e2e8f0' }} />

          <DialogContent sx={{ py: 3 }}>
            <Grid container spacing={3}>
              {projects.map((project, index) => (
                <Grid item xs={12} key={project._id}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      border: '1px solid #e2e8f0',
                      borderRadius: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: '#4c8bf5',
                        backgroundColor: '#f8faff',
                        boxShadow: '0 2px 12px rgba(76, 139, 245, 0.1)',
                      },
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box display="flex" alignItems="center" flex={1}>
                        <Avatar
                          sx={{
                            backgroundColor: '#4c8bf5',
                            width: 48,
                            height: 48,
                            mr: 3,
                          }}
                        >
                          <FolderIcon />
                        </Avatar>
                        <Box flex={1}>
                          {editMode === project._id ? (
                            <TextField
                              value={newProjectName}
                              onChange={(e) =>
                                setNewProjectName(e.target.value)
                              }
                              size="small"
                              fullWidth
                              autoFocus
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#4c8bf5',
                                  },
                                },
                              }}
                              onBlur={() => {
                                if (newProjectName.trim()) {
                                  handleEditProject(
                                    project._id,
                                    newProjectName,
                                  );
                                }
                                setEditMode(null);
                              }}
                              onKeyPress={(e) => {
                                if (
                                  e.key === 'Enter' &&
                                  newProjectName.trim()
                                ) {
                                  handleEditProject(
                                    project._id,
                                    newProjectName,
                                  );
                                }
                              }}
                            />
                          ) : (
                            <Box>
                              <Typography
                                variant="h6"
                                sx={{
                                  color: '#1e293b',
                                  fontWeight: 600,
                                  mb: 0.5,
                                }}
                              >
                                {project.name}
                              </Typography>
                              <Box display="flex" alignItems="center">
                                <AccessTimeIcon
                                  sx={{
                                    fontSize: 14,
                                    color: '#64748b',
                                    mr: 0.5,
                                  }}
                                />
                                <Typography
                                  variant="caption"
                                  sx={{ color: '#64748b' }}
                                >
                                  Last edited: {formatDate(project.lastEdited)}
                                </Typography>
                              </Box>
                            </Box>
                          )}
                        </Box>
                      </Box>

                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                          onClick={() => {
                            setEditMode(project._id);
                            setNewProjectName(project.name);
                          }}
                          size="small"
                          sx={{
                            backgroundColor: '#f1f5f9',
                            '&:hover': {
                              backgroundColor: '#4c8bf5',
                              color: 'white',
                            },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                          onClick={() => handleDeleteProject(project._id)}
                          size="small"
                          sx={{
                            backgroundColor: '#f1f5f9',
                            '&:hover': {
                              backgroundColor: '#ef4444',
                              color: 'white',
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>

                        <Button
                          variant="contained"
                          size="medium"
                          onClick={() => {
                            sessionStorage.setItem(
                              'selectedProjectId',
                              project._id,
                            );
                            setOpenDialog(false);
                            resetTerraformCode();
                            navigate(`/home?projectId=${project._id}`);
                          }}
                          sx={{
                            ml: 1,
                            backgroundColor: '#4c8bf5',
                            '&:hover': { backgroundColor: '#3b7ce8' },
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3,
                          }}
                        >
                          Open Project
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </DialogContent>

          <Divider sx={{ borderColor: '#e2e8f0' }} />

          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setOpenDialog(false)}
              sx={{
                color: '#64748b',
                '&:hover': { backgroundColor: '#f1f5f9' },
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
