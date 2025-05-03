'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../index.scss';

interface Project {
  _id: string;
  name: string;
  lastEdited?: string;
  data?: Record<string, any>;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/project');
        setProjects(res.data);
      } catch (err) {
        console.error('Failed to load projects', err);
      }
    };

    fetchProjects();
  }, []);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Unknown';
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="border border-gray-700 rounded-lg p-6 bg-gray-900 shadow hover:shadow-lg transition">
          <h2 className="text-lg font-bold mb-1">Continue Existing Project</h2>
          <p className="text-sm text-gray-400 mb-4">
            Resume work on your cloud architecture designs
          </p>
          <p className="text-xs text-gray-500 mb-6">
            Access your ongoing projects and pick up where you left off.
          </p>
          <button className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-gray-200 transition">
            View Existing Projects
          </button>
        </div>

        <div className="border border-gray-700 rounded-lg p-6 bg-gray-900 shadow hover:shadow-lg transition">
          <h2 className="text-lg font-bold mb-1">Create New Project</h2>
          <p className="text-sm text-gray-400 mb-4">
            Start a fresh cloud architecture design
          </p>
          <p className="text-xs text-gray-500 mb-6">
            Begin a new project from scratch or use a template.
          </p>
          <button className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-gray-200 transition">
            Create New Project
          </button>
        </div>
      </div>

      <h3 className="text-md font-semibold mb-4 text-gray-300">Recent Projects</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-white font-semibold text-lg mb-1">{project.name}</h4>
            <p className="text-sm text-gray-400 mb-3">
              Last edited: {formatDate(project.lastEdited)}
            </p>
            <button className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition">
              Open Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
