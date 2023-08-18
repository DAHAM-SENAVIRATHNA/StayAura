import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Load from '../components/load';
import Error from '../components/error';
import moment from 'moment'

function Bookingscreen() {
  const { roomid, fromdate, todate } = useParams();


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState({});
  const [totalamount, setTotalAmount] = useState(0);

  const fromdates = moment(fromdate, 'DD-MM-YYYY');
  const todates = moment(todate, 'DD-MM-YYYY');
  const totaldays = todates.diff(fromdates, 'days') + 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/rooms/getroombyid', { roomid });
        const rentPerday = response.data.rentPerday;
        const calculatedTotalAmount = rentPerday * totaldays;

        setTotalAmount(calculatedTotalAmount);
        setRoom(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  async function bookRoom() {
    const bookingDetails = {

      roomid,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,

    };

    try {
      const response = await axios.post('/api/bookings/bookroom', bookingDetails);
      console.log('Booking response:', response.data);
    } catch (error) {
      console.error('Error booking room:', error);
    }
  }

  if (loading) {
    return <Load />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className='m-5'>

      {loading && <p><Load /></p>}
      {error && <p><Error /></p>}
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
            <div style={{ textAlign: 'right' }}>
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>Name: </p>
                <p>From Date:  {fromdate}</p>
                <p>To Date:  {todate}</p>
                <p>Max People:  {room.maxPeople} </p>
              </b>
            </div>

            <div className='mt-4' style={{ textAllign: 'right' }} >

              <div style={{ textAlign: 'right' }}>

                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total Days:  {totaldays} </p>
                  <p>Rent per day:  {room.rentPerday}</p>
                  <p>Total Amount: {totalamount}</p>
                </b>
              </div>
            </div>

            <div style={{ float: 'right' }}>
              <button className='btn btn-primary mt-2' onClick={bookRoom}>Pay Now</button>
            </div>
          </div>




        </div>
      )}
    </div>
  );
}

export default Bookingscreen;
