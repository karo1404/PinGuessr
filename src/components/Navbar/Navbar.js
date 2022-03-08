import styled from "styled-components";

const Title = styled.div`
  text-align: center;
  padding: 1rem;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 0px 0px 5px var(--primary);
`;

function Navbar() {
  return <Title>PinGuessr</Title>;
}

export default Navbar;
