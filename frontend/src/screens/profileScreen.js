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
        <div className='profile'>
            <Tabs defaultActiveKey="1">
                <TabPane
                    tab={
                        <span>
                            <ProfileOutlined />
                            Profile
                        </span>
                    }
                    key="1"
                >
                    {/* My Profile */}

                    <br />
                    <div className='col-md-5 bs1'>
                        <h1 className='profilecard'> <b>Name : </b> {user.name}</h1>
                        <h1 className='profilecard'> <b>Email : </b> {user.email}</h1>
                        <h1 className='profilecard'> <b>isAdmin :</b> {user.isAdmin ? 'Yes' : 'No'}</h1>
                    </div>

                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <BookOutlined />
                            Bookings
                        </span>
                    }
                    key="2"
                >

                    <MyBookings />
                </TabPane>
            </Tabs>
        </div>
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

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    {loading && <Load />}
                    <br />
                    {bookings.map((booking) => (
                        <div className='bs1' key={booking._id}>
                            <h1 ><b>{booking.room} </b></h1>

                            <h1 className='bkt'>Booking ID: {booking._id}</h1>
                            <h1 className='bkt'><b>CheckIn:</b> {booking.fromdate}</h1>
                            <h1 className='bkt'><b>CheckOut:</b> {booking.todate}</h1>
                            <h1 className='bkt'>Total Amount: {`Rs. ` + booking.totalamount}</h1>
                            <h1 className='bkt'>Status: {booking.status == 'booked' ? 'Confirmed' : 'Cancelled'}</h1>
                            <div className='text-right'>
                                <button id= 'cancelBooking' className='btn btn-primary '>Cancel Booking</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


