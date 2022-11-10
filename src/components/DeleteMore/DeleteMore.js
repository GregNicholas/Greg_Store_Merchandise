import React, { useState, useContext } from 'react';
import { Context } from "../../contexts/Context"
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Form, Navbar} from 'react-bootstrap';
import styled from 'styled-components';

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

export function DeleteMore() {
  const [deleteList, setDeleteList] = useState([]);

  const { products, deleteMultipleProducts } = useContext(Context);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, checked } = e.target;
           console.log(value)
    // Case 1 : The user checks the box
    if (checked) {
      setDeleteList(prev => [...prev, value]);
    }
  
    // Case 2  : The user unchecks the box
    else {
      setDeleteList(prev => {
        return prev.filter(element => element !== value)
      });
    }
  };

  const deleteProducts = async (toDelete) => {
    await deleteMultipleProducts(toDelete);
    navigate("../home", { replace: true });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
      if(deleteList.length > 0){
        const toDelete = products.filter(p => {
          return deleteList.includes(p.id)
        })
        deleteProducts(toDelete)
      }
    }

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand><HomeLink to="/">Back to Dashboard</HomeLink></Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Form onSubmit={handleSubmit}>
            {products.map((product) => (
                <Form.Check 
                  key={product.id}
                  className="mb-3"
                  type="checkbox"
                  id={product.id} 
                  value={product.id}
                  label={product.productName}
                  onChange={handleChange}
                />
            ))}
            <Button type="submit" variant="outline-danger" disabled={deleteList.length === 0}>Delete Checked</Button>
        </Form>
        <Button onClick={() => deleteProducts(products)} variant="danger" className="mt-3">DELETE ALL</Button>
      </Container>
    </>
  )
}
