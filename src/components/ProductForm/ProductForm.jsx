import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { nanoid } from 'nanoid'

const IMGURL = "https://picsum.photos/seed/";
const IMGURLTAIL = "/286/180";

// function ProductForm({ handleSubmit, handleInputChange, newProductInfo }) {
  function ProductForm({ oldProduct=null, submitProduct, handleClose }) {
    const [newProductInfo, setNewProductInfo] = useState({
      productName: oldProduct ? oldProduct.productName : "",
      description: oldProduct ? oldProduct.description : "",
    })

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewProductInfo({
        ...newProductInfo,
        [name]: value,
      });
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const randomIndex = nanoid();
      const newProductImg = `${IMGURL}${randomIndex}${IMGURLTAIL}`;
      const currentDate = new Date();
      const newCreationTime = currentDate.getTime();

      const newProduct = {
        id: oldProduct ? oldProduct.id : nanoid(),
        productImg: newProductImg,
        productName: newProductInfo.productName, 
        description: newProductInfo.description,
        creationTime: oldProduct ? oldProduct.creationTime : newCreationTime
      }

      if(!oldProduct){
        submitProduct(newProduct);
        setNewProductInfo({productName: "", description: ""})
      } else{
        submitProduct(newProduct, oldProduct)
      }
      
        handleClose();
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                onChange={handleInputChange}
                value={newProductInfo.productName}
                placeholder="product name"
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Product Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="description"
                onChange={handleInputChange}
                value={newProductInfo.description}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
    )
}

export default ProductForm