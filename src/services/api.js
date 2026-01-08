import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Job Applications CRUD
export const getApplications = async (status = null) => {
  const params = status ? { status } : {};
  const response = await api.get('/api/applications', { params });
  return response.data;
};

export const getApplication = async (id) => {
  const response = await api.get(`/api/applications/${id}`);
  return response.data;
};

export const createApplication = async (application) => {
  const response = await api.post('/api/applications', application);
  return response.data;
};

export const updateApplication = async (id, application) => {
  const response = await api.put(`/api/applications/${id}`, application);
  return response.data;
};

export const deleteApplication = async (id) => {
  const response = await api.delete(`/api/applications/${id}`);
  return response.data;
};

// Dashboard Statistics
export const getDashboardStats = async () => {
  const response = await api.get('/api/dashboard/stats');
  return response.data;
};

// Third-party API integrations
export const getCompanyLogo = async (companyName) => {
  const response = await api.get(`/api/company-logo/${encodeURIComponent(companyName)}`);
  return response.data;
};

export const getSalaryInfo = async (applicationId) => {
  const response = await api.get(`/api/applications/${applicationId}/salary-info`);
  return response.data;
};

