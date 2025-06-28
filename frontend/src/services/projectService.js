import apiService from './axios/AxiosInstance';
export const getAllProjects = async () => {
    const response = await apiService.apiClient.get('/projects');
    return response.data;
};
export const createProject = async (name) => {
    const response = await apiService.apiClient.post('/projects', {
        name,
        data: {}
    });
    return response.data;
};
export const updateProject = async (id, name, data) => {
    const response = await apiService.apiClient.put(`/projects/${id}`, {
        name,
        data
    });
    return response.data;
};
export const deleteProject = async (id) => {
    const response = await apiService.apiClient.delete(`/projects/${id}`);
    return response.data;
};
//# sourceMappingURL=projectService.js.map