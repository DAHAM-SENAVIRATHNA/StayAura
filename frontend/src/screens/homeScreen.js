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
  const [toDate, setToDate] = useState();
  const [searchKey, setSearchKey] = useState('');
  const [roomType, setRoomType] = useState('all');

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
    // Function to filter rooms whenever searchKey or roomType changes
    const filterRooms = () => {
      let filteredRooms = data;

      if (searchKey.trim() !== '') {
        filteredRooms = filteredRooms.filter(room =>
          room.name.toLowerCase().includes(searchKey.toLowerCase())
        );
      }

      if (roomType !== 'all') {
        filteredRooms = filteredRooms.filter(room => room.roomType === roomType);
      }

      setRooms(filteredRooms);
    };

    filterRooms(); // Apply filters when searchKey or roomType changes
  }, [searchKey, roomType, data]); // Listen for changes in searchKey, roomType, and data

  // Filter by dates and set from and to dates
  function filterByDate(dates) {
    setFromDate(dates[0].format('DD-MM-YYYY'));
    setToDate(dates[1].format('DD-MM-YYYY'));
  }

  return (
    <div className='container'>
      <div className='selectors'>
        <div className='row mt-4'>
          <div className='col-md-4 mt-4'>
            <RangePicker className='datefilter' format='DD-MM-YYYY' onChange={filterByDate} />
          </div>
          <div className="col-md-4">
            <input
              type='text'
              className='form-control'
              placeholder='Search rooms by name'
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <div className='select'>
              <select
                className='form-control'
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option value="all">All</option>
                <option value="standard">Standard</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className='row justify-content-center mt-8'>
        {loading ? (
          <h1 style={{ marginTop: '250px' }}><Load /></h1>
        ) : (
          rooms.map((room) => (
            <div className="col-md-10 mt-4" key={room.id}>
              <Room room={room} fromdate={fromDate} todate={toDate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Homescreen;
