"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { formatCurrency } from "@/utils/formatCurrency";
import jsPDF from "jspdf";

type Booking = {
  name: string;
  guests: number;
  checkIn: string;
  checkOut: string;
  paymentMethod: string;
  amount: number;
};

export default function PaymentPage() {

  const [payments, setPayments] = useState<Booking[]>([]);

  useEffect(() => {

    const stored =
      JSON.parse(localStorage.getItem("bookings") || "[]");

    const validPayments = stored.filter(
      (b: Booking) => b && b.amount
    );

    setPayments(validPayments);

  }, []);


  /* DOWNLOAD RECEIPT */
  const downloadReceipt = (booking: Booking) => {

    const doc = new jsPDF();

    const txn =
      "TXN-" +
      Math.random().toString(36).substring(2, 10).toUpperCase();

    doc.setFontSize(18);
    doc.text("Hotel Payment Receipt", 20, 20);

    doc.setFontSize(12);

    doc.text(`Booking ID: ${txn}`, 20, 40);
    doc.text(`Room: ${booking.name}`, 20, 50);
    doc.text(`Guests: ${booking.guests}`, 20, 60);
    doc.text(`Check-in: ${booking.checkIn}`, 20, 70);
    doc.text(`Check-out: ${booking.checkOut}`, 20, 80);
    doc.text(`Payment Method: ${booking.paymentMethod}`, 20, 90);
    doc.text(`Amount Paid: ${formatCurrency(booking.amount)}`, 20, 100);
    doc.text(
      `Payment Date: ${new Date().toLocaleDateString()}`,
      20,
      110
    );

    doc.text("Status: Paid", 20, 120);

    doc.save("payment-receipt.pdf");

  };


  return (

    <DashboardLayout>

      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/im2.jpg')" }}
      />

      <div className="fixed inset-0 bg-black/60 -z-10" />


      <h1 className="text-2xl font-bold text-white mb-8">
        Payment History
      </h1>


      {payments.length === 0 ? (

        <div className="text-gray-300 text-center mt-20">
          No payment history found.
        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {payments.map((pay, index) => {

            const txn =
              "TXN-" +
              Math.random().toString(36).substring(2, 8).toUpperCase();

            return (

              <div
                key={index}
                className="
                bg-white/90 dark:bg-slate-900/90
                backdrop-blur-xl
                rounded-xl
                p-6
                shadow-xl
              "
              >

                {/* Header */}
                <div className="flex justify-between items-center mb-2">

                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {pay.name}
                  </h2>

                  <span className="text-xs px-3 py-1 rounded-full bg-green-500 text-white">
                    Paid
                  </span>

                </div>

                {/* Transaction */}
                <p className="text-xs text-gray-500 mb-2">
                  {txn}
                </p>

                {/* Details */}
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Guests: {pay.guests}
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Check-in: {pay.checkIn}
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Check-out: {pay.checkOut}
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Payment: {pay.paymentMethod}
                </p>

                {/* Amount */}
                <p className="text-xl font-bold text-indigo-600 mt-3">
                  {formatCurrency(pay.amount)}
                </p>

                {/* Receipt Button */}
                <button
                  onClick={() => downloadReceipt(pay)}
                  className="
                  mt-4 w-full
                  bg-indigo-600 hover:bg-indigo-700
                  text-white
                  py-2
                  rounded-lg
                  text-sm
                "
                >
                  Download Receipt
                </button>

              </div>

            );

          })}

        </div>

      )}

    </DashboardLayout>

  );
}