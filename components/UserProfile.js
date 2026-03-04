"use client";

import { useEffect, useState } from "react";
import { LogOut, User, Save } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserProfile() {

  const router = useRouter();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");

  /* LOAD USER FROM LOCAL STORAGE */
  useEffect(() => {

    if (typeof window !== "undefined") {

      const storedUser =
        JSON.parse(localStorage.getItem("user"));

      if (storedUser) {
        setUser(storedUser);
        setName(storedUser.name || "");
        setEmail(storedUser.email || "");
        setPhoto(storedUser.photo || "");
      }

    }

  }, []);

  const firstLetter =
    user?.name ? user.name.charAt(0).toUpperCase() : "U";


  /* IMAGE UPLOAD */
  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);

  };


  /* SAVE PROFILE */
  const handleSave = () => {

    const updatedUser = {
      name,
      email,
      photo
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );
    }

    setUser(updatedUser);
    setEdit(false);

  };


  /* LOGOUT */
  const handleLogout = () => {

    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }

    router.push("/");

  };


  return (

    <div className="relative border-t border-white/10 p-4">

      {/* PROFILE BUTTON */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 cursor-pointer"
      >

        {photo ? (
          <img
            src={photo}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
            {firstLetter}
          </div>
        )}

        <div>

          <p className="text-white text-sm font-semibold">
            {user?.name || "User"}
          </p>

          <p className="text-xs text-gray-400">
            {user?.email}
          </p>

        </div>

      </div>


      {/* DROPDOWN */}
      {open && (

        <div className="absolute bottom-16 left-4 w-64 bg-slate-900 rounded-xl shadow-xl border border-slate-700 p-4">

          {!edit ? (

            <>
              <button
                onClick={() => setEdit(true)}
                className="flex items-center gap-2 text-white mb-4"
              >
                <User size={16}/>
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-400"
              >
                <LogOut size={16}/>
                Logout
              </button>
            </>

          ) : (

            <div className="space-y-3">

              {/* NAME */}
              <input
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Name"
                className="w-full p-2 rounded bg-slate-800 text-white"
              />

              {/* EMAIL */}
              <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-2 rounded bg-slate-800 text-white"
              />


              {/* PROFILE PHOTO UPLOAD */}
              <div className="flex flex-col gap-2">

                <label className="text-sm text-gray-400">
                  Upload Profile Photo
                </label>

                <label className="
                  cursor-pointer
                  bg-slate-800
                  hover:bg-slate-700
                  text-white
                  text-sm
                  px-3 py-2
                  rounded-lg
                  text-center
                ">

                  Choose Image

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                </label>

                {photo && (
                  <img
                    src={photo}
                    className="w-16 h-16 rounded-full object-cover mt-2"
                  />
                )}

              </div>


              {/* SAVE BUTTON */}
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-indigo-600 px-3 py-2 rounded text-white"
              >
                <Save size={16}/>
                Save
              </button>

            </div>

          )}

        </div>

      )}

    </div>

  );
}