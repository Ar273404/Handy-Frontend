import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import dummyProfileImage from "../assets/Images/Profile_pic.png"
import ProfileEdit from "../component/Worker/ProfileEdit.jsx";
import { API_URL } from "../Api.jsx";

const WorkerProfile = () => {
  const [worker, setWorker] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/worker/profile`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setWorker(res.data.worker);
      }
     { console.log(res);}
    } catch (error) {
      toast.error("Failed to load profile data.", {
        theme: "dark",
        autoClose: 1000,
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!worker) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <button
          onClick={() => setEditMode(!editMode)}
          className="bg-blue-600 text-white px-4 py-2 rounded">
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </div>
      {editMode ? (
        <ProfileEdit worker={worker} onUpdate={fetchProfile} />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={worker.profileImage || dummyProfileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{worker.name}</h2>
              <p className="text-gray-600">{worker.email}</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold">Phone</h3>
            <p>{worker.phone}</p>
          </div>
          <div>
            <h3 className="font-bold">Expertise</h3>
            <p>{worker.expertise.join(", ")}</p>
          </div>
          <div>
            <h3 className="font-bold">Experience</h3>
            <p>{worker.experience || "Not specified"} years</p>
          </div>
          <div>
            <h3 className="font-bold">Expected Compensation</h3>
            <p>{worker.expectedCompensation || "Not specified"}</p>
          </div>
          <div>
            <h3 className="font-bold">Location</h3>
            <p>
              {worker.location.city}, {worker.location.state},{" "}
              {worker.location.country}
            </p>
          </div>
          <div>
            <h3 className="font-bold">Rating</h3>
            <div className="flex items-center">
              <div className="text-yellow-500 text-xl">
                {"★".repeat(Math.floor(worker.rating)) +
                  "☆".repeat(5 - Math.floor(worker.rating))}
              </div>
              <span className="ml-2 text-gray-600">({worker.rating} / 5)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerProfile;
