import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs } from 'antd';
import Load from '../components/load';
import Error from '../components/error';
const { TabPane } = Tabs;

function AdminScreen() {
    return (
        <div className='m-4 bs1'>
            <h1 className='text-center' style={{ fontSize: '30px' }}><b>Admin Panel</b></h1>
            <Tabs defaultActiveKey='1'>
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <h1>Rooms</h1>
                </TabPane>
                <TabPane tab="Add Room" key="3">
                    <h1>Add Rooms</h1>
                </TabPane>
                <TabPane tab="Users" key="4">
                    <h1>Users</h1>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default AdminScreen;

export function Bookings() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        async function fetchBookings() {
            try {
                const { data } = await axios.get("/api/bookings/getallbookings");
                setBookings(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(error);
            }
        }

        fetchBookings();
    }, [])

    return (
        <div className='row'>
            <div className='col-md-10'>
                <h1><b>Bookings</b></h1>
                {loading && <Load />}
                <br/>
                {bookings.length > 0 && <h1>Total Bookings: {bookings.length}</h1>}
            </div>
        </div>
    )
}
