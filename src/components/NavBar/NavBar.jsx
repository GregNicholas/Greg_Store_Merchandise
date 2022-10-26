import { useState } from 'react';
import AddProductForm from '../AddProductForm/AddProductForm'
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas} from 'react-bootstrap';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Offcanvas from 'react-bootstrap/Offcanvas';

function NavBar({addProduct}) {
  const [filterTerm, setFilterTerm] = useState("");
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  const handleCloseAddProductForm = () => setShowAddProductForm(false);
  const handleShowAddProductForm = () => setShowAddProductForm(true);

  const openProductForm = () => {
    handleShowAddProductForm()
  }

  const filterProducts = e => {
    console.log("Filter by ", filterTerm);
  }

  return (
      
    <Navbar sticky="top" bg="light" expand="md" className="mb-3">
      <Container fluid>
        <AddProductForm addProduct={addProduct} show={showAddProductForm} handleClose={handleCloseAddProductForm} handleShow={handleShowAddProductForm} />
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
              <Button onClick={openProductForm} variant="outline-primary">Add Product</Button>{' '}
              <NavDropdown
                title="Sort"
                id={`offcanvasNavbarDropdown-expand-md`}
              >
                <NavDropdown.Item onClick={() => console.log("sort descending")}>Ascending</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => console.log("sort descending")}>
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
                value={filterTerm}
                onChange={(e) => setFilterTerm(e.target.value)}
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