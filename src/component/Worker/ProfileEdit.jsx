import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../Api.jsx";

const ProfileEdit = ({ worker, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: worker.name,
    phone: worker.phone,
    expertise: worker.expertise.join(", "),
    experience: worker.experience || "",
    expectedCompensation: worker.expectedCompensation || "",
    city: worker.location.city || "",
    state: worker.location.state || "",
    country: worker.location.country || "",
    profileImage: worker.profileImage || "",
  });

  const [loading, setLoading] = useState(false); // State to manage loading

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "file"
          ? files[0]
          : name === "expertise"
          ? value.split(",").map((item) => item.trim())
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when submitting

    try {
      const updatedData = new FormData();
      updatedData.append("name", formData.name);
      updatedData.append("phone", formData.phone);
      updatedData.append("expertise", formData.expertise);
      updatedData.append("experience", formData.experience);
      updatedData.append("expectedCompensation", formData.expectedCompensation);
      updatedData.append("city", formData.city);
      updatedData.append("country", formData.country);
      updatedData.append("state", formData.state);
      if (formData.profileImage) {
        updatedData.append("profileImage", formData.profileImage);
      }

      const res = await axios.put(
        `${API_URL}/api/worker/update-profile`,
        updatedData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message, {
          theme: "dark",
          autoClose: 1000,
          position: "top-center",
        });
        onUpdate(); // Trigger reload of parent component
      }
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.success === false
      ) {
        toast.warn(error.response.data.message, {
          theme: "dark",
          autoClose: 1000,
          position: "top-center",
        });
      } else {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again.", {
          theme: "dark",
          autoClose: 1000,
          position: "top-center",
        });
      }
    } finally {
      setLoading(false); // Reset loading state after the response
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields */}
      <div>
        <label className="block font-bold">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block font-bold">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block font-bold">Expertise (comma-separated)</label>
        <input
          type="text"
          name="expertise"
          value={formData.expertise}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block font-bold">Experience (in years)</label>
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block font-bold">Expected Compensation</label>
        <input
          type="text"
          name="expectedCompensation"
          value={formData.expectedCompensation}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block font-bold">City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block font-bold">State</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block font-bold">Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block font-bold">Profile Image</label>
        <input
          type="file"
          name="profileImage"
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading} // Disable button while loading
      >
        {loading ? "Saving Changes..." : "Save Changes"}
      </button>
    </form>
  );
};

export default ProfileEdit;
