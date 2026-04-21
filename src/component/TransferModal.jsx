import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { transferCredits } from "../auth/reSeller";

const TransferModal = ({
  open,
  onClose,
  selectedUser,
  availableCredits,
  refreshData,
}) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   

    if (!amount || amount <= 0) {
      setError("Enter valid amount");
      return;
    }

    if (Number(amount) > availableCredits) {
      setError("Not enough credits");
      return;
    }

    const payload = {
      subResellerId: selectedUser.id,
      amount: Number(amount),
    };

    const res = await transferCredits(payload);

    if (res.success) {
      setAmount("");
      onClose();
      refreshData(); // 🔥 refresh dashboard + table
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/80 z-50">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-5 rounded-2xl w-[400px]"
      >
        <div className="flex justify-between items-center mb-3">
          <h4 className="fw-bold">Transfer Credits</h4>
          <MdClose
            className="cursor-pointer text-xl"
            onClick={onClose}
          />
        </div>

        {error && <div className="text-danger mb-2">{error}</div>}

        <p>
          <strong>User:</strong> {selectedUser?.fullName}
        </p>

        <p>
          <strong>Available Credits:</strong>{" "}
          <span className="text-success">{availableCredits}</span>
        </p>

        <input
          type="number"
          className="form-control my-3"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="d-flex gap-2">
          <button className="btn btn-success w-100">Transfer</button>
          <button
            type="button"
            className="btn btn-secondary w-100"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default TransferModal;