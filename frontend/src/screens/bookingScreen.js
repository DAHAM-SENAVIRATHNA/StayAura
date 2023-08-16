import React from "react";
import { useParams } from "react-router-dom";

function Bookingscreen () {
  let { roomid } = useParams();

  return (
    <div>
      <h1>Book screen</h1>
      <h1>Room id = {roomid}</h1>
    </div>
  );
}

export default Bookingscreen;