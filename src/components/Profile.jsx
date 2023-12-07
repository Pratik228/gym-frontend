import React, { useEffect, useState } from "react";
import { showSnackbar } from "../slices/snackbarSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  useUpdateUserMutation,
  useGetProfileQuery,
} from "../slices/usersApiSlice";
const defaultProfilePic = "https://loremflickr.com/640/360";
import { useNavigate } from "react-router-dom";
function Profile() {
  const { data: user, isLoading, refetch } = useGetProfileQuery();
  const [newUser, setUser] = useState();
  const [photo, setPhoto] = useState(defaultProfilePic);
  const [receivesNotifications, setReceivesNotifications] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, phone, gender } = newUser;
      const res = await updateUser({ name, phone, gender }).unwrap();

      dispatch(showSnackbar({ message: "Profile updated successfully." }));
    } catch (err) {
      dispatch(showSnackbar({ message: "An error occurred." }));
    }
  };

  if (isLoading) return <div>Loading...</div>;

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
                value={newUser?.name}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, name: e.target.value }))
                }
                className="mt-2 block w-full p-1 mt-2 bg-white text-black"
              />
            </label>
          </div>
          {/* Email */}
          <div>
            <label className="block text-lg font-medium text-white">
              Email
              <input
                type="email"
                value={newUser?.email}
                disabled={true}
                className="mt-2 block w-full p-1 bg-white text-black opacity-50"
              />
            </label>
          </div>
          {/* Phone */}
          <label className="block text-lg font-medium text-white">
            Phone
            <input
              type="phone"
              value={newUser?.phone || " "}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="mt-2 block w-full p-1 bg-white text-black "
            />
          </label>
          {/* Gender */}
          <label className="block text-lg font-medium text-white">
            Gender
            <input
              type="phone"
              value={newUser?.gender}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, gender: e.target.value }))
              }
              className="mt-2 block w-full p-1 bg-white text-black "
            />
          </label>
        </div>
        <div className="flex flex-row mt-4">
          <input
            type="checkbox"
            checked={receivesNotifications}
            onChange={(e) => setReceivesNotifications(e.target.checked)}
            className="mt-1 mr-2"
          />

          <label className="block text-lg font-medium text-white">
            Would you like to receive notifications?
          </label>
        </div>

        <button onClick={handleProfileSubmit} className="mt-4 btn-primary">
          Update Profile
        </button>
      </form>
    </>
  );
}

export default Profile;
