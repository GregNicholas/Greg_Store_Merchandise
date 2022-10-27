import { useState } from 'react';
import ProductForm from '../ProductForm/ProductForm';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product, editProduct, deleteProduct }) => {
  const [showProductForm, setShowProductForm] = useState(false);

  const handleCloseProductForm = () => setShowProductForm(false);
  const handleShowProductForm = () => setShowProductForm(true);

  return (
    <Card style={{ width: '18rem' }}>
        <ProductForm oldProduct={product} submitProduct={editProduct} show={showProductForm} handleClose={handleCloseProductForm} handleShow={handleShowProductForm} />
        <Card.Img variant="top" src={product.productImg} />
        <Card.Body>
            <Card.Title>{product.productName}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>{product.creationTime.toLocaleDateString()}</Card.Text>
            <Button onClick={handleShowProductForm} variant="primary">Edit</Button>
            <Button onClick={() => deleteProduct(product.id)} variant="danger">Delete</Button>
        </Card.Body>
    </Card>
  )
}
export default ProductCard