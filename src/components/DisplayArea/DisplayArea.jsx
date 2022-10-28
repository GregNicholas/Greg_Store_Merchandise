import styled, { keyframes } from "styled-components";

const DisplayArea = ({ children }) => {
  return (
    <Container>
      <CardsDisplay>
        {children.length ? children : <EmptyList><p>Nothing to show</p>Use the menu to add some products</EmptyList>}
      </CardsDisplay>
    </Container>
  )
}
export default DisplayArea


const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const CardsDisplay = styled.section`
  margin: 1rem auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  }
`;

const pulse = keyframes`
  0%{
    font-size: 1rem;
  }
  50% {
    font-size: 1.5rem;
  }
  100% {
    font-size: 1rem;
  }
`;

const EmptyList = styled.div`
  text-align:center;
  margin-top: 5rem;
  animation: ${pulse} .5s;
`;