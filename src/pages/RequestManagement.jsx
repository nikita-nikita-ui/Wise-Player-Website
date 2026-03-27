import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const RequestManagement = ({ containerVariants, maroonMain }) => {
  // आप यहाँ अपनी Request list का डेटा भी रख सकते हैं
  const requests = [
    { id: '#8891', name: 'John Doe', status: 'Pending', date: '24 Mar 2024' },
    { id: '#8892', name: 'Jane Smith', status: 'Pending', date: '25 Mar 2024' },
  ];

  return (
    <motion.div 
      key="requests" 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible" 
      exit="hidden"
    >
      <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold m-0" style={{ color: maroonMain }}>
            Activation Requests
          </h5>
          <button className="btn btn-outline-dark px-3 py-2 fw-medium" style={{ borderRadius: '10px' }}>
            <Send size={16} className="me-2" /> Request Log
          </button>
        </div>

        <div className="table-responsive w-100">
          <table className="table table-hover align-middle">
            <thead className="bg-light">
              <tr style={{ fontSize: '13px' }}>
                <th className="py-3">REQ ID</th>
                <th className="py-3">USER NAME</th>
                <th className="py-3">STATUS</th>
                <th className="py-3">DATE</th>
                <th className="py-3 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={index}>
                  <td className="fw-bold">{req.id}</td>
                  <td>{req.name}</td>
                  <td>
                    <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2">
                      {req.status}
                    </span>
                  </td>
                  <td>{req.date}</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-success me-2 px-3">Approve</button>
                    <button className="btn btn-sm btn-danger px-3">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default RequestManagement;