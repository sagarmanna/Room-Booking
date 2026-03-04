"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, BedSingle, BedDouble, Users } from "lucide-react";

export default function RoomCard({ room, onBook }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        rounded-2xl overflow-hidden
        bg-white dark:bg-slate-900
        shadow-xl hover:shadow-2xl
        transition-all duration-300
        border border-slate-200 dark:border-slate-800
      "
    >

      {/* Image Section */}
      <div className="relative h-52 overflow-hidden group">

        <Image
          src={room.image}
          alt={room.name}
          fill
          className="
            object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Rating Badge */}
        <div className="
          absolute top-3 left-3
          bg-white/90 dark:bg-slate-800/90
          backdrop-blur-md
          px-2 py-1
          rounded-lg
          flex items-center gap-1
          text-xs font-semibold
          shadow
        ">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          {room.rating}.0
        </div>

        {/* Booked Badge */}
        {!room.available && (
          <div className="
            absolute top-3 right-3
            bg-red-500
            text-white
            px-3 py-1
            rounded-full
            text-xs
            font-semibold
            shadow-lg
          ">
            Booked
          </div>
        )}

      </div>

      {/* Content */}
      <div className="p-5">

        {/* Room Title */}
        <h3 className="
          text-lg font-semibold
          text-slate-900 dark:text-white
          tracking-wide
        ">
          {room.name}
        </h3>


        {/* Price */}
        <p className="
          text-indigo-600 dark:text-indigo-400
          font-bold mt-1 text-lg
        ">
          ₹{room.price}
          <span className="text-sm text-slate-500 ml-1">/ night</span>
        </p>


        {/* ⭐ Star Rating */}
        <div className="flex items-center gap-1 mt-2">

          {[...Array(room.rating)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className="text-yellow-400 fill-yellow-400"
            />
          ))}

          <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">
            {room.rating}.0 Rating
          </span>

        </div>


        {/* 🛏 Bed Type */}
        <div className="
          flex items-center gap-2
          mt-3 text-sm
          text-slate-500 dark:text-slate-400
        ">

          {room.bedType === "Single" && <BedSingle size={18} />}
          {room.bedType === "Double" && <BedDouble size={18} />}
          {room.bedType === "Multiple" && <Users size={18} />}

          <span>{room.bedType} Bed</span>

        </div>


        {/* Button */}
        <button
          disabled={!room.available}
          onClick={() => onBook(room)}
          className={`
            mt-5 w-full py-2.5 rounded-xl font-medium
            transition-all duration-300
            ${
              room.available
                ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg"
                : "bg-slate-400 cursor-not-allowed text-white"
            }
          `}
        >
          {room.available ? "Book Now" : "Booked"}
        </button>

      </div>
    </motion.div>
  );
}