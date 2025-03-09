import React, { useState, useMemo, useCallback } from 'react';
import { FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'; // Icons
import './DataTable.css';

function DataTable({ data, deleteData, updateData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'
  const [editingRow, setEditingRow] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // You can make this configurable

  const handleEmailFilterChange = useCallback((email) => {
    setSelectedEmails((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  }, []);

  // useCallback for event handlers that are dependencies of useMemo
 const handleEditClick = useCallback((row) => {
    setEditingRow(row.id);
    setEditFormData(row);
  }, []);

  const handleEditFormChange = useCallback((e) => {
    setEditFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleUpdate = useCallback(() => {
    updateData(editFormData.id, editFormData);
    setEditingRow(null);
  }, [updateData, editFormData]);

  const filteredData = useMemo(() => {
    let filtered = [...data];

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (genderFilter) {
      filtered = filtered.filter(item => item.gender === genderFilter);
    }

    if (selectedEmails.length > 0) {
      filtered = filtered.filter(item => selectedEmails.includes(item.email));
    }

    return filtered;
  }, [data, searchTerm, genderFilter, selectedEmails]);

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    const sorted = [...filteredData];
    sorted.sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (valueA < valueB) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [filteredData, sortColumn, sortDirection]);

  const handleSort = useCallback((column) => {
    if (column === sortColumn) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
        setSortColumn(column);
        setSortDirection('asc');
    }
  }, [sortColumn, sortDirection]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(() => 
    sortedData.slice(indexOfFirstItem, indexOfLastItem),
  [sortedData, indexOfFirstItem, indexOfLastItem]);  // Only paginate after filtering and sorting
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="data-table-container">
      <div className="table-controls">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <div className="multi-select-dropdown">
          <select>
            <option>Select Emails</option>
          </select>
          <div className="dropdown-options">
            {Array.from(new Set(data.map(item => item.email))).map(email => (
              <label key={email}>
                <input
                  type="checkbox"
                  value={email}
                  checked={selectedEmails.includes(email)}
                  onChange={() => handleEmailFilterChange(email)}
                />
                {email}
              </label>
            ))}
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>
              Name  {(sortColumn === 'name') && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              {(!sortColumn || sortColumn !== 'name') && <FaSort />}
            </th>
            <th onClick={() => handleSort('gender')}>
              Gender {(sortColumn === 'gender') && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              {(!sortColumn || sortColumn !== 'gender') && <FaSort />}
            </th>
            <th onClick={() => handleSort('email')}>
              Email {(sortColumn === 'email') && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              {(!sortColumn || sortColumn !== 'email') && <FaSort />}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(row => (
            <tr key={row.id}>
              <td>
                {editingRow === row.id ? (
                  <input type="text" name="name" value={editFormData.name} onChange={handleEditFormChange} />
                ) : (
                  row.name
                )}
              </td>
              <td>
                {editingRow === row.id ? (
                  <select name="gender" value={editFormData.gender} onChange={handleEditFormChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  row.gender
                )}
              </td>
              <td>
                {editingRow === row.id ? (
                  <input type="email" name="email" value={editFormData.email} onChange={handleEditFormChange} />
                ) : (
                  row.email
                )}
              </td>
              <td>
                {editingRow === row.id ? (
                  <>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditingRow(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(row)}><FaEdit /></button>
                    <button onClick={() => deleteData(row.id)}><FaTrash /></button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={currentPage === pageNumber ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DataTable;