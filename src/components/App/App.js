import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Game from "../Game/Game";
import Modal from "../Modal/Modal";
import Navbar from "../Navbar/Navbar";
import { ModalType } from "../Modal/Modal";
import { useEffect, useState } from "react";

const GlobalStyle = createGlobalStyle`
body {
  --primary: yellow;
  --gray-light: #818384;
  --gray-dark: #3a3a3c;
  --background: #121213;
  --green: #6aaa64;
  --yellow: #c9b458;

  display: flex; 
  flex-direction: column;
  margin: 0;
  min-height: 100vh;
  touch-action: none;
  color: var(--primary);
  background-color: var(--background);
  font-family: 'Cabin', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media only screen and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
    min-height: calc()(100vh + 1px);
  }

  @media only screen and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    min-height: calc()(100vh + 1px);
  }
}

html { 
  position: relative;
    overflow: hidden;
    height: 100vh; 
    }
`;

const LayoutContainer = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: -webkit-fill-available;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 10vh 57vh 27vh;
  gap: 3vh;
  place-content: center;
  place-items: center;
  grid-template-areas:
    "title"
    "board"
    "keyboard";
`;

function App() {
  const [modal, setModal] = useState(ModalType.TUTORIAL);
  const [resetBoard, setResetBoard] = useState(false);
  useEffect(() => {
    /*iPhone fix*/
    if (!window.location.hash && window.addEventListener) {
      function scrollToNothing() {
        setTimeout(function () {
          window.scrollTo(0, 0);
        }, 0);
      }

      window.addEventListener("load", scrollToNothing);
      window.addEventListener("orientationchange", scrollToNothing);
      window.addEventListener("touchstart", scrollToNothing);
      return () => {
        window.removeEventListener("load", scrollToNothing);
        window.removeEventListener("orientationchange", scrollToNothing);
        window.removeEventListener("touchstart", scrollToNothing);
      };
    }
  }, []);

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
