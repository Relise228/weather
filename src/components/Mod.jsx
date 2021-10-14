import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";


export default ({ modal, setModal, data }) => {

    const handleClose = () => setModal(false);
    const handleShow = () => setModal(true);

    return <Modal show={modal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {data?.coord && <><p>Your current location {data.name}, {data.sys.country}</p>
                <p>Coordinates: longitude - {data.coord.lon} , lattitude - {data.coord.lat}</p></>}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
                OK
            </Button>
        </Modal.Footer>
    </Modal>
}