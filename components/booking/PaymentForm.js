"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Wallet, Landmark } from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";

export default function PaymentForm({
  amount,
  room,
  guests,
  checkIn,
  checkOut,
  onClose
}) {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("card");

  // Safe nights calculation
  const nights =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.ceil(
            (new Date(checkOut) - new Date(checkIn)) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 1;

  const totalAmount = nights * room.price;

  const handlePayment = () => {

    setLoading(true);

    const booking = {
      id: room.id,
      name: room.name,
      image: room.image,
      price: room.price,

      guests: guests || 1,
      checkIn,
      checkOut,
      nights,

      amount: totalAmount,

      paymentMethod: method,
      status: "confirmed",

      bookingDate: new Date().toISOString()
    };

    const stored =
      JSON.parse(localStorage.getItem("bookings")) || [];

    // prevent duplicate booking
    const exists = stored.some((b) => b.id === room.id);

    const updatedBookings = exists
      ? stored
      : [...stored, booking];

    localStorage.setItem(
      "bookings",
      JSON.stringify(updatedBookings)
    );

    setTimeout(() => {

      setLoading(false);

      onClose();

      // redirect to bookings page
      router.push("/bookings");

    }, 1000);
  };

  return (

    <div>

      {/* Title */}
      <h3 className="font-semibold mb-4 text-lg text-slate-900 dark:text-white">
        Payment Details
      </h3>

      {/* Booking Summary */}
      <div className="
        bg-slate-100 dark:bg-slate-800
        p-4 rounded-xl mb-5
        text-sm
        text-slate-900 dark:text-slate-200
      ">

        <p><b>Room:</b> {room.name}</p>
        <p><b>Guests:</b> {guests}</p>
        <p><b>Check-in:</b> {checkIn}</p>
        <p><b>Check-out:</b> {checkOut}</p>
        <p><b>Nights:</b> {nights}</p>

      </div>


      {/* Payment Method */}
      <div className="mb-6">

        <p className="text-sm font-medium mb-3 text-slate-900 dark:text-white">
          Select Payment Method
        </p>

        <div className="grid grid-cols-3 gap-3">

          <button
            onClick={() => setMethod("card")}
            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition
              ${
                method === "card"
                  ? "border-indigo-600 bg-indigo-50 dark:bg-slate-700"
                  : "border-slate-300 dark:border-slate-700"
              }
              text-slate-900 dark:text-white`}
          >
            <CreditCard size={20}/>
            Card
          </button>

          <button
            onClick={() => setMethod("upi")}
            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition
              ${
                method === "upi"
                  ? "border-indigo-600 bg-indigo-50 dark:bg-slate-700"
                  : "border-slate-300 dark:border-slate-700"
              }
              text-slate-900 dark:text-white`}
          >
            <Wallet size={20}/>
            UPI
          </button>

          <button
            onClick={() => setMethod("bank")}
            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition
              ${
                method === "bank"
                  ? "border-indigo-600 bg-indigo-50 dark:bg-slate-700"
                  : "border-slate-300 dark:border-slate-700"
              }
              text-slate-900 dark:text-white`}
          >
            <Landmark size={20}/>
            Bank
          </button>

        </div>

      </div>


      {/* Price Breakdown */}
      <div className="
        bg-slate-100 dark:bg-slate-800
        rounded-xl p-4 mb-6
        text-sm
        text-slate-900 dark:text-slate-200
      ">

        <div className="flex justify-between mb-2">
          <span>Price per night</span>
          <span>{formatCurrency(room.price)}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Nights</span>
          <span>{nights}</span>
        </div>

        <hr className="my-2 border-slate-300 dark:border-slate-600"/>

        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>{formatCurrency(totalAmount)}</span>
        </div>

      </div>


      {/* Pay Button */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="
          w-full py-3
          bg-green-600 hover:bg-green-700
          text-white
          rounded-xl
          font-semibold
          transition
          disabled:opacity-60
        "
      >

        {loading
          ? "Processing Payment..."
          : `Pay ${formatCurrency(totalAmount)}`}

      </button>

    </div>
  );
}