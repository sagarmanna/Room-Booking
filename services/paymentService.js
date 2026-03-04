const handlePayment = async () => {

  setLoading(true);

  try {

    const payment = await processPayment({
      amount,
      method: "card"
    });

    const booking = {
      ...room,
      bookingId: Date.now(),
      guests,
      checkIn,
      checkOut,
      amount,
      paymentId: payment.transactionId
    };

    const stored =
      JSON.parse(localStorage.getItem("bookings")) || [];

    localStorage.setItem(
      "bookings",
      JSON.stringify([...stored, booking])
    );

    alert("🎉 Payment Successful!");

    onClose();

  } catch (err) {

    alert(err.message);

  }

  setLoading(false);

};