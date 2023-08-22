import React, { useState } from "react";
import { Modal, Button, Carousel } from 'react-bootstrap';
import {Link} from 'react-router-dom';
function Room({ room, fromdate, todate }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="row bs ">
            <div className="col-md-4 mt-2 mb-2">
                <img src={room.imageUrl[0]} className="smalling" />
            </div>
            <div className="col-md-8 mt-2 mb-2">
                <h1>{room.name}</h1>
                <p>
                
                    {" "}
                    <b>
                    <p> Max Count : {room.maxPeople}</p>
                    <p> Phone Number : {room.phoneNumber}</p>
                    <p> Type : {room.type}</p></b>
                </p>

                <div style={{ float: "right" }}>

                    {(fromdate && todate) && (
                        <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                        <button className="btn btn-primary ">Book Now</button>
                    </Link>
                    )}
                    
                    <button className="btn btn-primary " onClick={handleShow}>View Details</button>
                </div>
            </div>



            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {room.imageUrl.map(url=>{
                            return <Carousel.Item>
                                <img 
                                    className="d-block w-100 bigimg"
                                    src={url}
                                />         

                              
                            </Carousel.Item>
                        })}

                               
                    </Carousel>
                         
         
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Room;


