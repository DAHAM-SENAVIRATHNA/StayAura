import React from 'react'
import { Tabs } from 'antd';

const {TabPane} = Tabs;

function AdminScreen() {
  return (
    <div className='m-4 bs1'>
      <h1 className='text-center' style={{fontSize:'30px'}}><b>Admin Pannel</b></h1>
      <Tabs defaultActiveKey='1'>
        <TabPane tab="Bookings" key="1">
            <h1>Bookings</h1>
        </TabPane>
        <TabPane tab="Rooms" key="2">
            <h1>Rooms</h1>
        </TabPane>
        <TabPane tab="Add Room " key="3">
            <h1>Add Rooms</h1>
        </TabPane>
        <TabPane tab="Users" key="4">
            <h1>Users</h1>
        </TabPane>
      </Tabs>

    </div>
  )
}

export default AdminScreen
