import { Container, Row, Col } from 'react-bootstrap'
const DisplayArea = ({ children }) => {
  return (
    <Container style={{ maxWidth: "1200px" }}>
    <h1>Products</h1>
      {children}
    </Container>
  )
}
export default DisplayArea