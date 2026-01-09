import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getDashboardStats } from '../services/api';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import LottieAnimation from './LottieAnimation';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Ensure minimum display time for loading animation
      const loadStartTime = Date.now();
      setLoading(true);
      const data = await getDashboardStats();
      
      // Calculate remaining time to meet 2500ms minimum
      const elapsed = Date.now() - loadStartTime;
      const remainingTime = Math.max(0, 1500 - elapsed);
      
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      setStats(data);
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LottieAnimation minDisplayTime={1500} />;
  }

  if (!stats) {
    return <div className="error">Failed to load dashboard data</div>;
  }

  // Prepare data for charts
  const statusData = Object.entries(stats.status_counts || {}).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const sourceData = Object.entries(stats.source_counts || {}).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const monthlyData = Object.entries(stats.monthly_counts || {}).map(([name, value]) => ({
    name,
    applications: value,
  }));

  const COLORS = ['#4A90E2', '#F5A623', '#50C878', '#E94B3C', '#9B9B9B', '#9B59B6'];

  return (
    <div className="dashboard">
      <h2>Dashboard & Analytics</h2>

      {/* Summary Cards */}
      <div className="stats-cards">
        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3>Total Applications</h3>
          <p className="stat-value">{stats.total_applications}</p>
        </motion.div>
        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3>Recent Applications</h3>
          <p className="stat-value">{stats.recent_applications}</p>
          <small>Last 30 days</small>
        </motion.div>
        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3>Active Statuses</h3>
          <p className="stat-value">{Object.keys(stats.status_counts || {}).length}</p>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Status Distribution - Pie Chart */}
        <motion.div 
          className="chart-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3>Applications by Status</h3>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data">No status data available</p>
          )}
        </motion.div>

        {/* Status Distribution - Bar Chart */}
        <motion.div 
          className="chart-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Applications by Status (Bar Chart)</h3>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#4A90E2" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data">No status data available</p>
          )}
        </motion.div>

        {/* Applications Over Time */}
        <motion.div 
          className="chart-container full-width"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3>Applications Over Time (Last 6 Months)</h3>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="applications" stroke="#4A90E2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data">No time series data available</p>
          )}
        </motion.div>

        {/* Applications by Source */}
        {sourceData.length > 0 && (
          <motion.div 
            className="chart-container full-width"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h3>Applications by Source</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sourceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#50C878" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>
{/* 
      <div className="dashboard-note">
        <p>
          <strong>Note:</strong> All visualizations reflect real-time data from your database.
          Changes made through CRUD operations will be reflected in these charts immediately.
        </p>
      </div> */}
    </div>
  );
};

export default Dashboard;

