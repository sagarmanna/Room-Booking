"use client";

import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";

import { fetchRooms } from "@/services/api";
import RoomList from "@/components/rooms/RoomList";
import DashboardLayout from "@/components/layout/DashboardLayout";
import BookingModal from "@/components/booking/BookingModal";
import RoomFilters from "@/components/rooms/RoomFilters";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {

  const [rooms, setRooms] = useState([]);
  const [visibleRooms, setVisibleRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(2000);
  const [maxPrice, setMaxPrice] = useState(10000);

  const [roomType, setRoomType] = useState("All");
  const [bedType, setBedType] = useState("All");
  const [minRating, setMinRating] = useState(0);

  const [selectedRoom, setSelectedRoom] = useState(null);

  const observer = useRef();

  /* LOAD ROOMS */
  useEffect(() => {

    fetchRooms().then((data) => {

      const stored =
        JSON.parse(localStorage.getItem("bookings")) || [];

      const booked = stored.filter((b) => b && b.id);

      const updatedRooms = data.map((room) => ({
        ...room,
        available: !booked.some((b) => b.id === room.id),
      }));

      setRooms(updatedRooms);
      setLoading(false);

    });

  }, []);

const filteredRooms = useMemo(() => {

  return rooms.filter((room) => {

    const matchesSearch =
      room.name.toLowerCase().includes(search.toLowerCase());

    const matchesPrice =
      room.price >= minPrice && room.price <= maxPrice;

    const matchesRoomType =
      roomType === "All" ||
      room.type?.toLowerCase().includes(roomType.toLowerCase());

    const matchesBedType =
      bedType === "All" ||
      room.bed?.toLowerCase().includes(bedType.toLowerCase());

    const matchesRating =
      room.rating >= minRating;

    return (
      matchesSearch &&
      matchesPrice &&
      matchesRoomType &&
      matchesBedType &&
      matchesRating
    );

  });

}, [rooms, search, minPrice, maxPrice, roomType, bedType, minRating]);


  /* RESET VISIBLE ROOMS */
  useEffect(() => {
    setVisibleRooms(filteredRooms.slice(0, 6));
  }, [filteredRooms]);


  /* INFINITE SCROLL */
  const lastRoomRef = useCallback((node) => {

    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting) {

        setVisibleRooms((prev) =>
          filteredRooms.slice(0, prev.length + 6)
        );

      }

    });

    if (node) observer.current.observe(node);

  }, [loading, filteredRooms]);


  /* OPEN BOOKING */
  const handleBook = (room) => {
    setSelectedRoom(room);
  };


  /* REFRESH AFTER BOOKING */
  const refreshRooms = () => {

    const stored =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const booked = stored.filter((b) => b && b.id);

    setRooms((prev) =>
      prev.map((room) => ({
        ...room,
        available: !booked.some((b) => b.id === room.id),
      }))
    );

  };


  return (

    <DashboardLayout>

      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/im2.jpg')" }}
      />

      <div className="fixed inset-0 bg-black/60 -z-10" />


      {/* FILTERS */}
      <RoomFilters
        search={search}
        setSearch={setSearch}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        roomType={roomType}
        setRoomType={setRoomType}
        bedType={bedType}
        setBedType={setBedType}
        minRating={minRating}
        setMinRating={setMinRating}
        totalRooms={filteredRooms.length}
      />


      {/* ROOM LIST */}
      <AnimatePresence>

        <motion.div
          key={search + minPrice + maxPrice + roomType + bedType}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >

          <RoomList
            rooms={visibleRooms}
            lastRoomRef={lastRoomRef}
            onBook={handleBook}
          />

        </motion.div>

      </AnimatePresence>


      {/* BOOKING MODAL */}
      {selectedRoom && (

        <BookingModal
          room={selectedRoom}
          onClose={() => {
            setSelectedRoom(null);
            refreshRooms();
          }}
        />

      )}

    </DashboardLayout>

  );
}