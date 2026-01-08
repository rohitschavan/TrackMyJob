import { motion } from "framer-motion";

const Card = ({
  app,
  logoUrl,
  onView,
  onEdit,
  onDelete,
  getStatusColor,
}) => {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      variants={{
        rest: { scale: 1 },
        hover: { scale: 1.03 },
      }}
      transition={{
        duration: 0.8,
        ease: "backInOut",
      }}
      className="application-card"
    >
      {/* Inner content squish */}
      <motion.div
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.02 },
        }}
        transition={{
          duration: 0.8,
          ease: "backInOut",
        }}
      >
        {/* Header */}
        <div className="card-header">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={app.company_name}
              className="company-logo"
            />
          ) : (
            <div className="company-logo-placeholder">
              {app.company_name.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="company-info">
            <h3>{app.company_name}</h3>
            <p className="position">{app.position}</p>
          </div>
        </div>

        {/* Body */}
        <div className="card-body">
          <span
            className="status-badge"
            style={{ backgroundColor: getStatusColor(app.status) }}
          >
            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
          </span>

          {app.location && <p className="location">📍 {app.location}</p>}
          {app.application_date && (
            <p className="date">
              Applied: {new Date(app.application_date).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="card-actions">
          <button onClick={() => onView(app)} className="btn-view">
            View
          </button>
          <button onClick={() => onEdit(app)} className="btn-edit">
            Edit
          </button>
          <button onClick={() => onDelete(app.id)} className="btn-delete">
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
