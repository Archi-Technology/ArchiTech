"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getAllProjects = void 0;
const AxiosInstance_1 = require("./axios/AxiosInstance");
const getAllProjects = async () => {
    const response = await AxiosInstance_1.AxiosInstence.get('/projects');
    return response.data;
};
exports.getAllProjects = getAllProjects;
const createProject = async (name) => {
    const response = await AxiosInstance_1.AxiosInstence.post('/projects', {
        name,
        data: {}
    });
    return response.data;
};
exports.createProject = createProject;
const updateProject = async (id, name, data) => {
    const response = await AxiosInstance_1.AxiosInstence.put(`/projects/${id}`, {
        name,
        data
    });
    return response.data;
};
exports.updateProject = updateProject;
const deleteProject = async (id) => {
    const response = await AxiosInstance_1.AxiosInstence.delete(`/projects/${id}`);
    return response.data;
};
exports.deleteProject = deleteProject;
//# sourceMappingURL=projectService.js.map