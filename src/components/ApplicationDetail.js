import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getSalaryInfo } from '../services/api';
import './ApplicationDetail.css';

const ApplicationDetail = ({ application, onClose, onEdit, onDelete, logoUrl }) => {
  const [salaryInfo, setSalaryInfo] = useState(null);
  const [loadingSalary, setLoadingSalary] = useState(false);

  const fetchSalaryInfo = async () => {
    setLoadingSalary(true);
    try {
      const data = await getSalaryInfo(application.id);
      setSalaryInfo(data);
    } catch (error) {
      console.error('Error fetching salary info:', error);
      alert('Failed to fetch salary information');
    } finally {
      setLoadingSalary(false);
    }
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

  return (
    <motion.div
      className="detail-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="detail-modal"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="detail-header">
          <div className="detail-company-info">
            {logoUrl ? (
              <img src={logoUrl} alt={application.company_name} className="detail-logo" />
            ) : (
              <div className="detail-logo-placeholder">
                {application.company_name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h2>{application.company_name}</h2>
              <p className="detail-position">{application.position}</p>
            </div>
          </div>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>

        <div className="detail-body">
          <div className="detail-section">
            <div className="status-badge-large" style={{ backgroundColor: getStatusColor(application.status) }}>
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </div>
          </div>

          <div className="detail-grid">
            <div className="detail-item">
              <label>Application Date</label>
              <p>{application.application_date ? new Date(application.application_date).toLocaleDateString() : 'N/A'}</p>
            </div>

            {application.interview_date && (
              <div className="detail-item">
                <label>Interview Date</label>
                <p>{new Date(application.interview_date).toLocaleDateString()}</p>
              </div>
            )}

            {application.location && (
              <div className="detail-item">
                <label>Location</label>
                <p>{application.location}</p>
              </div>
            )}

            {application.source && (
              <div className="detail-item">
                <label>Source</label>
                <p>{application.source}</p>
              </div>
            )}

            {application.salary_range && (
              <div className="detail-item">
                <label>Salary Range</label>
                <p>{application.salary_range}</p>
              </div>
            )}

            {application.contact_person && (
              <div className="detail-item">
                <label>Contact Person</label>
                <p>{application.contact_person}</p>
              </div>
            )}

            {application.contact_email && (
              <div className="detail-item">
                <label>Contact Email</label>
                <p><a href={`mailto:${application.contact_email}`}>{application.contact_email}</a></p>
              </div>
            )}

            {application.job_url && (
              <div className="detail-item full-width">
                <label>Job URL</label>
                <a
                  href={application.job_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="job-url"
                  title={application.job_url}  // shows full URL on hover
                >
                  {application.job_url}
                </a>
              </div>
            )}

            {application.notes && (
              <div className="detail-item full-width">
                <label>Notes</label>
                <p className="notes-text">{application.notes}</p>
              </div>
            )}
          </div>

          {/* Third-party API Integration - Salary Info */}
          <div className="third-party-section">
            <h3>Market Information</h3>
            <p className="section-description">
              Get salary information for this position using our third-party API integration (Adzuna API)
            </p>
            <button
              onClick={fetchSalaryInfo}
              className="btn-fetch-salary"
              disabled={loadingSalary}
            >
              {loadingSalary ? 'Loading...' : 'Fetch Salary Information'}
            </button>
            {salaryInfo && (
              <div className="salary-info">
                <h4>Salary Information</h4>
                <p><strong>Position:</strong> {salaryInfo.position}</p>
                {salaryInfo.average_salary && (
                  <p><strong>Average Salary:</strong> {salaryInfo.average_salary}</p>
                )}
                {salaryInfo.salary_range && (
                  <p><strong>Range:</strong> {salaryInfo.salary_range}</p>
                )}
                <p><strong>Source:</strong> {salaryInfo.source || 'N/A'}</p>
                {salaryInfo.note && <p className="note">{salaryInfo.note}</p>}
              </div>
            )}
          </div>
        </div>

        {/* <div className="detail-header-actions">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="icon-btn edit"
            onClick={onEdit}
            title="Edit"
          >
            <FiEdit2 />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="icon-btn delete"
            onClick={onDelete}
            title="Delete"
          >
            <FiTrash2 />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="icon-btn close"
            onClick={onClose}
            title="Close"
          >
            <FiX />
          </motion.button>
        </div> */}

      </motion.div>
    </motion.div>
  );
};

export default ApplicationDetail;

