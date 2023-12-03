import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AddressList = ({ addresses, onEdit, onDelete }) => {
  return (
    <div className="mt-6">
      <h3 className="text-2xl font-bold text-white mb-4">Your Addresses</h3>
      <ul>
        {addresses.map((address, index) => (
          <li
            key={index}
            className="text-white mb-2 w-4/5 bg-gray-700 p-8 rounded-lg flex justify-between items-center hover:bg-gray-600 cursor-pointer"
          >
            <div>
              {address.address}, {address.city}, {address.country},{" "}
              {address.state},{address.postalCode}, {address.phone}
            </div>
            <div>
              <EditIcon
                onClick={() => onEdit(index)}
                className="text-blue-500 hover:text-blue-700 cursor-pointer mx-2"
              />
              <DeleteIcon
                onClick={() => onDelete(index)}
                className="text-red-500 hover:text-red-700 cursor-pointer mx-2"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressList;
