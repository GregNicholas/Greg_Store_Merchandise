import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { nanoid } from 'nanoid'

const IMGURL = "https://picsum.photos/id/";
const IMGURLTAIL = "/286/180.jpg";

function ProductForm({ oldProduct=null, submitProduct, show, handleClose}) {
  console.log(oldProduct?.productName, oldProduct?.id)
  // const [newProductInfo, setNewProductInfo] = useState( oldProduct ? 
  //   {
  //   productName: oldProduct.productName,
  //   description: oldProduct.description
  //   } : 
  //   {
  //     productName: "",
  //     description: "",
  //   }
  // )

  const [newProductInfo, setNewProductInfo] = useState({
    productName: oldProduct ? oldProduct.productName : "",
    description: oldProduct ? oldProduct.description : "",
  })

  const handleInputChange = e => {
    const { name, value } = e.target;

    setNewProductInfo({
      ...newProductInfo,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomIndex = Math.floor(Math.random()*1020);
    const newProductImg = `${IMGURL}${randomIndex}${IMGURLTAIL}`;
    const newCreationTime = new Date();

    const newProduct = {
      id: oldProduct ? oldProduct.id : nanoid(),
      productImg: newProductImg,
      productName: newProductInfo.productName, 
      description: newProductInfo.description,
      creationTime: oldProduct ? oldProduct.creationTime : newCreationTime
    }
    console.log(newProduct)
    submitProduct(newProduct);
    !oldProduct && setNewProductInfo({productName: "", description: ""})
    handleClose();
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{oldProduct ? "Edit" : "Add"} Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductForm
