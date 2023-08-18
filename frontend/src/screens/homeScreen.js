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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state to true
  const [error, setError] = useState(false); // Initialize error state to false

  const[fromdate, setfromDate] = useState()
  const[todate, settoDate] = useState()


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

  //Filter dates and set from and to dates
  function filterByDate(dates){
  
    setfromDate((dates[0].format('DD-MM-YYYY')))
    settoDate((dates[1].format('DD-MM-YYYY')))  
  }

  return (
    <div className='container'>

      <div className='row mt-4 ml-4 '>
        <div className="col-md-6 ">
          <RangePicker format= 'DD-MM-YYYY' onChange={filterByDate} />
        </div>
      </div>
      <div className='row justify-content-center mt-4'>

        {loading ? (
          <h1 style={{ marginTop: '250px' }}><Load /></h1>
        ) : error ? (
          <h1><Error /></h1>
        ) : (
          data.map((room) => {
            return <div className="col-md-10 mt-4">
              <Room room={room} fromdate={fromdate}  todate={todate}/>
            </div>
          })
        )}
      </div>
    </div>
  );
};

export default Homescreen;
