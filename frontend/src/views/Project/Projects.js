import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Button, Paper, Container, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Player from 'react-lottie-player';
import createAnimation from '../../assets/lotties/create.json';
import openAnimation from '../../assets/lotties/open.json';
import { getAllProjects, createProject, updateProject, deleteProject, } from '../../services/projectService';
export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editMode, setEditMode] = useState(null);
    const [newProjectName, setNewProjectName] = useState('');
    const navigate = useNavigate();
    const createRef = useRef(null);
    const openRef = useRef(null);
    const fetchProjects = async () => {
        try {
            const data = await getAllProjects();
            setProjects(data);
        }
        catch (err) {
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
        }
        catch (err) {
            console.error('Error creating project', err);
        }
    };
    const handleEditProject = async (projectId, newName) => {
        try {
            await updateProject(projectId, newName, projects.find((p) => p._id === projectId)?.data || {});
            setEditMode(null);
            await fetchProjects();
        }
        catch (err) {
            console.error('Error updating project', err);
        }
    };
    const handleDeleteProject = async (projectId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProject(projectId);
                await fetchProjects();
            }
            catch (err) {
                console.error('Error deleting project', err);
            }
        }
    };
    const formatDate = (dateStr) => {
        if (!dateStr)
            return 'Unknown';
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
    return (_jsx(Box, { sx: { bgcolor: '#fff', minHeight: '100vh', py: 6 }, children: _jsxs(Container, { children: [_jsx(Typography, { variant: "h4", fontWeight: "bold", align: "center", gutterBottom: true, sx: { color: 'black' }, children: "Manage Your Architecture Projects" }), _jsxs(Grid, { container: true, spacing: 4, mb: 6, children: [_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(Paper, { elevation: 3, sx: paperStyle, onClick: () => setOpenDialog(true), onMouseEnter: () => openRef.current?.goToAndPlay(0), children: [_jsx(Player, { ref: openRef, animationData: openAnimation, loop: false, play: false, style: { width: 80, height: 80, margin: '0 auto' } }), _jsx(Typography, { variant: "subtitle1", mt: 1, className: "hoverTitle", sx: titleStyle, children: "Continue Existing Project" }), _jsx(Typography, { variant: "body2", sx: descriptionStyle, children: "Resume work on your cloud architecture designs." })] }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(Paper, { elevation: 3, sx: paperStyle, onClick: handleCreateProject, onMouseEnter: () => createRef.current?.goToAndPlay(0), children: [_jsx(Player, { ref: createRef, animationData: createAnimation, loop: false, play: false, style: { width: 80, height: 80, margin: '0 auto' } }), _jsx(Typography, { variant: "subtitle1", mt: 1, className: "hoverTitle", sx: titleStyle, children: "Create New Project" }), _jsx(Typography, { variant: "body2", sx: descriptionStyle, children: "Start a fresh cloud architecture design." })] }) })] }), projects.length > 0 && (_jsxs(_Fragment, { children: [_jsx(Typography, { variant: "h5", fontWeight: "bold", sx: { color: 'black', mb: 3 }, children: "Recent Projects" }), _jsx(Grid, { container: true, spacing: 4, children: projects.slice(0, 3).map((project) => (_jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: _jsxs(Paper, { sx: {
                                        ...paperStyle,
                                        p: 3,
                                        textAlign: 'left',
                                    }, onClick: () => navigate(`/home?projectId=${project._id}`), children: [_jsx(Typography, { variant: "subtitle1", className: "hoverTitle", sx: titleStyle, children: project.name }), _jsxs(Typography, { variant: "body2", sx: descriptionStyle, children: ["Last edited: ", formatDate(project.lastEdited)] })] }) }, project._id))) })] })), _jsxs(Dialog, { open: openDialog, onClose: () => setOpenDialog(false), maxWidth: "md", fullWidth: true, children: [_jsx(DialogTitle, { children: _jsxs(Box, { display: "flex", justifyContent: "space-between", alignItems: "center", children: [_jsx(Typography, { variant: "h6", children: "Your Projects" }), _jsx(IconButton, { onClick: () => setOpenDialog(false), children: _jsx(CloseIcon, {}) })] }) }), _jsx(DialogContent, { dividers: true, children: _jsx(Grid, { container: true, spacing: 2, children: projects.map((project) => (_jsx(Grid, { item: true, xs: 12, children: _jsxs(Paper, { sx: { p: 2 }, children: [_jsxs(Box, { display: "flex", justifyContent: "space-between", alignItems: "center", children: [_jsx(Box, { display: "flex", alignItems: "center", flex: 1, children: editMode === project._id ? (_jsx(TextField, { value: newProjectName, onChange: (e) => setNewProjectName(e.target.value), size: "small", fullWidth: true, autoFocus: true, onBlur: () => {
                                                                if (newProjectName.trim()) {
                                                                    handleEditProject(project._id, newProjectName);
                                                                }
                                                                setEditMode(null);
                                                            }, onKeyPress: (e) => {
                                                                if (e.key === 'Enter' && newProjectName.trim()) {
                                                                    handleEditProject(project._id, newProjectName);
                                                                }
                                                            } })) : (_jsx(Typography, { children: project.name })) }), _jsxs(Box, { children: [_jsx(IconButton, { onClick: () => {
                                                                    setEditMode(project._id);
                                                                    setNewProjectName(project.name);
                                                                }, size: "small", children: _jsx(EditIcon, {}) }), _jsx(IconButton, { onClick: () => handleDeleteProject(project._id), size: "small", children: _jsx(DeleteIcon, {}) }), _jsx(Button, { variant: "contained", size: "small", onClick: () => {
                                                                    sessionStorage.setItem('selectedProjectId', project._id); // Save project ID in session storage
                                                                    setOpenDialog(false);
                                                                    navigate(`/home?projectId=${project._id}`);
                                                                }, sx: { ml: 1 }, children: "Open" })] })] }), _jsxs(Typography, { variant: "caption", color: "text.secondary", display: "block", mt: 1, children: ["Last edited: ", formatDate(project.lastEdited)] })] }) }, project._id))) }) }), _jsx(DialogActions, { children: _jsx(Button, { onClick: () => setOpenDialog(false), children: "Close" }) })] })] }) }));
}
//# sourceMappingURL=Projects.js.map