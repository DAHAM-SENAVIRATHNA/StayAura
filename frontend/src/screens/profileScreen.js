import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Tabs } from 'antd';
import { ProfileOutlined, BookOutlined } from '@ant-design/icons';

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
                    <h1> Name : {user.name}</h1>
                    <h1> Email : {user.email}</h1>
                    <h1> isAdmin : {user.isAdmin ? 'Yes' : 'No'}</h1>


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
                    <h1>My bookings</h1>
                    {/* <MyBookings /> */}
                </TabPane>
            </Tabs>
        </div>
    );
}

export default ProfileScreen;



export function MyBookings() {

    useEffect(async () => {


        try {
            const rooms = (await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id })).data
            console.log(rooms)
        } catch (error) {
            console.log(error)

        }



    }, [])

    return (
        <div>
            <h1>My Bookings</h1>
        </div>
    )
}


