import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";

function DetailRestaurants() {
    const [data, setData] = useState([]);
    // const [checked, setChecked] = useState(false);
    
   

    useEffect(()=>{
        loadData();
        // handleFilterStatus();
    }, []);

    const loadData = async () => {
        return await axios.get("http://localhost:5000/restaurants").then((response) => setData(response.data)).catch((err) => console.log(err))
    
    }
  return (
    <div>
      {data.length === 0 ? (
        <p>Data Restaurant Not Found</p>
      ) : (
        data.map((item, index) => (
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default DetailRestaurants