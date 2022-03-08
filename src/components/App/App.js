import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Game from "../Game/Game";
import Navbar from "../Navbar/Navbar";

const GlobalStyle = createGlobalStyle`
body {
  --primary: yellow;
  --gray-light: #818384;
  --gray-dark: #3a3a3c;
  --background: #121213;
  --green: #6aaa64;
  --yellow: #c9b458;

  margin: 0;
  color: var(--primary);
  background-color: var(--background);
  font-family: 'Cabin', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`;

const LayoutContainer = styled.div`
  width: 100%;
  height: 95vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr min-content;
  gap: 3rem;
  place-items: center;
  place-content: center;
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <LayoutContainer>
        <Navbar />
        <Game />
      </LayoutContainer>
    </div>
  );
}

export default App;
