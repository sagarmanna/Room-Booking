"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import PaymentForm from "./PaymentForm";
import { formatCurrency } from "@/utils/formatCurrency";

import {
  Star,
  BedSingle,
  BedDouble,
  Users,
  Calendar,
  X
} from "lucide-react";

export default function BookingModal({ room, onClose }) {

  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  if (!room) return null;

  const today = new Date().toISOString().split("T")[0];

  const nights =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.ceil(
            (new Date(checkOut) - new Date(checkIn)) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const total = nights ? nights * room.price : room.price;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="
          bg-white dark:bg-slate-900
          w-[520px]
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          shadow-2xl
          border border-slate-200 dark:border-slate-800
        "
      >

        {/* Image Preview */}
        <div className="relative h-48">

          <Image
            src={room.image}
            alt={room.name}
            fill
            className="object-cover"
          />

          <button
            onClick={onClose}
            className="
              absolute top-3 right-3
              bg-black/60 hover:bg-black/80
              text-white p-2 rounded-full
              transition
            "
          >
            <X size={16} />
          </button>

        </div>

        <div className="p-6">

          {/* Room title */}
          <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
            {room.name}
          </h2>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">

            {[...Array(room.rating)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className="text-yellow-400 fill-yellow-400"
              />
            ))}

            <span className="text-sm text-slate-500 dark:text-slate-300 ml-2">
              {room.rating}.0 Rating
            </span>

          </div>

          {/* Bed Type */}
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300 mb-4">

            {room.bedType === "Single" && <BedSingle size={18} />}
            {room.bedType === "Double" && <BedDouble size={18} />}
            {room.bedType === "Multiple" && <Users size={18} />}

            <span>{room.bedType} Bed</span>

          </div>

          {/* Price */}
          <div className="mb-4 text-sm text-slate-700 dark:text-slate-200">
            Price: <b>{formatCurrency(room.price)}</b> / night
          </div>

          {/* Guests */}
          <div className="mb-4">

            <label className="flex items-center gap-2 mb-1 font-medium text-slate-900 dark:text-white">
              <Users size={16} /> Guests
            </label>

            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="
                w-full border border-slate-300 dark:border-slate-700
                rounded-lg p-2
                bg-white dark:bg-slate-800
                text-slate-900 dark:text-white
              "
            >
              {[1,2,3,4,5].map((g) => (
                <option key={g} value={g}>
                  {g} Guest{g > 1 && "s"}
                </option>
              ))}
            </select>

          </div>

          {/* Check-in */}
          <div className="mb-4">

            <label className="flex items-center gap-2 mb-1 font-medium text-slate-900 dark:text-white">
              <Calendar size={16} /> Check-in
            </label>

            <input
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="
                w-full border border-slate-300 dark:border-slate-700
                rounded-lg p-2
                bg-white dark:bg-slate-800
                text-slate-900 dark:text-white
              "
            />

          </div>

          {/* Check-out */}
          <div className="mb-4">

            <label className="flex items-center gap-2 mb-1 font-medium text-slate-900 dark:text-white">
              <Calendar size={16} /> Check-out
            </label>

            <input
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="
                w-full border border-slate-300 dark:border-slate-700
                rounded-lg p-2
                bg-white dark:bg-slate-800
                text-slate-900 dark:text-white
              "
            />

          </div>

          {/* Nights */}
          {nights > 0 && (
            <div className="text-sm text-slate-500 dark:text-slate-300 mb-2">
              {nights} night{nights > 1 && "s"}
            </div>
          )}

          {/* Total */}
          <div className="mb-6 font-semibold text-lg text-slate-900 dark:text-white">
            Total: {formatCurrency(total)}
          </div>

          {!showPayment ? (

            <div className="flex gap-3">

              <button
                onClick={onClose}
                className="
                  flex-1 py-2 rounded-lg
                  bg-gray-300 hover:bg-gray-400
                  text-slate-800
                  transition
                "
              >
                Cancel
              </button>

              <button
                disabled={!checkIn || !checkOut}
                onClick={() => setShowPayment(true)}
                className="
                  flex-1 py-2 rounded-lg
                  bg-indigo-600 hover:bg-indigo-700
                  text-white
                  transition
                  disabled:opacity-50
                "
              >
                Continue to Payment
              </button>

            </div>

          ) : (

            <PaymentForm
              amount={total}
              room={room}
              guests={guests}
              checkIn={checkIn}
              checkOut={checkOut}
              onClose={onClose}
            />

          )}

        </div>

      </motion.div>

    </div>
  );
}