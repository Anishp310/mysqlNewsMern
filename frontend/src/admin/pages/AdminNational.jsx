import React, { useEffect, useState } from 'react'
import Header from '../common/header'
import ComponentTable from '../common/ComponentTable'
import SummaryApi from '../../API/Api'
import AuthForm from '../common/AuthForm'
import { RxCross2 } from "react-icons/rx";

const AdminNational = () => {
  const [openModal,setOpenModal] = useState(true)
  //table
  const data = [
    {
      id: 1,
      name: 'Task A',
      deadline: '2025-02-01',
      type: 'Development',
      isComplete: 'No',
    },
    {
      id: 2,
      name: 'Task B',
      deadline: '2025-02-10',
      type: 'Testing',
      isComplete: 'Yes',
    },
    {
      id: 3,
      name: 'Task C',
      deadline: '2025-02-15',
      type: 'Design',
      isComplete: 'No',
    },
    {
      id: 4,
      name: 'Task D',
      deadline: '2025-03-05',
      type: 'Analysis',
      isComplete: 'Yes',
    },
    {
      id: 5,
      name: 'Task E',
      deadline: '2025-03-12',
      type: 'Development',
      isComplete: 'No',
    },
    {
      id: 6,
      name: 'Task F',
      deadline: '2025-04-01',
      type: 'Research',
      isComplete: 'Yes',
    },
    {
      id: 7,
      name: 'Task G',
      deadline: '2025-04-20',
      type: 'Documentation',
      isComplete: 'No',
    },
    {
      id: 8,
      name: 'Task H',
      deadline: '2025-05-01',
      type: 'Development',
      isComplete: 'Yes',
    },
    {
      id: 9,
      name: 'Task I',
      deadline: '2025-05-15',
      type: 'Testing',
      isComplete: 'No',
    },
    {
      id: 10,
      name: 'Task J',
      deadline: '2025-06-10',
      type: 'Deployment',
      isComplete: 'Yes',
    },
    {
      id: 11,
      name: 'Task A',
      deadline: '2025-02-01',
      type: 'Development',
      isComplete: 'No',
    },
    {
      id: 12,
      name: 'Task B',
      deadline: '2025-02-10',
      type: 'Testing',
      isComplete: 'Yes',
    },
    {
      id: 13,
      name: 'Task C',
      deadline: '2025-02-15',
      type: 'Design',
      isComplete: 'No',
    },
    {
      id: 14,
      name: 'Task D',
      deadline: '2025-03-05',
      type: 'Analysis',
      isComplete: 'Yes',
    },
    {
      id: 15,
      name: 'Task E',
      deadline: '2025-03-12',
      type: 'Development',
      isComplete: 'No',
    },
    {
      id: 16,
      name: 'Task F',
      deadline: '2025-04-01',
      type: 'Research',
      isComplete: 'Yes',
    },
  ];
  
  
  const columns = [
    {
      name: 'Task Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Deadline',
      selector: (row) => row.deadline,
      sortable: true,
    },
    {
      name: 'Type',
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: 'Completed',
      selector: (row) => row.isComplete,
      sortable: true,
    },
    {
      name: 'Update',
      cell: (row) => (
        <button
          onClick={() => handleUpdate(row.id)}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-all"
        >
          Update
        </button>
      ),
      sortable: false,
    },
    {
      name: 'Delete',
      cell: (row) => (
        <button
          onClick={() => handleDelete(row.id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-all"
        >
          Delete
        </button>
      ),
      sortable: false,
    },
  ];
  


  const [nationalData,setNationalData] = useState([])

  const getApiData = async () => {
    try {
      const response = await fetch(SummaryApi.getAllNational.url);
      const jsonData = await response.json();
      setNationalData(jsonData);
      console.log(jsonData)
    } catch (error) {
      toast.error(error.message);
    }
  };

useEffect(()=>{
  getApiData();
},[])
    
  // Handle Create Submit
  const handleCreateSubmit = async (data) => {
    console.log(data);
    const { title, description, image_data } = data;
  
    if (!image_data || image_data.length === 0) {
      console.error("No image selected!");
      return;
    }
  
    // Create FormData for handling the image upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image_data", image_data[0]); // Append the first file
  console.log(formData)
    try {
      // Send the form data including file
      const response = await fetch(SummaryApi.addNational.url, {
        method: "POST",
        body: formData, // Send as FormData
      });
  
      if (response.ok) {
        const result = await response.json();
        setNationalData([...nationalData, result]); // Add the new data to the table
        setOpenModal(false); // Close modal after submit
      } else {
        console.error("Failed to create national entry", response.statusText);
      }
    } catch (error) {
      console.error("Error creating national entry:", error);
    }
  };
  



  return (
    <div className=''>
    <Header heading="National News" /> 
    <div className='relative' >
    <div className='absolute flex gap-2 top-4 left-4'>
          <button className='bg-slate-500 px-4 py-1 rounded-lg text-white font-bold cursor-pointer hover:bg-slate-700 transition-all ease-in-out duration-200'
          onClick={()=>setOpenModal(true)}>Add</button>
          <button className='bg-slate-500 px-4 py-1 rounded-lg text-white font-bold cursor-pointer hover:bg-slate-700 transition-all ease-in-out duration-200'>Excel</button>
    </div>
      <div><ComponentTable data={data} columns={columns}/></div>
    </div>

    {openModal &&(
      <div className='absolute top-35 left-[40%]  z-10  bg-slate-200 p-4  shadow-lg rounded-lg '>
        <RxCross2  className='float-right cursor-pointer' 
         onClick={()=>setOpenModal(false)}/>

        <AuthForm
            title="Create New National Entry"
            onSubmit={handleCreateSubmit}
            formFields={[
              { name: "title", type: "text", placeholder: "Title", validation: { required: "Title is required" } },
              { name: "description", type: "textarea", placeholder: "Description", validation: { required: "Description is required" } },
              { name: "image_data", type: "file", placeholder: "Upload Image", validation: { required: "Image is required" }, isFile: true },
            ]}
          />
      </div>
    )}
    </div>
)
  
}

export default AdminNational