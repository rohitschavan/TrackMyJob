import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createApplication, updateApplication, getCompanyLogo } from '../services/api';
import SuccessAnimation from './SuccessAnimation';
import './ApplicationForm.css';
import './Animations.css';

const ApplicationForm = ({ application, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    company_name: '',
    position: '',
    application_date: new Date().toISOString().split('T')[0],
    status: 'applied',
    source: '',
    job_url: '',
    location: '',
    salary_range: '',
    notes: '',
    contact_person: '',
    contact_email: '',
    interview_date: '',
  });

  const [loading, setLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);
  const [logoLoading, setLogoLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (application) {
      setFormData({
        company_name: application.company_name || '',
        position: application.position || '',
        application_date: application.application_date
          ? new Date(application.application_date).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        status: application.status || 'applied',
        source: application.source || '',
        job_url: application.job_url || '',
        location: application.location || '',
        salary_range: application.salary_range || '',
        notes: application.notes || '',
        contact_person: application.contact_person || '',
        contact_email: application.contact_email || '',
        interview_date: application.interview_date
          ? new Date(application.interview_date).toISOString().split('T')[0]
          : '',
      });
      fetchLogo(application.company_name);
    }
  }, [application]);

  const fetchLogo = async (companyName) => {
    if (!companyName) return;
    setLogoLoading(true);
    try {
      const logoData = await getCompanyLogo(companyName);
      if (logoData.logo_url) {
        setLogoUrl(logoData.logo_url);
      }
    } catch (error) {
      console.log('Logo not available');
    } finally {
      setLogoLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Fetch logo when company name changes
    if (name === 'company_name' && value) {
      fetchLogo(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        application_date: formData.application_date || new Date().toISOString(),
        interview_date: formData.interview_date || null,
      };

      if (application) {
        await updateApplication(application.id, submitData);
        setShowSuccess(true);
        // Wait for success animation, then close
        setTimeout(() => {
          setShowSuccess(false);
          if (onSave) onSave();
          if (onClose) onClose();
        }, 2000);
      } else {
        await createApplication(submitData);
        setShowSuccess(true);
        // Wait for success animation, then close
        setTimeout(() => {
          setShowSuccess(false);
          if (onSave) onSave();
          if (onClose) onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Error saving application:', error);
      alert('Failed to save application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SuccessAnimation
        show={showSuccess}
        message={application ? "Application updated successfully!" : "Application created successfully!"}
        animationType={application ? 'applicationUpdated' : 'applicationCreated'}
        duration={2000}
        onComplete={() => setShowSuccess(false)}
      />
      <motion.div 
        className="form-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
      <motion.div 
        className="form-modal"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="form-header">
          <h2>{application ? 'Edit Application' : 'Add New Application'}</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-row">
            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
                placeholder="e.g., Google"
              />
              {logoLoading && <small>Loading logo...</small>}
              {logoUrl && !logoLoading && (
                <div className="logo-preview">
                  <img src={logoUrl} alt="Company logo" onError={(e) => e.target.style.display = 'none'} />
                  <small>Logo fetched via Clearbit API</small>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Position *</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                placeholder="e.g., Software Engineer"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Application Date *</label>
              <input
                type="date"
                name="application_date"
                value={formData.application_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Source</label>
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleChange}
                placeholder="e.g., LinkedIn, Indeed"
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., San Francisco, CA"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Job URL</label>
            <input
              type="url"
              name="job_url"
              value={formData.job_url}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Salary Range</label>
              <input
                type="text"
                name="salary_range"
                value={formData.salary_range}
                onChange={handleChange}
                placeholder="e.g., $100k - $150k"
              />
            </div>

            <div className="form-group">
              <label>Interview Date</label>
              <input
                type="date"
                name="interview_date"
                value={formData.interview_date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Contact Person</label>
              <input
                type="text"
                name="contact_person"
                value={formData.contact_person}
                onChange={handleChange}
                placeholder="Recruiter name"
              />
            </div>

            <div className="form-group">
              <label>Contact Email</label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                placeholder="recruiter@company.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Additional notes..."
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Saving...' : application ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
    </>
  );
};

export default ApplicationForm;

