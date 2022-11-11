import ProductForm from '../ProductForm/ProductForm';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

const HeaderLink = styled(Link)`
  font-size: .8rem;
  color: #0b547d;
  width: 50%;
  text-align: right;
`

function FormModal({ oldProduct=null, submitProduct, show, handleClose }) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{oldProduct ? "Edit" : "Add"} Product</Modal.Title>
          {!oldProduct && <HeaderLink to="/addmore" >Add multiple?</HeaderLink>}
        </Modal.Header>
        <Modal.Body>
        <ProductForm oldProduct={oldProduct} submitProduct={submitProduct} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FormModal
