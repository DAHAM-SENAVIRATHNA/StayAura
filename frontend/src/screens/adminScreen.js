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
                    <Rooms />
                </TabPane>
                <TabPane tab="Add Room" key="3">
                    <h1>Add Rooms</h1>
                </TabPane>
                <TabPane tab="Users" key="4">
                    <Users />
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


    //Bookings Tab   
    return (
        <div className='row'>
            <div className='col-md-10 ml-2'>
                <h1><b>Bookings</b></h1>
                {loading && <Load />}
                <br />

                {bookings.length > 0 && <h1>Total Bookings: {bookings.length}</h1>}
                <div className="d-flex justify-content-center">
                    <table className='table table-dark custom-table ml-4'>
                        <thead className='bs1'>
                            <tr>
                                <th>Booking ID</th>
                                <th>User ID</th>
                                <th>Room</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {bookings.length && (bookings.map(booking => {
                            return <tr>
                                <td>{booking._id}</td>
                                <td>{booking.userid}</td>
                                <td>{booking.room}</td>
                                <td>{booking.fromdate}</td>
                                <td>{booking.todate}</td>
                                <td><b style={{ color: booking.status === 'cancelled' ? 'red' : 'green' }}>{booking.status}</b></td>

                            </tr>
                        }))}

                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

//Rooms Tab
export function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchRooms() {
            try {
                const response = await axios.get("/api/rooms/getrooms");
                console.log("Response data:", response.data); // Add this line to check the data
                setRooms(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(error);
            }
        }

        fetchRooms();
    }, []);

    return (
        <div className='row'>
            <div className='col-md-10 ml-2'>
                <h1><b>Rooms</b></h1>
                {loading && <Load />}
                <br />

                <div className="d-flex justify-content-center">
                    <table className='table table-dark custom-table ml-4'>
                        <thead className='bs1'>
                            <tr>
                                <th>Room ID</th>
                                <th>Hotel Name</th>
                                <th>Type</th>
                                <th>Rent per Day</th>
                                <th>Max persons</th>
                                <th>Phone No</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.length > 0 && rooms.map(room => (
                                <tr key={room._id}>
                                    <td>{room._id}</td>
                                    <td>{room.name}</td>
                                    <td>{room.type}</td>
                                    <td>{`LKR ` + room.rentPerday}</td>
                                    <td>{room.maxPeople}</td>
                                    <td>{room.phoneNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


// Add rooms

export function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get("/api/users/getallusers");
                console.log("Response data:", response.data); // Add this line to check the data
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(error);
            }
        }

        fetchUsers();
    }, []);

    return (
        <div className='row'>
            <div className='col-md-10 ml-2'>
                <h1><b>Users</b></h1>
                {loading && <Load />}
                <br />

                <div className="d-flex justify-content-center">
                    <table className='table table-dark custom-table ml-4'>
                        <thead className='bs1'>
                            <tr>
                                <th>User ID</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Is Admin</th>

                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 && users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )


}