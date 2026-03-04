"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="
          bg-white dark:bg-slate-900
          p-8 rounded-2xl
          text-center
          shadow-2xl
        "
      >
        <CheckCircle
          size={60}
          className="text-green-500 mx-auto mb-4"
        />

        <h2 className="text-xl font-bold mb-2">
          Booking Successful
        </h2>

        <p className="text-gray-500 mb-6">
          Your room has been booked successfully.
        </p>

        <button
          onClick={onClose}
          className="
            px-6 py-2
            bg-indigo-600
            text-white
            rounded-lg
          "
        >
          View Bookings
        </button>

      </motion.div>

    </div>
  );
}