import { useState } from 'react';
import ProductForm from '../ProductForm/ProductForm'
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas} from 'react-bootstrap';

function NavBar({ addProduct, nameFilter, setNameFilter, setSortDirection }) {
  const [filterTerm, setFilterTerm] = useState("");
  const [showProductForm, setShowProductForm] = useState(false);

  const handleCloseProductForm = () => setShowProductForm(false);
  const handleShowProductForm = () => setShowProductForm(true);

  const filterProducts = e => {
    e.preventDefault();
    setNameFilter(filterTerm);
  }

  return (
      
    <Navbar sticky="top" bg="light" expand="md" className="mb-3">
      <Container fluid>
        <ProductForm submitProduct={addProduct} show={showProductForm} handleClose={handleCloseProductForm} handleShow={handleShowProductForm} />
        <Navbar.Brand href="#">Products Dashboard</Navbar.Brand>
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
              <Button onClick={handleShowProductForm} variant="outline-primary">Add Product</Button>{' '}
              <NavDropdown
                title="Sort"
                id={`offcanvasNavbarDropdown-expand-md`}
              >
                <NavDropdown.Item onClick={() => setSortDirection("ascending")}>
                  Ascending
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => setSortDirection("descending")}>
                  Descending
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex" onSubmit={filterProducts}>
              <Form.Control
                type="text"
                placeholder="Filter by product name"
                className="me-2"
                aria-label="Filter"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                // onChange={(e) => setFilterTerm(e.target.value)}
              />
              <Button variant="outline-success">Filter</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}



export default NavBar;