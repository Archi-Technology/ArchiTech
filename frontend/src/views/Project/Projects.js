"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Projects;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const material_1 = require("@mui/material");
const Close_1 = __importDefault(require("@mui/icons-material/Close"));
const Edit_1 = __importDefault(require("@mui/icons-material/Edit"));
const Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
const react_lottie_player_1 = __importDefault(require("react-lottie-player"));
const create_json_1 = __importDefault(require("../../assets/lotties/create.json"));
const open_json_1 = __importDefault(require("../../assets/lotties/open.json"));
const projectService_1 = require("../../services/projectService");
function Projects() {
    const [projects, setProjects] = (0, react_1.useState)([]);
    const [openDialog, setOpenDialog] = (0, react_1.useState)(false);
    const [editMode, setEditMode] = (0, react_1.useState)(null);
    const [newProjectName, setNewProjectName] = (0, react_1.useState)('');
    const navigate = (0, react_router_dom_1.useNavigate)();
    const createRef = (0, react_1.useRef)(null);
    const openRef = (0, react_1.useRef)(null);
    const fetchProjects = async () => {
        try {
            const data = await (0, projectService_1.getAllProjects)();
            setProjects(data);
        }
        catch (err) {
            console.error('Error fetching projects', err);
        }
    };
    (0, react_1.useEffect)(() => {
        fetchProjects();
    }, []);
    const handleCreateProject = async () => {
        try {
            await (0, projectService_1.createProject)('New Project');
            navigate('/home');
        }
        catch (err) {
            console.error('Error creating project', err);
        }
    };
    const handleEditProject = async (projectId, newName) => {
        try {
            await (0, projectService_1.updateProject)(projectId, newName, projects.find((p) => p._id === projectId)?.data || {});
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
                await (0, projectService_1.deleteProject)(projectId);
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
    (0, react_1.useEffect)(() => {
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
    return ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: { bgcolor: '#fff', minHeight: '100vh', py: 6 }, children: (0, jsx_runtime_1.jsxs)(material_1.Container, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h4", fontWeight: "bold", align: "center", gutterBottom: true, sx: { color: 'black' }, children: "Manage Your Architecture Projects" }), (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, spacing: 4, mb: 6, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, md: 6, children: (0, jsx_runtime_1.jsxs)(material_1.Paper, { elevation: 3, sx: paperStyle, onClick: () => setOpenDialog(true), onMouseEnter: () => openRef.current?.goToAndPlay(0), children: [(0, jsx_runtime_1.jsx)(react_lottie_player_1.default, { ref: openRef, animationData: open_json_1.default, loop: false, play: false, style: { width: 80, height: 80, margin: '0 auto' } }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "subtitle1", mt: 1, className: "hoverTitle", sx: titleStyle, children: "Continue Existing Project" }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", sx: descriptionStyle, children: "Resume work on your cloud architecture designs." })] }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, md: 6, children: (0, jsx_runtime_1.jsxs)(material_1.Paper, { elevation: 3, sx: paperStyle, onClick: handleCreateProject, onMouseEnter: () => createRef.current?.goToAndPlay(0), children: [(0, jsx_runtime_1.jsx)(react_lottie_player_1.default, { ref: createRef, animationData: create_json_1.default, loop: false, play: false, style: { width: 80, height: 80, margin: '0 auto' } }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "subtitle1", mt: 1, className: "hoverTitle", sx: titleStyle, children: "Create New Project" }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", sx: descriptionStyle, children: "Start a fresh cloud architecture design." })] }) })] }), projects.length > 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h5", fontWeight: "bold", sx: { color: 'black', mb: 3 }, children: "Recent Projects" }), (0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, spacing: 4, children: projects.slice(0, 3).map((project) => ((0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, sm: 6, md: 4, children: (0, jsx_runtime_1.jsxs)(material_1.Paper, { sx: {
                                        ...paperStyle,
                                        p: 3,
                                        textAlign: 'left',
                                    }, onClick: () => navigate(`/home?projectId=${project._id}`), children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "subtitle1", className: "hoverTitle", sx: titleStyle, children: project.name }), (0, jsx_runtime_1.jsxs)(material_1.Typography, { variant: "body2", sx: descriptionStyle, children: ["Last edited: ", formatDate(project.lastEdited)] })] }) }, project._id))) })] })), (0, jsx_runtime_1.jsxs)(material_1.Dialog, { open: openDialog, onClose: () => setOpenDialog(false), maxWidth: "md", fullWidth: true, children: [(0, jsx_runtime_1.jsx)(material_1.DialogTitle, { children: (0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", justifyContent: "space-between", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", children: "Your Projects" }), (0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: () => setOpenDialog(false), children: (0, jsx_runtime_1.jsx)(Close_1.default, {}) })] }) }), (0, jsx_runtime_1.jsx)(material_1.DialogContent, { dividers: true, children: (0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, spacing: 2, children: projects.map((project) => ((0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsxs)(material_1.Paper, { sx: { p: 2 }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", justifyContent: "space-between", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(material_1.Box, { display: "flex", alignItems: "center", flex: 1, children: editMode === project._id ? ((0, jsx_runtime_1.jsx)(material_1.TextField, { value: newProjectName, onChange: (e) => setNewProjectName(e.target.value), size: "small", fullWidth: true, autoFocus: true, onBlur: () => {
                                                                if (newProjectName.trim()) {
                                                                    handleEditProject(project._id, newProjectName);
                                                                }
                                                                setEditMode(null);
                                                            }, onKeyPress: (e) => {
                                                                if (e.key === 'Enter' && newProjectName.trim()) {
                                                                    handleEditProject(project._id, newProjectName);
                                                                }
                                                            } })) : ((0, jsx_runtime_1.jsx)(material_1.Typography, { children: project.name })) }), (0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: () => {
                                                                    setEditMode(project._id);
                                                                    setNewProjectName(project.name);
                                                                }, size: "small", children: (0, jsx_runtime_1.jsx)(Edit_1.default, {}) }), (0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: () => handleDeleteProject(project._id), size: "small", children: (0, jsx_runtime_1.jsx)(Delete_1.default, {}) }), (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "contained", size: "small", onClick: () => {
                                                                    sessionStorage.setItem('selectedProjectId', project._id); // Save project ID in session storage
                                                                    setOpenDialog(false);
                                                                    navigate(`/home?projectId=${project._id}`);
                                                                }, sx: { ml: 1 }, children: "Open" })] })] }), (0, jsx_runtime_1.jsxs)(material_1.Typography, { variant: "caption", color: "text.secondary", display: "block", mt: 1, children: ["Last edited: ", formatDate(project.lastEdited)] })] }) }, project._id))) }) }), (0, jsx_runtime_1.jsx)(material_1.DialogActions, { children: (0, jsx_runtime_1.jsx)(material_1.Button, { onClick: () => setOpenDialog(false), children: "Close" }) })] })] }) }));
}
//# sourceMappingURL=Projects.js.map