import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs } from 'antd';
import Load from '../components/load';
import Error from '../components/error';
import sweet from 'sweetalert2';
const { TabPane } = Tabs;




//Admin Panel Main screen component
function AdminScreen() {

    useEffect(() => {

        if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin)

            window.location.href = '/home'

    }
        , [])




    return (
        <div className='m-4 bs1'>
            <h2 className='text-center' style={{ fontSize: '35px' }}><b>Admin Panel</b></h2>
            <Tabs defaultActiveKey='1' style={{ marginLeft: '12px' }}>
                <TabPane tab="Bookings" key="1" >
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <Rooms />
                </TabPane>
                <TabPane tab="Add Room" key="3">
                    <AddRoom />
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


    //Bookings Tab Component 
    return (
        <div className="container mt-2">
            <h3>Bookings</h3>
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
    )
}

//Rooms Tab Component
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
        <div className="container mt-2">
            <h3>Rooms</h3>

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

    );
}


// Users Tab Component

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
        <div className="container mt-2">
            <h3>Users</h3>
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
    )


}

// Add Room Tab Component


export function AddRoom() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    // State variables for form fields
    const [name, setName] = useState('');
    const [imageUrl1, setImageUrl1] = useState('');
    const [imageUrl2, setImageUrl2] = useState('');
    const [imageUrl3, setImageUrl3] = useState('');
    const [imageUrl4, setImageUrl4] = useState('');
    const [rentPerday, setRentPerDay] = useState('');
    const [type, setType] = useState('');
    const [maxPeople, setMaxPeople] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
  
    async function addRoom(e) {
      e.preventDefault(); // Prevent form submission
  
      const newRoom = {
        name,
        imageUrl: [imageUrl1, imageUrl2, imageUrl3, imageUrl4],
        rentPerday,
        type,
        maxPeople,
        phoneNumber,
      };
  
      try {
        setLoading(true);
        const response = await axios.post("/api/rooms/addroom", newRoom);
        
  
        // Clear form fields after successful submission
        setName('');
        setImageUrl1('');
        setImageUrl2('');
        setImageUrl3('');
        setImageUrl4('');
        setRentPerDay('');
        setType('');
        setMaxPeople('');
        setPhoneNumber('');
        setLoading(false);
        sweet.fire('Congratulation', "New room added successfully")
        window.location.href = '/admin'
      } catch (error) {
        console.error(error);
        setLoading(false);
        sweet.fire('Oops', "Failed to add new room,  try again!")

      }
    }
  
return (
    <div className="container mt-2">
        {loading && <Load />}
        <h3>Add Room</h3>
        <form onSubmit={addRoom}>
            <div className="form-group">
                <label htmlFor="hotelName">Hotel Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="hotelName"
                    placeholder="Enter Hotel Name"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                />
            </div>
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="image1">Image URL 1</label>
                        <input
                            type="text"
                            className="form-control"
                            id="image1"
                            placeholder="Enter Image URL 1"
                            value={imageUrl1}
                            onChange={(e) => { setImageUrl1(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="image2">Image URL 2</label>
                        <input
                            type="text"
                            className="form-control"
                            id="image2"
                            placeholder="Enter Image URL 2"
                            value={imageUrl2}
                            onChange={(e) => { setImageUrl2(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="image3">Image URL 3</label>
                        <input
                            type="text"
                            className="form-control"
                            id="image3"
                            placeholder="Enter Image URL 3"
                            value={imageUrl3}
                            onChange={(e) => { setImageUrl3(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="image4">Image URL 4</label>
                        <input
                            type="text"
                            className="form-control"
                            id="image4"
                            placeholder="Enter Image URL 4"
                            value={imageUrl4}
                            onChange={(e) => { setImageUrl4(e.target.value) }}
                        />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="rentPerDay">Rent Per Day</label>
                <input
                    type="number"
                    className="form-control"
                    id="rentPerDay"
                    placeholder="Enter Rent Per Day"
                    value={rentPerday}
                    onChange={(e) => { setRentPerDay(e.target.value) }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="roomtype">Type</label>
                <select
                    className="form-control"
                    id="roomtype"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="Standard">Select room type..</option>
                    <option value="Standard">Standard</option>
                    <option value="Suite">Suite</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Family Suite">Family Suite</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="maxPeople">Maximum People</label>
                <input
                    type="number"
                    className="form-control"
                    id="maxPeople"
                    placeholder="Enter Maximum People"
                    value={maxPeople}
                    onChange={(e) => { setMaxPeople(e.target.value) }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={(e) => { setPhoneNumber(e.target.value) }}
                />
            </div>
            <button type="submit" className="btn btn-primary" >Add Room</button>
        </form>
    </div>
);

}

