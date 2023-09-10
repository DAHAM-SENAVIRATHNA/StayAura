import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Load from '../components/load';
import Error from '../components/error';
import 'antd/dist/reset.css';
import moment from 'moment';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

const Homescreen = () => {
  const [rooms, setRooms] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [type, setType] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/rooms/getrooms');
        setData(response.data);
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Function to filter rooms whenever searchKey or type changes
    const filterRooms = () => {
      let filteredRooms = data;

      if (searchKey.trim() !== '') {
        filteredRooms = filteredRooms.filter(room =>
          room.name.toLowerCase().includes(searchKey.toLowerCase())
        );
      }

      if (type !== 'all') {
        filteredRooms = filteredRooms.filter(room => room.type.toLowerCase() === type.toLowerCase());
      }

      setRooms(filteredRooms);
    };

    filterRooms(); // Apply filters when searchKey or type changes
  }, [searchKey, type, data]); // Listen for changes in searchKey, type, and data

  // Filter by dates and set from and to dates
  function filterByDate(dates) {
    setFromDate(dates[0].format('DD-MM-YYYY'));
    setToDate(dates[1].format('DD-MM-YYYY'));
  }

  return (

    <><div className='background-image'>
      <div className='selectors'>
        <div className='row mt-4'>
          <div className='welcome-text'> <h2>Welcome to Sri Lanka, where warm hospitality meets paradise. Book your stay with us and experience the finest in comfort and luxury</h2></div>
          <div className='col-md-4 mt-4'>
            <RangePicker className='datefilter' format='DD-MM-YYYY' onChange={filterByDate} />
          </div>
          <div className="col-md-4">
            <div className='serch-room'>
              <input
                type='text'
                className='form-control'
                placeholder='Search rooms by name'
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)} />
            </div>
          </div>
          <div className="col-md-3">
            <div className='select'>
              <select className='form-control' value={type} onChange={(e) => setType(e.target.value)}>
                <option value="all">All</option>
                <option value="standard">Standard</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
                {/* Add more options for other room types here */}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div><div className='row justify-content-center mt-8'>
        {loading ? (
          <h1 style={{ marginTop: '250px' }}><Load /></h1>
        ) : (
          rooms.map((room) => (
            <div className="col-md-10 mt-4" key={room.id}>
              {/* Check room type only if it's not 'all' */}
              {type === 'all' || room.type.toLowerCase() === type.toLowerCase() ? (
                <Room room={room} fromdate={fromDate} todate={toDate} />
              ) : null}
            </div>
          ))
        )}
      </div></>
    
  );
};

export default Homescreen;
