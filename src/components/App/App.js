import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Game from "../Game/Game";
import Modal from "../Modal/Modal";
import Navbar from "../Navbar/Navbar";
import { ModalType } from "../Modal/Modal";
import { useState } from "react";

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
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr min-content;
  gap: 3rem;
  place-items: center;
  place-content: center;
`;

function App() {
  const [modal, setModal] = useState(ModalType.TUTORIAL);
  const [resetBoard, setResetBoard] = useState(false);

  const setModalType = (type) => {
    setModal(type);
  };

  const handleCloseModal = () => {
    setModal(ModalType.NONE);
    setResetBoard((prev) => !prev);
  };

  return (
    <>
      <GlobalStyle />
      <Modal modalType={modal} closeCallback={handleCloseModal} />
      <LayoutContainer>
        <Navbar />
        <Game displayModalCallback={setModalType} newGame={resetBoard} />
      </LayoutContainer>
    </>
  );
}

export default App;
