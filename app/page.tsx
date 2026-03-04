"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoginPage() {

  const router = useRouter();
  const { login } = useAuth();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [photo,setPhoto] = useState("");
  const [error,setError] = useState("");

const handleLogin = (e) => {
  e.preventDefault();

  if (!email || !email.includes("@")) {
    setError("Please enter a valid email");
    return;
  }

  const user = {
    name: name.trim(),
    email: email.trim(),
    photo: photo || "/user.png"
  };

  localStorage.setItem("user", JSON.stringify(user));

  login(email);

  router.push("/dashboard");

};

  return (

    <div className="min-h-screen grid md:grid-cols-2 overflow-hidden">

      {/* LEFT IMAGE */}
      <div className="relative hidden md:block">

        <Image
          src="/photo_login.jpg"
          alt="Luxury Hotel"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end p-14">

          <motion.div
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            transition={{duration:1}}
            className="text-white"
          >

            <h1 className="text-5xl font-bold mb-4">
              Discover Elevated Comfort
            </h1>

            <p className="text-lg text-gray-200">
              Luxury stays. Effortless booking.
            </p>

          </motion.div>

        </div>
      </div>


      {/* RIGHT FORM */}
      <div className="relative flex items-center justify-center px-8 bg-gradient-to-br from-[#f8f9ff] via-[#eef1ff] to-[#e5e9ff]">

        <div className="absolute left-0 top-0 h-full w-32 bg-white rounded-r-full blur-3xl opacity-40"></div>

        <motion.div
          initial={{opacity:0,x:60}}
          animate={{opacity:1,x:0}}
          transition={{duration:0.8}}
          className="relative w-full max-w-md bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/40"
        >

          <h2 className="text-4xl font-semibold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-8">
            Sign in to manage your bookings
          </p>


          <form onSubmit={handleLogin} className="space-y-6">

            {/* NAME */}
            <div>
              <label className="text-sm text-gray-600">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2"
              />
            </div>


            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-600">
                Email Address
              </label>

              <input
                type="email"
                placeholder="username@email.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2"
              />

              {error && (
                <p className="text-red-500 text-sm mt-1">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
            >
              Login
            </button>

          </form>

        </motion.div>

      </div>

    </div>
  );
}