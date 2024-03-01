import React, { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import pgiImage from './assets/images/pgi.jpg';
import Dropdown from 'react-bootstrap/Dropdown';
import pslotImage from './assets/images/parkingslot.jpg';
import { Form, FormControl } from 'react-bootstrap';

function App() {
  const [selectedItem1, setSelectedItem1] = useState("Small Car");
  const [selectedItem2, setSelectedItem2] = useState("Medium Car");
  const [selectedItem3, setSelectedItem3] = useState("Large Car");
  const [parkingDuration, setParkingDuration] = useState({}); // New state to store parking duration

 

  const [parkingSlots, setParkingSlots] = useState([
    { id: 1, type: "Small Car", occupiedBy: "" },
    { id: 2, type: "Small Car", occupiedBy: "" },
    { id: 3, type: "Small Car", occupiedBy: "" },
    { id: 4, type: "Small Car", occupiedBy: "" },
    { id: 5, type: "Small Car", occupiedBy: "" },
    { id: 6, type: "Small Car", occupiedBy: "" },
    { id: 7, type: "Medium Car", occupiedBy: "" },
    { id: 8, type: "Medium Car", occupiedBy: "" },
    { id: 9, type: "Medium Car", occupiedBy: "" },
    { id: 10, type: "Medium Car", occupiedBy: "" },
    { id: 11, type: "Medium Car", occupiedBy: "" },
    { id: 12, type: "Medium Car", occupiedBy: "" },
    { id: 13, type: "Large Car", occupiedBy: "" },
    { id: 14, type: "Large Car", occupiedBy: "" },
    { id: 15, type: "Large Car", occupiedBy: "" },
    { id: 16, type: "Large Car", occupiedBy: "" },
  ]);

  const handleDropdownSelect = (eventKey, event, gateNumber) => {
    const carSize = event.target.innerText;
    switch (gateNumber) {
      case 1:
        setSelectedItem1(carSize);
        break;
      case 2:
        setSelectedItem2(carSize);
        break;
      case 3:
        setSelectedItem3(carSize);
        break;
      default:
        break;
    }
  }

  const assignParkingSlot = (gate, selectedCar) => {
    const availableSlots = parkingSlots.filter(slot => slot.occupiedBy === "" && (selectedCar === "Small Car" || slot.type === selectedCar || (selectedCar === "Medium Car" && slot.type === "Large Car")));
  
    if (availableSlots.length > 0) {
      const selectedSlot = availableSlots[0]; 
      const updatedSlots = parkingSlots.map(slot =>
        slot.id === selectedSlot.id ? { ...slot, occupiedBy: selectedCar } : slot
      );
      setParkingSlots(updatedSlots);
      alert(`Assigned to ${selectedCar} parking slot ${selectedSlot.id} at Gate ${gate}`);
    } else {
      alert(`No available ${selectedCar} parking slot at Gate ${gate}`);
    }
  };


  const calculateParkingFee = (hours, slotType) => {
    const flatRate = 40; 
    let extraRate = 0; 
    const dailyRate = 5000; 
    let totalFee = 0; 
  
    
    const fullDays = Math.floor(hours / 24);
    const fullDayCharge = fullDays * dailyRate;
  
   
    const remainingHours = hours % 24;
  
   
    if (remainingHours > 3) {
      const extraHours = remainingHours - 3;
      switch (slotType) {
        case "Small Car":
          extraRate = extraHours * 20;
          break;
        case "Medium Car":
          extraRate = extraHours * 60;
          break;
        case "Large Car":
          extraRate = extraHours * 100;
          break;
        default:
          extraRate = 0;
      }
    }
  
 
    if (hours <= 3) {
   
      totalFee = flatRate;
    } else if (hours > 3 && hours <= 24) {
     
      totalFee = flatRate + extraRate;
    } else {
      
      totalFee = fullDayCharge + (remainingHours > 3 ? flatRate + extraRate : 0);
    }
  
    return totalFee;
  }

 
  const handleDurationChange = (slotId, event) => {
    const duration = event.target.value;
    setParkingDuration({ ...parkingDuration, [slotId]: duration });
  };

  
  const handleEndParking = (slotId, slotType) => {
    const duration = parkingDuration[slotId] || 0;
    const fee = calculateParkingFee(parseInt(duration, 10), slotType);
    alert(`Parking fee for slot ${slotId}: ${fee} pesos.`);
  };

  
  return (
    <Container>
     
      <Row>
        {[1, 2, 3].map((gateNumber) => (
          <Col key={gateNumber} md={4} className="my-2">
            <Card style={{ width: '45%', margin: '10px', }}>
              <Card.Img variant="top" src={pgiImage} />
              <Card.Body>
                <Card.Title>Gate {gateNumber}</Card.Title>
                <Card.Text>
                  Click to Enter gate {gateNumber}
                </Card.Text>
                <Dropdown style={{ width: "100%" }} onSelect={(eventKey, event) => handleDropdownSelect(eventKey, event, gateNumber)}>
                  <Dropdown.Toggle variant="success" id={`dropdown-basic-${gateNumber}`}>
                    {gateNumber === 1 ? selectedItem1 : gateNumber === 2 ? selectedItem2 : selectedItem3}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="1">Small Car</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Medium Car</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Large Car</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button variant="primary" onClick={() => assignParkingSlot(gateNumber, gateNumber === 1 ? selectedItem1 : gateNumber === 2 ? selectedItem2 : selectedItem3)}>Click to Enter gate {gateNumber}</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {/* Parking Slots Display */}
      <Row>
      {parkingSlots.map((slot) => (
          <Col key={slot.id} md={4} className="my-2">
            <Card style={{ width: '45%', margin: '10px' }}>
              <Card.Img variant="top" src={pslotImage} />
              <Card.Body>
                <Card.Title>{slot.type} Parking Slot {slot.id}</Card.Title>
                <Card.Text>
                  {slot.occupiedBy ? `Occupied by: ${slot.occupiedBy}` : 'Available'}
                </Card.Text>
                <Form onSubmit={(e) => e.preventDefault()}>
                  <FormControl
                    type="number"
                    placeholder="Enter parking duration in hours"
                    onChange={(e) => handleDurationChange(slot.id, e)}
                  />
                  <Button variant="primary" onClick={() => handleEndParking(slot.id, slot.type)}>End Parking</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
