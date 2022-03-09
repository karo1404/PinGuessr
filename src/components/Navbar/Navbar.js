import styled from "styled-components";

const Title = styled.div`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-shadow: 0px 0px 5px white;
`;

function Navbar() {
  return <Title>PinGuessr</Title>;
}

export default Navbar;
