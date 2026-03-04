"use client";
import { createContext, useContext, useReducer } from "react";

const BookingContext = createContext();

const initialState = {
  bookings: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_BOOKING":
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
      };
    default:
      return state;
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addBooking = (booking) => {
    dispatch({ type: "ADD_BOOKING", payload: booking });
  };

  return (
    <BookingContext.Provider value={{ state, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);