import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getApplications, deleteApplication, getCompanyLogo } from '../services/api';
import ApplicationForm from './ApplicationForm';
import ApplicationDetail from './ApplicationDetail';
import LottieAnimation from './LottieAnimation';
import EmptyState from './EmptyState';
import SuccessAnimation from './SuccessAnimation';

import './ApplicationList.css';
import Card from './Card';
const ApplicationList = ({ onRefresh }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [logoCache, setLogoCache] = useState({});
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const loadApplications = useCallback(async () => {
    try {
      // Ensure minimum display time for loading animation
      const loadStartTime = Date.now();
      setLoading(true);
      const status = statusFilter === 'all' ? null : statusFilter;
      const data = await getApplications(status);

      // Calculate remaining time to meet 2500ms minimum
      const elapsed = Date.now() - loadStartTime;
      const remainingTime = Math.max(0, 2500 - elapsed);

      await new Promise(resolve => setTimeout(resolve, remainingTime));

      setApplications(data);

      // Pre-fetch logos for applications
      data.forEach(async (app) => {
        setLogoCache(prev => {
          if (!prev[app.company_name]) {
            // Fetch logo asynchronously
            getCompanyLogo(app.company_name)
              .then(logoData => {
                if (logoData.logo_url) {
                  setLogoCache(current => ({
                    ...current,
                    [app.company_name]: logoData.logo_url
                  }));
                }
              })
              .catch(error => {
                console.log('Logo not available for', app.company_name);
              });
          }
          return prev;
        });
      });
    } catch (error) {
      console.error('Error loading applications:', error);
      alert('Failed to load applications');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications, onRefresh]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await deleteApplication(id);
        setShowDeleteSuccess(true);
        loadApplications();
        if (onRefresh) onRefresh();
      } catch (error) {
        console.error('Error deleting application:', error);
        alert('Failed to delete application');
      }
    }
  };

  const handleEdit = (app) => {
    setEditingApp(app);
    setShowForm(true);
    setSelectedApp(null);
  };

  const handleView = (app) => {
    setSelectedApp(app);
    setShowForm(false);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingApp(null);
    loadApplications();
    if (onRefresh) onRefresh();
  };

  const getStatusColor = (status) => {
    const colors = {
      applied: 'var(--status-applied)',
      interview: 'var(--status-interview)',
      offer: 'var(--status-offer)',
      rejected: 'var(--status-rejected)',
      withdrawn: 'var(--status-withdrawn)'
    };
    return colors[status] || 'var(--status-withdrawn)';
  };

  if (loading) {
    return <LottieAnimation minDisplayTime={2500} />;
  }

  if (showForm) {
    return (
      <ApplicationForm
        application={editingApp}
        onClose={handleFormClose}
        onSave={handleFormClose}
      />
    );
  }

  if (selectedApp) {
    return (
      <ApplicationDetail
        application={selectedApp}
        onClose={() => setSelectedApp(null)}
        onEdit={handleEdit}
        onDelete={handleDelete}
        logoUrl={logoCache[selectedApp.company_name]}
      />
    );
  }

  return (
    <>
      <SuccessAnimation
        show={showDeleteSuccess}
        message="Application deleted successfully!"
        animationType="applicationDeleted"
        duration={2000}
        onComplete={() => setShowDeleteSuccess(false)}
      />
      <div className="application-list">
        <div className="list-header">
          <h2>Job Applications</h2>
          <div className="header-actions">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-filter"
            >
              <option value="all">All Status</option>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
            <button onClick={() => setShowForm(true)} className="btn-primary">
              + Add Application
            </button>
          </div>
        </div>

        {applications.length === 0 ? (
          <EmptyState
            title="No applications found"
            message="Start tracking your job search journey. Add your first application to get started!"
            actionLabel="Add Your First Application"
            onAction={() => setShowForm(true)}
            icon="🚀"
          />
        ) : (
          <div className="applications-grid">
            <AnimatePresence>
              {applications.map((app, index) => (
                <Card
                  app={app}
                  logoUrl={logoCache[app.company_name]}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  getStatusColor={getStatusColor}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </>
  );
};

export default ApplicationList;

