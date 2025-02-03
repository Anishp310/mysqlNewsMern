import React, { useState } from 'react';
import DataTable from 'react-data-table-component';


const ComponentTable = ({data,columns}) => {
const [records,setRecords] =useState(data)
  function handleFilter(event){
  
    const filteredData = data.filter(row=>{
      return row.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    console.log(filteredData)
setRecords(filteredData)
  }
  return (
    <div className="p-4">
        
        <div>
        <input type="text" placeholder='Search...' className='border-1 rounded-lg float-right px-2 py-1'
        onChange={handleFilter} />
      </div>
    
      <DataTable
       
        columns={columns}
        data={records}
        sortable
        pagination
        highlightOnHover
        fixedHeader
      />
    </div>
  );
};

export default ComponentTable;
