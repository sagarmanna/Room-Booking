"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { formatCurrency } from "@/utils/formatCurrency";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingsPage() {

  const [bookings, setBookings] = useState([]);
  const [recentBooking, setRecentBooking] = useState(false);

  useEffect(() => {

    const stored =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const validBookings = stored.filter(
      (b) => b && b.id
    );

    setBookings(validBookings);

    // ⭐ show new booking notification
    if (validBookings.length > 0) {
      setRecentBooking(true);

      setTimeout(() => {
        setRecentBooking(false);
      }, 4000);
    }

  }, []);


  // ⭐ Cancel booking
  const cancelBooking = (id) => {

    const updated = bookings.filter(
      (b) => b.id !== id
    );

    localStorage.setItem(
      "bookings",
      JSON.stringify(updated)
    );

    setBookings(updated);
  };


  return (

    <DashboardLayout>

      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/im2.jpg')" }}
      />
      <div className="fixed inset-0 bg-black/60 -z-10" />


      {/* Page Title */}
      <div className="flex items-center justify-between mb-6">

        <h1 className="text-2xl font-bold text-white">
          My Bookings
        </h1>

        {/* ⭐ Notification */}
        {recentBooking && (
          <span className="
            bg-green-500
            text-white
            px-3 py-1
            rounded-full
            text-sm
          ">
            New Booking Added
          </span>
        )}

      </div>


      {bookings.length === 0 ? (

        <p className="text-gray-300">
          No bookings yet.
        </p>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <AnimatePresence>

            {bookings.map((room, index) => {

              const nights =
                room.checkIn && room.checkOut
                  ? Math.max(
                      1,
                      Math.ceil(
                        (new Date(room.checkOut) -
                          new Date(room.checkIn)) /
                          (1000 * 60 * 60 * 24)
                      )
                    )
                  : 0;

              const total =
                room.amount ||
                (room.price && nights
                  ? room.price * nights
                  : 0);

              return (

                <motion.div
                  key={`${room.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.3 }}
                  className="
                    bg-white/90 dark:bg-slate-900/90
                    backdrop-blur-xl
                    rounded-xl
                    p-5
                    shadow-lg
                    flex flex-col justify-between
                  "
                >

                  {/* Header */}
                  <div>

                    <div className="flex justify-between">

                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {room.name}
                      </h2>

                      <span className="
                        bg-green-500
                        text-white
                        text-xs
                        px-2 py-1
                        rounded-full
                      ">
                        Confirmed
                      </span>

                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">
                      Guests: {room.guests || "-"}
                    </p>

                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Check-in: {room.checkIn || "-"}
                    </p>

                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Check-out: {room.checkOut || "-"}
                    </p>

                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Payment: {room.paymentMethod || "-"}
                    </p>

                  </div>


                  {/* Price + Cancel */}
                  <div className="mt-4">

                    <p className="text-lg font-semibold text-indigo-600">
                      {total ? formatCurrency(total) : "Pending"}
                    </p>

                    <button
                      onClick={() => cancelBooking(room.id)}
                      className="
                        mt-3 w-full
                        bg-red-500 hover:bg-red-600
                        text-white
                        py-2 rounded-lg
                        transition
                      "
                    >
                      Cancel Booking
                    </button>

                  </div>

                </motion.div>

              );

            })}

          </AnimatePresence>

        </div>

      )}

    </DashboardLayout>

  );
}