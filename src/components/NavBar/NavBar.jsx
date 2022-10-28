import { useState } from 'react';
import ProductForm from '../ProductForm/ProductForm';
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas} from 'react-bootstrap';
import styled from 'styled-components';

function NavBar({ addProduct, nameFilter, setNameFilter, setSortDirection }) {
  const [showProductForm, setShowProductForm] = useState(false);

  const handleCloseProductForm = () => setShowProductForm(false);
  const handleShowProductForm = () => setShowProductForm(true);

  return (
      
    <Navbar sticky="top" bg="light" expand="md">
      <Container fluid>
        <ProductForm submitProduct={addProduct} show={showProductForm} handleClose={handleCloseProductForm} handleShow={handleShowProductForm} />
        <NavHeading className="nav-heading">Products Dashboard</NavHeading>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-md`}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
              Options
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <AddButton onClick={handleShowProductForm} variant="outline-primary">Add Product</AddButton>{' '}
              <NavDropdownStyled
                title="Date Sort"
                id={`offcanvasNavbarDropdown-expand-md`}
              >
                <NavDropdown.Item onClick={() => setSortDirection("ascending")}>
                  Ascending
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => setSortDirection("descending")}>
                  Descending
                </NavDropdown.Item>
              </NavDropdownStyled>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="text"
                placeholder="Filter by product name"
                className="me-2"
                aria-label="Filter"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
              <ClearButton onClick={() => setNameFilter('')} variant="outline-success">Clear</ClearButton>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavBar;


const NavHeading = styled(Navbar.Brand)`
  font-weight: bold;
  color: #0b547d;
  &:hover {
    color: #0b547d;
  }
`

const AddButton = styled(Button)`
  color: #0b547d;
  border: 1px solid #0b547d;
  &:hover {
    background: #0b547d;
    border: 1px solid #0b547d;
    color: #f8f8ff;
  }
`;

const ClearButton = styled(Button)`
  color: #f68874;
  border: 1px solid #f68874;
  &:hover {
    background: #f68874;
    border: 1px solid #f68874;
    color: #f8f8ff;
  }
`;

const NavDropdownStyled = styled(NavDropdown)`
  margin-left: 1rem;
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`