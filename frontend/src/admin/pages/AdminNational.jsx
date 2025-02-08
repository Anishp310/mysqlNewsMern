import React, { useEffect, useState } from 'react';
import Header from '../common/header';
import ComponentTable from '../common/ComponentTable';
import SummaryApi from '../../API/Api';
import AuthForm from '../common/AuthForm';
import { RxCross2 } from "react-icons/rx";
import { toast, Toaster } from "react-hot-toast";

const AdminNational = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [nationalData, setNationalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getToken = () => localStorage.getItem("token");
  const validateToken = () => {
    const token = getToken();
    if (!token) {
      toast.error("No token found. Please log in again.");
      return false;
    }
    return true;
  };

  const getApiData = async () => {
    try {
      const response = await fetch(SummaryApi.getAllNational.url);
      const jsonData = await response.json();
      setNationalData(jsonData);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

const handleCreateSubmit = async (data) => {
  validateToken();
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("imageData", data.imageData[0]);

  try {
    const response = await fetch(SummaryApi.addNational.url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (response.ok) {
      setOpenModal(false);
      setEditData(null);
      getApiData(); // Re-fetch the data after adding
    } else {
      console.error("Failed to create national entry", response.statusText);
    }
  } catch (error) {
    console.error("Error creating national entry:", error);
  }
};

const handleUpdateSubmit = async (data) => {
  validateToken();
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);

  // Append the image only if it's selected
  if (data.imageData[0]) {
    formData.append("imageData", data.imageData[0]);
  }

  try {
    const response = await fetch(`${SummaryApi.updateNational.url}/${editData.national_id}`, {
      method: "PUT",
      body: formData, // Send the formData with image if available
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (response.ok) {
      const updatedEntry = await response.json();

      // Update the local state with the updated entry
      setNationalData((prevData) =>
        prevData.map((item) =>
          item.national_id === updatedEntry.national_id ? updatedEntry : item
        )
      );

      setOpenModal(false);
      setEditData(null);
      getApiData(); // Re-fetch the data after adding
    } else {
      console.error("Failed to update entry", response.statusText);
    }
  } catch (error) {
    console.error("Error updating entry:", error);
  }
};




  const handleUpdate = (id) => {
    const rowToUpdate = nationalData.find((item) => item.national_id === id);
    setEditData(rowToUpdate);  // Set the data to edit in the modal
    setOpenModal(true);  // Open the modal
    console.log(setEditData)
  };

  const handleDelete = async (id) => {
    validateToken();
    try {
      const response = await fetch(`${SummaryApi.deleteNational.url}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (response.ok) {
        setNationalData((prevData) => prevData.filter((item) => item.national_id !== id));
      } else {
        console.error("Failed to delete entry", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const columns = [
    { name: 'Title', selector: (row) => row.title, sortable: true },
    { name: 'Description', selector: (row) => row.description, sortable: true },
    { name: 'Image', cell: (row) => row.image_data ? <img src={row.image_data} alt="National" className="w-16 h-16 object-cover rounded-md" /> : 'No Image', sortable: false },
    { name: 'Created At', selector: (row) => new Date(row.created_at).toLocaleString(), sortable: true },
    {
      name: 'Update',
      cell: (row) => (
        <button onClick={() => handleUpdate(row.national_id)} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-all">
          Update
        </button>
      ),
      sortable: false,
    },
    {
      name: 'Delete',
      cell: (row) => (
        <button onClick={() => handleDelete(row.national_id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-all">
          Delete
        </button>
      ),
      sortable: false,
    },
  ];

  return (
    <div>
      <Toaster position="top-right" />
      <Header heading="National News" />
      <div className="relative">
        <div className="absolute flex gap-2 top-4 left-4">
          <button
            className="bg-slate-500 px-4 py-1 rounded-lg text-white font-bold cursor-pointer hover:bg-slate-700 transition-all ease-in-out duration-200"
            onClick={() => { setEditData(null); setOpenModal(true); }}
          >
            Add
          </button>
        </div>

        {loading ? (
          <div className="text-center mt-4">Loading data...</div>
        ) : (
          <ComponentTable data={nationalData} columns={columns} />
        )}
      </div>

      {openModal && (
        <div className="absolute top-35 left-[40%] z-10 bg-slate-200 p-4 shadow-lg rounded-lg">
          <RxCross2 className="float-right cursor-pointer" onClick={() => setOpenModal(false)} />
          <AuthForm
  title={editData ? "Update National Entry" : "Create New National Entry"}
  onSubmit={editData ? handleUpdateSubmit : handleCreateSubmit}
  formFields={[
    { name: "title", type: "text", placeholder: "Title", defaultValue: editData?.title || "" },
    { name: "description", type: "textarea", placeholder: "Description", defaultValue: editData?.description || "" },
    { name: "imageData", type: "file", placeholder: "Upload Image", isFile: true },
  ]}
  editData={editData} // Pass the editData to AuthForm
/>


        </div>
      )}
    </div>
  );
};

export default AdminNational;
