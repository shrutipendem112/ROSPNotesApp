import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Container } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { IoIosEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { ImPencil } from "react-icons/im";
import { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";

const Note = ({ data, refresh }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { title, content } = e.target.elements;
    try {
      const note = await axios.put(`${BASE_URL}/note/${data._id}`, {
        title: title.value,
        content: content.value,
      });
      refresh();
      handleClose();
      console.log("note updated successfully");
    } catch (error) {
      console.log("Error in updating", error);
    }
  };

  //Archive
  const toggleArchive = async() => {
    try {
      const isArchived = !data.isArchived;
      console.log(isArchived);
      const archived = await axios.put(`${BASE_URL}/note/${data._id}`, {
        archivedToggle: isArchived,
      })
      console.log("Archived");
      refresh();
    } catch (error) {
      console.log("Error is ", error);
    }
  };

  //delete
  const handleDelete = async() => {
    try {
      const response = await axios.delete(`${BASE_URL}/note/${data._id}`);
      refresh();
      console.log("deleted");
    } catch (error) {
      console.log("Error is ", error);
    }
  }
  return (
    <>
      <Card style={{ width: "100%" }} className="bgColor-dark p-3 borderColor-card shadow">
        <Row className="d-flex space-between ">
          <Col lg={6} className="textColor-dark">{new Date(data.createdAt).toLocaleDateString()}</Col>
          <Col lg={6}>
            <Button
              variant="outline-info"
              className="margin-btn mx-1 btnColor-hover"
              onClick={handleShow}
            >
              <ImPencil style={{color: "blueviolet"}}/>
            </Button>
            <Button variant="outline-info" className="margin-btn mx-1 btnColor-hover" onClick={handleDelete}>
              <MdDelete style={{color: "blueviolet"}}/>
            </Button>
            <Button
              variant="outline-info"
              className="margin-btn mx-1 btnColor-hover"
              onClick={() => {toggleArchive()}}
            >
              {data.isArchived === true ? <IoIosEye style={{color: "blueviolet"}}/> : <FaEyeSlash style={{color: "blueviolet"}}/>}
            </Button>
          </Col>
        </Row>
        <Card.Body>
          <Card.Title className="textColor-dark">{data.title}</Card.Title>
          <Card.Text className="textColor-dark">{data.content}</Card.Text>
        </Card.Body>
      </Card>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="bgColor-dark textColor-dark"
      >
        <Modal.Header closeButton className="bgColor-dark borderColor-card">
          <Modal.Title>Enter details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bgColor-dark borderColor-card">
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter title"
                defaultValue={data.title}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                placeholder="Content"
                defaultValue={data.content}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="btnColor btnColor-hover">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bgColor-dark borderColor-card">
          <Button variant="secondary" onClick={handleClose} className="btnColor btnColor-hover">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Note;
