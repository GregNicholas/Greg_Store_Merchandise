import { Card, Button } from 'react-bootstrap'

const ProductCard = ({ productInfo }) => {

  const editProduct = () => {
    console.log(productInfo.productName)
  }

  const deleteProduct = () => {
    console.log("Delete ", productInfo.productName)
  }

  return (
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={productInfo.productImg} />
        <Card.Body>
            <Card.Title>{productInfo.productName}</Card.Title>
            <Card.Text>{productInfo.description}</Card.Text>
            <Card.Text>{productInfo.creationTime.toLocaleDateString()}</Card.Text>
            <Button onClick={editProduct} variant="primary">Edit</Button>
            <Button onClick={deleteProduct} variant="danger">Delete</Button>
        </Card.Body>
    </Card>
  )
}
export default ProductCard