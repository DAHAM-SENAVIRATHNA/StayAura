import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Load from '../components/load';
import Error from '../components/error';

function Bookingscreen() {
  let { roomid } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState({}); // Initialize as an object instead of an array

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
        <div className='row justify-content-center mt-5 bs'>
          <div className='col-md-7 mt-2'>
            <h1> {room.name}</h1>
            <img src={room.imageUrl[0]} className='bigimg' alt='Room' />
            <div className=' col-md-10 ml-4 mt-2'>
            <h5>Description</h5>
            <p> {room.description}</p>
            </div>
          </div>

          <div className='col-md-4 mt-2' >
            <div style={{textAlign:'right'}}>
            <h1>Booking Details</h1>
            <hr />
            <b>
              <p>Name: </p>
              <p>From Date: </p>
              <p>To Date: </p>
              <p>Max People: {room.maxPeople} </p>
            </b>
            </div>

            <div className='mt-4' style={{textAllign:'right'}} >

            <div style={{textAlign:'right'}}>
           
              <b>
                <h1>Amount</h1>
                <hr />
                <p>Total Days: </p>
                <p>Rent per day: {room.rentperday}</p>
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
