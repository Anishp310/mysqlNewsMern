import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

const ComponentTable = ({ data, columns }) => {
  const [records, setRecords] = useState(data);

  useEffect(() => {
    setRecords(data); // Update records whenever the data prop changes
  }, [data]);

  function handleFilter(event) {
    const filteredData = data.filter(row => {
      return row.title.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(filteredData);
  }

  // Define columns with fixed width
  const updatedColumns = columns?.map((col) => ({
    ...col,
    style: { ...col.style, width: col.width || '150px' }, // Default width of 150px
  }));

  return (
    <div className="p-4">
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="border-1 rounded-lg float-right px-2 py-1"
          onChange={handleFilter} // Ensure you pass the event here
        />
      </div>

      <DataTable
        columns={updatedColumns} // Pass updated columns with width styles
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
