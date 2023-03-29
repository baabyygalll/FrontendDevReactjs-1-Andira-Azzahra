import React from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { useState, useEffect } from 'react';
import axios from 'axios';
import ToggleButton from "react-bootstrap/ToggleButton";
// CSS
import "./RestaurantsCard.css"




function RestaurantsCards() {
    const [dataResto, setDataResto] = useState([]);
    const [checked, setChecked] = useState(false);
    const [show, setShow] = useState(false);
    // const [modalData, setModalData] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   

    useEffect(()=>{
        loadDataResto();
        // handleFilterStatus();
    }, []);

    

    const loadDataResto = async () => {
        return await axios.get("http://localhost:5000/restaurants").then((response) => setDataResto(response.data)).catch((err) => console.log(err))
    
    }

      const handleFilterStatus = async (value) => {
        if(checked===false){
            return await axios
              .get(`http://localhost:5000/restaurants?status=OPEN%20NOW`)
              .then((response) => {
                setDataResto(response.data);
              })
              .catch((err) => console.log(err));
        }else{
             return await axios
               .get(`http://localhost:5000/restaurants`)
               .then((response) => {
                 setDataResto(response.data);
               })
               .catch((err) => console.log(err));

        }}

         const handleCategories = async (value) => {
            // console.log(value)
             return await axios
               .get(`http://localhost:5000/restaurants?categories=${value}`)
               .then((response) => {
                 setDataResto(response.data);
               })
               .catch((err) => console.log(err));
            }

             const handlePrice = async (value) => {
               // console.log(value)
               return await axios
                 .get(`http://localhost:5000/restaurants?price=${value}`)
                 .then((response) => {
                   setDataResto(response.data);
                 })
                 .catch((err) => console.log(err));
             };

         
      ;
 

  return (
    <div>
      <Container>
        <div className="restaurants-intro">
          <Container>
            <h1>Sekawan Restaurants</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero
              fuga doloribus non facere, harum quidem at quo architecto ea
              mollitia earum eaque totam dolores, tempora corrupti cumque ad
              quas itaque.
            </p>
          </Container>
        </div>

        <div className="navigation">
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="#home">Filter By:</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <ToggleButton
                    className="mb-2"
                    id="toggle-check"
                    type="checkbox"
                    variant="outline-primary"
                    checked={checked}
                    onClick={() => handleFilterStatus("OPEN NOW")}
                    value="1"
                    onChange={(e) => setChecked(e.currentTarget.checked)}
                  >
                    Open Now
                  </ToggleButton>

                  <NavDropdown title="Price" id="basic-nav-dropdown">
                    <NavDropdown.Item
                      href="#action/3.1"
                      onClick={() => handlePrice("$5 - $10")}
                    >
                      $5 - $10
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="#action/3.2"
                      onClick={() => handlePrice("$11 - $40")}
                    >
                      $11 - $40
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="#action/3.3"
                      onClick={() => handlePrice("$41 - $100")}
                    >
                      $41 - $100
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Categories" id="basic-nav-dropdown">
                    <NavDropdown.Item
                      href="#action/3.1"
                      onClick={() => handleCategories("American")}
                    >
                      AMERICAN
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="#action/3.2"
                      onClick={() => handleCategories("Japanese")}
                    >
                      JAPANESE
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="#action/3.3"
                      onClick={() => handleCategories("Mexican")}
                    >
                      MEXICAN
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="#action/3.3"
                      onClick={() => handleCategories("Korean")}
                    >
                      KOREAN
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>

        <h2>All Restaurants</h2>
        <div className="card-group">
          {dataResto.length === 0 ? (
            <p>Data Restaurant Not Found</p>
          ) : (
            dataResto.map((item, index) => (
              <div className="wrapper">
                <Card key={index} className="card">
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.rate}</Card.Text>
                    <Card.Text className="categoriesPrice">
                      {item.categories} - {item.price}
                    </Card.Text>
                    <Card.Text
                      style={{ minWidth: "300px" }}
                      className="openNow"
                    >
                      <div
                        className="dotStatus"
                        style={
                          item.status === "CLOSED"
                            ? { background: "red" }
                            : { background: "green" }
                        }
                      ></div>
                      {item.status}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="primary" onClick={handleShow}>
                      LEARN MORE
                    </Button>
                  </Card.Footer>
                </Card>
              </div>
            ))
          )}

           {/* modal */}

          {" "}
            {dataResto.length === 0 ? (
              <p>Data Restaurant Not Found</p>
            ) : (
              dataResto.map((modal, index) => (
                <Modal show={show} onHide={handleClose} key={index}>
                  <Modal.Header closeButton>
                    <Modal.Title>{modal.name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Woohoo, you're reading this text in a modal!
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              ))
            )}
          
        </div>
      </Container>
    </div>
  );
            }

export default RestaurantsCards