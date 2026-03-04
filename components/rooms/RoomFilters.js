"use client";

import { motion } from "framer-motion";

export default function RoomFilters({
  search,
  setSearch,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  roomType,
  setRoomType,
  bedType,
  setBedType,
  minRating,
  setMinRating,
  totalRooms,
}) {
  return (
    <div
      className="
        bg-white/90 dark:bg-slate-900/90
        backdrop-blur-xl
        p-6 rounded-2xl shadow-xl
        space-y-6
        border border-slate-200 dark:border-slate-800
      "
    >
      {/* 🔎 Search */}
      <input
        type="text"
        placeholder="Search rooms..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full p-3 rounded-xl
          border border-slate-300 dark:border-slate-700
          bg-white dark:bg-slate-800
          text-slate-900 dark:text-white
          focus:ring-2 focus:ring-indigo-500 outline-none
        "
      />

      {/* 💰 Price Range */}
      <div>
        <p className="mb-2 font-medium dark:text-white">
          ₹{minPrice} – ₹{maxPrice}
        </p>

        <div className="flex flex-col gap-3">
          <input
            type="range"
            min="2000"
            max="10000"
            step="500"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <input
            type="range"
            min="2000"
            max="10000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>
      </div>

      {/* 🏨 Room Type */}
      <FilterGroup
        title="Room Type"
        options={["All", "Single", "Deluxe", "Suite"]}
        selected={roomType}
        setSelected={setRoomType}
        activeColor="bg-indigo-600"
      />

      {/* 🛏 Bed Type */}
      <FilterGroup
        title="Bed Type"
        options={["All", "Single", "Double", "Multiple"]}
        selected={bedType}
        setSelected={setBedType}
        activeColor="bg-emerald-600"
      />

      {/* ⭐ Rating */}
      <FilterGroup
        title="Rating"
        options={[
          { label: "All Ratings", value: 0 },
          { label: "4+ Stars", value: 4 },
          { label: "5 Stars", value: 5 },
        ]}
        selected={minRating}
        setSelected={setMinRating}
        activeColor="bg-yellow-500"
      />

      {/* Results Count */}
      <p className="text-slate-600 dark:text-slate-300">
        Showing {totalRooms} rooms
      </p>
    </div>
  );
}

/* ============================= */
/* Reusable Filter Button Group */
/* ============================= */

function FilterGroup({
  title,
  options,
  selected,
  setSelected,
  activeColor,
}) {
  return (
    <div className="space-y-2">
      <p className="font-medium dark:text-white">{title}</p>

      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const value = option.value ?? option;
          const label = option.label ?? option;

          return (
            <motion.button
              key={label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(value)}
              className={`
                px-4 py-2 rounded-xl transition-all duration-300
                ${
                  selected === value
                    ? `${activeColor} text-white shadow-lg`
                    : "bg-gray-200 dark:bg-slate-700 dark:text-white"
                }
              `}
            >
              {label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}