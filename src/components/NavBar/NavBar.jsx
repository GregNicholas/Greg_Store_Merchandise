import { useState, useContext } from 'react';
import FormModal from '../FormModal/FormModal';
import { Context } from '../../contexts/Context';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas} from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs'
import styled from 'styled-components';

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

const DelButton = styled(Button)`
  margin-right: 1rem;
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

const NavDropdownStyled = styled(NavDropdown)`
  margin-left: 1rem;
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`

function NavBar({ nameFilter, setNameFilter, setSortDirection }) {
  const [showProductForm, setShowProductForm] = useState(false);

  const { addProduct } = useContext(Context);

  const navigate = useNavigate();

  const goToDeleteMore = () => {
    navigate('/deleteMore')
  }

  const handleCloseProductForm = () => setShowProductForm(false);
  const handleShowProductForm = () => setShowProductForm(true);

  return (
      
    <Navbar sticky="top" bg="light" expand="md">
      <Container fluid>
        <FormModal submitProduct={addProduct} show={showProductForm} handleClose={handleCloseProductForm} handleShow={handleShowProductForm} />
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
              <DelButton onClick={goToDeleteMore} variant="outline-danger"><BsTrash /></DelButton>
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
