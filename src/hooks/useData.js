import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function useData() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data (replace with your API call)
    const fetchData = async () => {
      try {
        // Simulating an API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const initialData = [
          { id: uuidv4(), name: 'John Doe', gender: 'Male', email: 'john.doe@example.com' },
          { id: uuidv4(), name: 'Jane Smith', gender: 'Female', email: 'jane.smith@example.com' },
          { id: uuidv4(), name: 'David Lee', gender: 'Male', email: 'david.lee@example.com' },
          { id: uuidv4(), name: 'Rajan', gender: 'Male', email: 'rajan.lee@example.com' },
          { id: uuidv4(), name: 'Surya', gender: 'Male', email: 'surya@example.com' },
          { id: uuidv4(), name: 'Sandeep', gender: 'Male', email: 'sandeep@example.com' },
          { id: uuidv4(), name: 'Ratheesh', gender: 'Male', email: 'ratheesh@example.com' },
          { id: uuidv4(), name: 'John Doe', gender: 'Male', email: 'john.doe@example.com' },
          { id: uuidv4(), name: 'Jane Smith', gender: 'Female', email: 'jane.smith@example.com' },
          { id: uuidv4(), name: 'David Lee', gender: 'Male', email: 'david.lee@example.com' },
          { id: uuidv4(), name: 'Alice Brown', gender: 'Female', email: 'alice.brown@example.com' },
          { id: uuidv4(), name: 'Michael Johnson', gender: 'Male', email: 'michael.johnson@example.com' },
          { id: uuidv4(), name: 'Emily Wilson', gender: 'Female', email: 'emily.wilson@example.com' },
          { id: uuidv4(), name: 'Robert Garcia', gender: 'Male', email: 'robert.garcia@example.com' },
          { id: uuidv4(), name: 'Linda Rodriguez', gender: 'Female', email: 'linda.rodriguez@example.com' },
          { id: uuidv4(), name: 'Christopher Williams', gender: 'Male', email: 'christopher.williams@example.com' },
          { id: uuidv4(), name: 'Ashley Davis', gender: 'Female', email: 'ashley.davis@example.com' },
          { id: uuidv4(), name: 'Kevin Martinez', gender: 'Male', email: 'kevin.martinez@example.com' },
          { id: uuidv4(), name: 'Jessica Anderson', gender: 'Female', email: 'jessica.anderson@example.com' },
        ];

        setData(initialData);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const addData = (newItem) => {
    newItem.id = uuidv4(); // Generate unique ID
    setData([...data, newItem]);
  };

  const deleteData = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  const updateData = (id, updatedItem) => {
    setData(data.map(item => (item.id === id ? updatedItem : item)));
  };

  return { data, isLoading, error, addData, deleteData, updateData };
}

export default useData;