import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import configData from "../config.json";
const axios = require('axios');

export const Register: React.FC = (props: any) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const registerUser = (event:any) =>{
    event.preventDefault();
    const form = event.currentTarget;
    if(form[1].value===form[2].value){
    const user = {
        email:form[0].value,
        password:form[1].value,
        firstName:form[3].value,
        lastName:form[4].value,
        photo:'profileImages/defaultImage.svg%2Bxml'
    }
    submitUserDb(user);
  }else{
    alert('Password Does not match!');
  }
  }

  const submitUserDb = async (user:any) =>{
    try {
    const result = await axios.post(configData.SERVER_URL +'/createUser.app', user);
      alert("SUCCESSFULLY CREATED USER!");
    }catch(error){
      alert("FAILED TO CREATE USER!");
    }
  }

  return (
  
    <>
      <Button size="lg" className="blue" onClick={handleShow}>
        Create New Account
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="blue">
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={registerUser}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" required/>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" required/>
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" required/>
            </Form.Group>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" required/>
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name" required/>
            </Form.Group>
            <Button className="blue" type="submit">
            Submit
          </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
