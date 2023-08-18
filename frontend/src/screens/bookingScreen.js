import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Load from '../components/load';
import Error from '../components/error';
import moment from 'moment';

function Bookingscreen() {
  let { roomid, fromdate, todate } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState({});
  
  // Convert route parameters to proper moment objects
  const fromdates = moment(fromdate, 'DD-MM-YYYY');
  const todates = moment(todate, 'DD-MM-YYYY');
  
  // Calculate the total number of days
  const totaldays = todates.diff(fromdates, 'days');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/rooms/getroombyid', { roomid });
        console.log(response);
        setRoom(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [roomid]); // Include roomid as a dependency

  return (
    <div className='m-5'>

      {/* Render room details here */}
      {loading && <p><Load/></p>}
      {error && <p><Error/></p>}
      {!loading && !error && (
        <div className='row justify-content-center mt-4 bs'>
          <div className='col-md-6 mt-4'>
            <h1> {room.name}</h1>
            <img src={room.imageUrl[0]} className='bigimg' alt='Room' width='550' />

            <div className='ml-4 mt-4'>
            <h5>Description</h5>
            <p> {room.description}</p>
            </div>
          </div>

          <div className='col-md-5 mt-4' >
            <div style={{textAlign:'right'}}>
            <h1>Booking Details</h1>
            <hr />
            <b>
              <p>Name: </p>
              <p>From Date:  {fromdate}</p>
              <p>To Date:  {todate}</p>
              <p>Max People:  {room.maxPeople} </p>
            </b>
            </div>

            <div className='mt-4' style={{textAllign:'right'}} >

            <div style={{textAlign:'right'}}>
           
              <b>
                <h1>Amount</h1>
                <hr />
                <p>Total Days:  {totaldays+1} </p>
                <p>Rent per day:  {room.rentperday}</p>
                <p>Total Amount: </p>
              </b>
            </div>
            </div>

            <div style={{float: 'right'}}>
              <button className='btn btn-primary mt-2'>Pay Now</button>
            </div>
          </div>




        </div>
      )}
    </div>
  );
}

export default Bookingscreen;
