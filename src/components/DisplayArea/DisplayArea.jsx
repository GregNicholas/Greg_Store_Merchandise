import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

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

const DisplayArea = ({ children, loadingStatus }) => {
  const [isShown, setIsShown] = useState(false);

  // work around for empty list message flashing. look into other fix
  useEffect(() => {
    if(!children.length && loadingStatus.status === ''){
      setTimeout(() => {
        setIsShown(true)
      },800)
    }
  },[children, loadingStatus.status])

  return (
    <Container>
      <CardsDisplay>
        {(loadingStatus.status === '' && children.length) && children }
        {loadingStatus.status === 'loading' && <div>LOADING...</div>}
        {loadingStatus.status === 'error' && <div>Error {loadingStatus.error.message}</div>}
        {(loadingStatus.status === '' && !children.length && isShown) && <EmptyList><p>Nothing to show</p>Use the menu to add some products</EmptyList>}
      </CardsDisplay>
    </Container>
  )
}
export default DisplayArea