import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const defaultProfilePic = "https://loremflickr.com/640/360";

function Profile() {
  const { userInfo } = useSelector((state) => state.auth);
  const [photo, setPhoto] = useState(defaultProfilePic);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Updated");

    // TODO: Update profile
  };
  return (
    <>
      <form>
        <img src={photo} alt="Profile Photo" className="mb-5 w-48 h-48" />

        <label className="block text-lg font-medium text-white mb-4">
          Change Photo
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-2 block w-full p-1"
          />
        </label>
        <div className="mt-4 grid grid-cols-2 gap-8">
          {/* Name */}
          <div>
            <label className="block text-lg font-medium text-white">
              Name
              <input
                type="text"
                value={userInfo?.name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 block w-full p-1 mt-2 bg-white text-black opacity-50"
              />
            </label>
          </div>
          {/* Email */}
          <div>
            <label className="block text-lg font-medium text-white">
              Email
              <input
                type="email"
                value={userInfo?.email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full p-1 bg-white text-black opacity-50"
              />
            </label>
          </div>
          {/* Phone */}
          <label className="block text-lg font-medium text-white">
            Phone
            <input
              type="phone"
              value={userInfo?.phone || " "}
              className="mt-2 block w-full p-1 bg-white text-black opacity-50 "
            />
          </label>
          {/* Gender */}
          <label className="block text-lg font-medium text-white">
            Gender
            <input
              type="phone"
              value={userInfo?.Geender}
              className="mt-2 block w-full p-1 bg-white text-black opacity-50 "
            />
          </label>
        </div>

        <button onClick={handleProfileSubmit} className="mt-4 btn-primary">
          Edit Profile
        </button>
      </form>
    </>
  );
}

export default Profile;
