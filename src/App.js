import React, { useState } from 'react';
import DataTable from './components/DataTable';
import useData from './hooks/useData';
import { FaPlus } from 'react-icons/fa'; // Example icons
import './App.css'; // optional styling

function App() {
  const { data, isLoading, error, addData, deleteData, updateData } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
  });

  const handleAddClick = () => {
    setShowAddForm(true);
    setFormData({ name: '', gender: '', email: '' }); // Reset form
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addData(formData);
    setShowAddForm(false);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="app-container">
      <h1>Data Table</h1>

      <button className="add-button" onClick={handleAddClick}>
        <FaPlus /> Add Data
      </button>

      {showAddForm && (
        <div className="add-form">
          <h2>Add New Data</h2>
          <form onSubmit={handleFormSubmit}>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleFormChange} required />
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleFormChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleFormChange} required />
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelAdd}>Cancel</button>
          </form>
        </div>
      )}

      <DataTable data={data} deleteData={deleteData} updateData={updateData} />
    </div>
  );
}

export default App;