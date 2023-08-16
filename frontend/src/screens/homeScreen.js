import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Load from '../components/load';

const Homescreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state to true
  const [error, setError] = useState(false); // Initialize error state to false

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/rooms/getrooms');
        console.log(response); // Log the response
        setData(response.data);
        setLoading(false); // Set loading to false on successful fetch
      } catch (error) {
        setError(true);
        console.error(error.message);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container'>
      <div className='row justify-content-center mt-5'>
             {loading ? (
          <h1><Load/></h1>
        ) : error ? (
          <h1>Error</h1>
        ) : (
          data.map((room) => {
            return <div className="col-md-10 mt-4">
              <Room room={room} />
            </div>
          })
        )}
      </div>
    </div>
  );
};

export default Homescreen;
