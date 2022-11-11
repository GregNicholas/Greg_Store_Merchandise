import React, { useState, useContext } from 'react';
import { Context } from "../../contexts/Context"
import { Link, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Button, Container, Form, Navbar} from 'react-bootstrap';
import { BsArrowReturnLeft } from 'react-icons/bs';
import styled from 'styled-components';

const IMGURL = "https://picsum.photos/seed/";
const IMGURLTAIL = "/286/180";

const HomeLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`
const FormItem = styled.div`
  border: 1px solid black;
  border-radius: 7px;
  padding: .5rem;
  margin-bottom: 1rem;
`
const FormLabel = styled(Form.Label)`
  margin-bottom: 0;
  font-size: 1rem;
`

export function AddMore() {
  const [newProducts, setNewProducts] = useState([{
    id: "",
    productImg: "",
    productName: "",
    description: "",
    creationTime: ""
  }]);

  const { addMultipleProducts } = useContext(Context);

  const navigate = useNavigate();

  const submitProducts = async (newProducts) => {
    await addMultipleProducts(newProducts);
    navigate("../home", { replace: true });
	}

  const handleFormChange = (index, event) => {
    let data = [...newProducts];
    data[index][event.target.name] = event.target.value;
    setNewProducts(data);
  }

  const addInputs = () => {
    setNewProducts(prev => (
      [...prev, {
        id: "",
        productImg: "",
        productName: "",
        description: "",
        creationTime: ""
      }]))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const completedProducts = newProducts.map(p => {
      const randomIndex = nanoid();
      const newProductImg = `${IMGURL}${randomIndex}${IMGURLTAIL}`;
      const currentDate = new Date();
      const newCreationTime = currentDate.getTime();

      return {
        id: nanoid(),
        productImg: newProductImg,
        productName: p.productName, 
        description: p.description,
        creationTime: newCreationTime
      }
    })

    submitProducts(completedProducts);
  }

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand><HomeLink to="/"><BsArrowReturnLeft /> Back to Dashboard</HomeLink></Navbar.Brand>
          <Button onClick={addInputs}>more items</Button>
        </Container>
      </Navbar>
      <Container>
      <Form onSubmit={handleSubmit}>
        {newProducts.map((product, index) => {
          return (
            <FormItem key={index}>
            <Form.Group className="mb-2" controlId={`input${index}`}>
              <FormLabel>Product Name</FormLabel>
              <Form.Control
                type="text"
                name="productName"
                onChange={event => handleFormChange(index, event)}
                value={newProducts.productName}
                placeholder="product name"
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-1"
              controlId={`textarea${index}`}
            >
              <FormLabel>Product Description</FormLabel>
              <Form.Control 
                as="textarea" 
                rows={2} 
                name="description"
                onChange={event => handleFormChange(index, event)}
                value={newProducts.description}
                required
              />
            </Form.Group>
            </FormItem>
          )
        })}
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
      </Container>
    </>
  )
}
