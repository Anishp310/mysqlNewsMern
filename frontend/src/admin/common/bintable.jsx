import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const data = [
  { id: 1, name: 'Task A', deadline: '2025-02-01', type: 'Development', isComplete: 'No' },
  { id: 2, name: 'Task B', deadline: '2025-02-10', type: 'Testing', isComplete: 'Yes' },
  { id: 3, name: 'Task C', deadline: '2025-02-15', type: 'Design', isComplete: 'No' },
  { id: 4, name: 'Task D', deadline: '2025-03-05', type: 'Analysis', isComplete: 'Yes' },
  { id: 5, name: 'Task E', deadline: '2025-03-12', type: 'Development', isComplete: 'No' },
  { id: 6, name: 'Task F', deadline: '2025-04-01', type: 'Research', isComplete: 'Yes' },
  { id: 7, name: 'Task G', deadline: '2025-04-20', type: 'Documentation', isComplete: 'No' },
  { id: 8, name: 'Task H', deadline: '2025-05-01', type: 'Development', isComplete: 'Yes' },
  { id: 9, name: 'Task I', deadline: '2025-05-15', type: 'Testing', isComplete: 'No' },
  { id: 10, name: 'Task J', deadline: '2025-06-10', type: 'Deployment', isComplete: 'Yes' },
  { id: 11, name: 'Task G', deadline: '2025-04-20', type: 'Documentation', isComplete: 'No' },
  { id: 12, name: 'Task H', deadline: '2025-05-01', type: 'Development', isComplete: 'Yes' },
  { id: 13, name: 'Task I', deadline: '2025-05-15', type: 'Testing', isComplete: 'No' },
  { id: 14, name: 'Task J', deadline: '2025-06-10', type: 'Deployment', isComplete: 'Yes' },
];

const columns = [
  { name: 'Task Name', selector: (row) => row.name, sortable: true },
  { name: 'Deadline', selector: (row) => row.deadline, sortable: true },
  { name: 'Type', selector: (row) => row.type, sortable: true },
  { name: 'Completed', selector: (row) => row.isComplete, sortable: true },
];

const ComponentTable = () => {
  const [records, setRecords] = useState(data);

  function handleFilter(event) {
    const filteredData = data.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(filteredData);
  }

  return (
    <div className="p-4">
      {/* Search Input */}
      <div className="flex justify-end mb-2">
        <input
          placeholder="Search..."
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 text-black"
          onChange={handleFilter}
        />
      </div>

      {/* Data Table */}
      <div className="overflow-auto" style={{ maxHeight: '500px' }}> {/* Fixed height and scroll */}
        <DataTable
          columns={columns}
          data={records}
          sortable
          pagination
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="400px"
        />
      </div>
    </div>
  );
};

export default ComponentTable;
