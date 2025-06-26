'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { AxiosInstence } from '../../services/axios/AxiosInstance';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from '@mui/material';

interface Project {
  id: string;
  name: string;
}

interface ProjectSelectorProps {
  onProjectChange: (projectId: string) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  onProjectChange,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('');

  useEffect(() => {
    // Load projects from your API or service

    (async () => {
      try {
        const response = await AxiosInstence.get<Project[]>('/projects');
        setProjects(response.data);

        // Get selected project from sessionStorage
        const savedProjectId = sessionStorage.getItem('selectedProjectId');
        if (
          savedProjectId &&
          response.data.find((p) => p.id === savedProjectId)
        ) {
          setSelectedProject(savedProjectId);
        } else if (response.data.length > 0) {
          setSelectedProject(response.data[0].id);
          sessionStorage.setItem('selectedProjectId', response.data[0].id);
        }
      } catch (error) {
        // Handle error (optional: show notification)
        setProjects([]);
      }
    })();
    // For now, using mock data - replace with actual API call
    const mockProjects: Project[] = [
      { id: '1', name: 'Project Alpha' },
      { id: '2', name: 'Project Beta' },
      { id: '3', name: 'Project Gamma' },
    ];

    setProjects(mockProjects);

    // Get selected project from sessionStorage
    const savedProjectId = sessionStorage.getItem('selectedProjectId');
    if (savedProjectId && mockProjects.find((p) => p.id === savedProjectId)) {
      setSelectedProject(savedProjectId);
    } else if (mockProjects.length > 0) {
      setSelectedProject(mockProjects[0].id);
      sessionStorage.setItem('selectedProjectId', mockProjects[0].id);
    }
  }, []);

  const handleProjectChange = (event: SelectChangeEvent<string>) => {
    const projectId = event.target.value;
    setSelectedProject(projectId);
    sessionStorage.setItem('selectedProjectId', projectId);
    onProjectChange(projectId);
  };

  return (
    <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
      <InputLabel id="project-selector-label">Select Project</InputLabel>
      <Select
        labelId="project-selector-label"
        value={selectedProject}
        onChange={handleProjectChange}
        label="Select Project"
      >
        {projects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {project.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProjectSelector;
