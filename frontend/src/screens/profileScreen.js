import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Tabs } from 'antd';
import { ProfileOutlined, BookOutlined } from '@ant-design/icons';
import Load from '../components/load';
import Error from '../components/error';

const { TabPane } = Tabs;


const user = JSON.parse(localStorage.getItem("currentUser"))




function ProfileScreen() {

    useEffect(() => {

        if (!user) {
            window.location.href = '/login'
        }
    }, [])

    return (
        // Profile section of profile page
        <section className="vh-200" >
            <div className="container py-5 h-400">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-12 mb-4 mb-lg-0">
                        <div className="card mb-6" style={{ borderRadius: '.5rem' }}>
                            <div className="row g-0">
                                <div
                                    className="col-md-4 gradient-custom text-center text-white"
                                    style={{
                                        borderTopLeftRadius: '.5rem',
                                        borderBottomLeftRadius: '.5rem',
                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    }}
                                >
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                        alt="Avatar"
                                        className="img-fluid my-5"
                                        style={{ width: '100px' }}
                                    />
                                    <h5>{user.name}</h5>
                                    <p>{user.isAdmin ? 'Admin' : 'User'}</p>

                                </div>
                                <div className="col-md-8 mt-3">
                                    <div className="card-body p-6">
                                        <Tabs defaultActiveKey="1">
                                            <TabPane
                                                tab={
                                                    <span>
                                                        <ProfileOutlined />
                                                        Profile
                                                    </span>
                                                }
                                                key="2"
                                            >
                                                <br />
                                                <h6>Information</h6>
                                                <hr className="mt-0 mb-4" />
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <h6>Email</h6>
                                                        <p className="text-muted">{user.email}</p>
                                                    </div>

                                                </div>

                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <h6>User Name</h6>
                                                        <p className="text-muted">{user.name}</p>
                                                    </div>

                                                </div>

                                            </TabPane>
                                            <TabPane
                                                tab={
                                                    <span>
                                                        <BookOutlined />
                                                        Bookings
                                                    </span>
                                                }
                                                key="1"
                                            >

                                                <MyBookings />
                                            </TabPane>
                                        </Tabs>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProfileScreen;



export function MyBookings() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchBookings() {
            try {
                setLoading(true);
                const data = (await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id })).data;
                setBookings(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(error);
            }
        }

        fetchBookings();
    }, [user._id]);


    async function cancelBooking(bookingid, roomid) {
        try {
            setLoading(true);
            const result = await (await axios.post("/api/bookings/cancelbooking", { bookingid, roomid })).data;
            console.log(result);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            // Display an error message to the user
            setError("Failed to cancel booking");
        }
    }


    return (

        //Booking section on profile page
        <div>
            <div className="row">

                <div className="col-md-12">
                    {loading && <Load />}
                    <br />
                    {bookings.map((booking) => (
                        <div className="bs1" key={booking._id}>
                            <h1>
                                <b>{booking.room}</b>
                            </h1>
                            <h1 className="bkt">Booking ID: {booking._id}</h1>
                            <h1 className="bkt">
                                <b>Check-In:</b> {booking.fromdate}
                            </h1>
                            <h1 className="bkt">
                                <b>Check-Out:</b> {booking.todate}
                            </h1>
                            <h1 className="bkt">Total Amount: {`Rs. ` + booking.totalamount}</h1>
                            <h1 className="bkt">
                                Status: <b>{booking.status === 'booked' ? 'Confirmed' : 'Cancelled'}</b>
                            </h1>
                            <div className="text-right">
                                <button
                                    id="cancelBooking"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        cancelBooking(booking._id, booking.roomid);
                                    }}
                                >
                                    Cancel Booking
                                </button>
                            </div>
                        </div>

                    ))}
                </div>




            </div>
        </div>







    );
}


