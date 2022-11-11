import { useState, useContext } from 'react';
import FormModal from '../FormModal/FormModal';
import { Context } from "../../contexts/Context";
import { Card, Button } from 'react-bootstrap';
import styled from 'styled-components';

const CardBody = styled(Card.Body)`
  margin-bottom: 4rem;
  min-height:180px;
  max-height: 250px;
  overflow: scroll;
`;

const CardImg = styled(Card.Img)`
  min-height: 180px;
  background: lightgray;
`;

const CardTitle = styled(Card.Title)`
  font-weight: 700;
  color: #0b547d;
`;

const CardFooter = styled(Card.Footer)`
  background: #FFFFFF;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  left: 1rem;
  padding: 8px 0 0 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EditButton = styled(Button)`
  color: #0b547d;
  border: 1px solid #0b547d;
  &:hover {
    background: #0b547d;
    border: 1px solid #0b547d;
    color: #f8f8ff;
  }
`;

const DeleteButton = styled(Button)`
  color: #f68874;
  border: 1px solid #f68874;
  &:hover {
    background: #f68874;
    border: 1px solid #f68874;
    color: #f8f8ff;
  }
`;

const CreationDate = styled(Card.Text)`
  font-style: italic;
  font-size: .8rem;
  color: lightslategray;
  margin-bottom: 5px;
  text-align: right;
`;

const ProductCard = ({ product }) => {
  const [showProductForm, setShowProductForm] = useState(false);
  const { editProduct, deleteProduct } = useContext(Context);

  const creationTime = new Date(product.creationTime)

  const handleCloseProductForm = () => setShowProductForm(false);
  const handleShowProductForm = () => setShowProductForm(true);

  return (
    <Card style={{ width: '18rem' }}>
        <FormModal oldProduct={product} submitProduct={editProduct} show={showProductForm} handleClose={handleCloseProductForm} handleShow={handleShowProductForm} />
        <CardImg variant="top" src={product.productImg} />
        <CardBody>
            <CardTitle>{product.productName}</CardTitle>
            <Card.Text>{product.description}</Card.Text>
            <CardFooter>
              <CreationDate>Added {creationTime.toLocaleTimeString()}, {creationTime.toLocaleDateString()}</CreationDate>
              <ButtonContainer>
                <EditButton onClick={handleShowProductForm} variant="outline-primary">Edit</EditButton>
                <DeleteButton onClick={() => deleteProduct(product)} align="end" variant="outline-danger">Delete</DeleteButton>
              </ButtonContainer>
            </CardFooter>
        </CardBody>
    </Card>
  )
}
export default ProductCard