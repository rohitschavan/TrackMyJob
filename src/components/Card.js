import { motion, useMotionValue, useTransform } from "framer-motion";
import "./Card.css";

const Card = ({ app, logoUrl, onView, onEdit, onDelete, getStatusColor }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="card-wrapper"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      <div className="card-glow" />

      <div className="card">
        {/* Header */}
        <div className="card-header">
          {logoUrl ? (
            <img src={logoUrl} className="logo" alt="Company logo" />
          ) : (
            <div className="logo placeholder">
              {app.company_name[0]}
            </div>
          )}

          <div className="company">
            <h3>{app.company_name}</h3>
            <p>{app.position}</p>
          </div>

          <motion.span
            className="status"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ backgroundColor: getStatusColor(app.status) }}
          >
            {app.status}
          </motion.span>
        </div>

        {/* Body */}
        <div className="card-body">
          {app.location && <p>📍 {app.location}</p>}
          {app.application_date && (
            <p>
              Applied ·{" "}
              {new Date(app.application_date).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="actions">
          <button onClick={() => onView(app)}>View</button>
          <button onClick={() => onEdit(app)}>Edit</button>
          <button className="danger" onClick={() => onDelete(app.id)}>
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
