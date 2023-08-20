import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Load from '../components/load';
import Error from '../components/error';
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout';
import sweet from 'sweetalert2';

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


  if (loading) {
    return <Load />;
  }

  if (error) {
    return <Error />;
  }

async function onToken(token){
  console.log(token);
  const bookingDetails = {

    roomid,
    userid: JSON.parse(localStorage.getItem('currentUser'))._id,
    username: JSON.parse(localStorage.getItem('currentUser')).name,
    fromdate,
    todate,
    totalamount,
    totaldays,
    token

  };

  try {
    // for success popup
    setLoading(true);
    const response = await axios.post('/api/bookings/bookroom', bookingDetails, token);
    setLoading(false);
    sweet.fire('Congratulations', 'Your Room Booked Successfully', 'success').then(result=>{
      window.location.href= '/bookings'
    })
      } catch (error) {
    setLoading(false);
    sweet.fire('Oops', 'Something Went Wrong', 'error')

  }

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

          </div>

          <div className='col-md-5 mt-4' >
            <div style={{ textAlign: 'right' }}>
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name} </p>
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
              

              <StripeCheckout
                amount={totalamount * 100}
                token={onToken}
                currency='LKR'
                stripeKey="pk_test_51Ngl6bBXDV8VVuFB8RAoM0vVop1aZYdSSJqtwNN9SOKSLCkE8IkwVJ57zvcGSVYTtLal3z3D1H6e3FS8oifI8j140002YAwaS2"
                >
                <button className='btn btn-primary mt-2'>Pay Now</button>
                </StripeCheckout>
            </div>
          </div>




        </div>
      )}
    </div>
  );
}

export default Bookingscreen;
