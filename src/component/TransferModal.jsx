import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { transferCredits } from "../auth/reSeller";
import { useTranslation } from "react-i18next";

const TransferModal = ({
  open,
  onClose,
  selectedUser,
  availableCredits,
  refreshData,
}) => {
  const { t } = useTranslation();

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  // Reset state when modal opens or user changes
  useEffect(() => {
    if (open) {
      setAmount("");
      setError("");
    }
  }, [open, selectedUser]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numAmount = Number(amount);

    // validation
    if (!numAmount || numAmount <= 0) {
      setError(t("enter_valid_amount"));
      return;
    }

    if (numAmount > availableCredits) {
      setError(t("not_enough_credits"));
      return;
    }

    const payload = {
      subResellerId: selectedUser.id,
      amount: numAmount,
    };

    const res = await transferCredits(payload);

    if (res.success) {
      setAmount("");
      setError("");
      onClose();

      if (refreshData) {
        await refreshData();
      }
    } else {
      setError(res.message || t("transfer_failed"));
    }
  };

  return (
    <div className="fixed inset-0 d-flex justify-content-center align-items-center bg-black bg-opacity-75 z-50 px-3">

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-4 rounded-4 shadow"
        style={{
          width: "100%",
          maxWidth: "380px",
          fontFamily: "Inter, sans-serif",
        }}
      >

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold m-0">{t("transfer_credits")}</h5>
          <MdClose
            onClick={onClose}
            style={{ cursor: "pointer", fontSize: "20px" }}
          />
        </div>

        {/* ERROR */}
        {error && (
          <div className="alert alert-danger py-2 mb-3">
            {error}
          </div>
        )}

        {/* USER INFO */}
        <div className="mb-2">
          <div className="text-muted small">{t("user")}</div>
          <div className="fw-semibold">
            {selectedUser?.fullName}
          </div>
        </div>

        {/* AVAILABLE COINS */}
        <div className="mb-3">
          <div className="text-muted small">{t("available_credits")}</div>
          <div className="fw-bold text-success">
            {selectedUser?.subResellerCredits ?? 0}
          </div>
        </div>

        {/* INPUT */}
        <input
          type="number"
          className="form-control mb-3"
          placeholder={t("enter_amount")}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* BUTTONS */}
        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-success w-100 fw-semibold"
          >
            {t("transfer")}
          </button>

          <button
            type="button"
            className="btn btn-secondary w-100"
            onClick={onClose}
          >
            {t("cancel")}
          </button>
        </div>

      </motion.form>
    </div>
  );
};

export default TransferModal;