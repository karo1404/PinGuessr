import { useEffect, useState } from "react";
import styled from "styled-components";
import { BoardCell, BoardContainer } from "../Board/Board";
import xIcon from "../../assets/x.svg";

export const ModalType = {
  TUTORIAL: "TUTORIAL",
  WIN: "WIN",
  LOSE: "LOSE",
  NONE: "NONE",
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  height: 100vh;
  width: 100%;
  pointer-events: ${(props) => (props.isDisplayed ? "auto" : "none")};
`;

const ModalBackground = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  background-color: black;
  opacity: ${(props) => (props.isDisplayed ? "0.6" : "0")};
  transition: opacity 1s;
  z-index: 100;
`;

const ModalWindow = styled.div`
  width: max-content;
  max-width: 25rem;
  max-height: 90%;
  overflow-y: auto;
  padding: 1rem;
  z-index: 1000;
  color: white;
  opacity: ${(props) => (props.isDisplayed ? "1" : "0")};
  transition: opacity 0.5s;
  background-color: var(--background);
  border-radius: 1rem;
  border: 2px solid var(--gray-dark);
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-rows: min-content 1fr;
  gap: 1rem 0;
  grid-template-areas:
    "title button"
    "content content";
  place-items: center;

  @media only screen and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
    margin-bottom: 10vh;
  }

  @media only screen and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    margin-bottom: 10vh;
  }
`;

const ModalCloseButton = styled.button`
  grid-area: button;
  width: 2rem;
  height: 2rem;
  color: white;
  background-color: var(--green);
  border: none;
  border-radius: 50%;
  margin-left: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalCloseButtonIcon = styled.img`
  width: 65%;
  height: 65%;
`;

const ModalTitle = styled.h3`
  text-transform: uppercase;
`;

const ModalContent = styled.section`
  font-size: 1rem;
  grid-column: 1 / 3;
`;

const modals = {
  [ModalType.TUTORIAL]: {
    title: "How to play",
    content: (
      <>
        <p>
          Guess the pin on PinGuessr! <br />
          <br />
          Type in any 4-number combination and press enter to try to guess the
          pin.
        </p>
        <hr />
        <p>After each attempt, the numbers will be marked accordingly: </p>
        <BoardContainer rows={1} columns={4}>
          <BoardCell compact>2</BoardCell>
          <BoardCell compact>1</BoardCell>
          <BoardCell state={"CORRECT"} compact>
            3
          </BoardCell>
          <BoardCell compact>7</BoardCell>
        </BoardContainer>
        <p>
          If a letter is highlighted in green, it appears in the same place in
          the password
        </p>
        <BoardContainer rows={1} columns={4}>
          <BoardCell compact>2</BoardCell>
          <BoardCell state={"WRONG_POSITION"} compact>
            1
          </BoardCell>
          <BoardCell compact>3</BoardCell>
          <BoardCell compact>7</BoardCell>
        </BoardContainer>
        <p>
          If a letter is highlighted in yellow, it appears in the password but
          in a different place
        </p>
        <BoardContainer rows={1} columns={4}>
          <BoardCell state={"WRONG"} compact>
            2
          </BoardCell>
          <BoardCell compact>1</BoardCell>
          <BoardCell compact>3</BoardCell>
          <BoardCell compact>7</BoardCell>
        </BoardContainer>
        <p>
          If a letter is not highlighted, it does not appear in the password
        </p>
        <hr />
        <p>Have fun!</p>
      </>
    ),
  },
  [ModalType.WIN]: {
    title: "Congratulations",
    content: (
      <>
        <p>You have guessed the combination!</p>
        <hr />
        <p>Close this window to play again</p>
      </>
    ),
  },
  [ModalType.LOSE]: {
    title: "Better luck next time",
    content: (
      <>
        <p>You didn't manage to guess the combination!</p>
        <hr />
        <p>Close this window to play again</p>
      </>
    ),
  },
  [ModalType.NONE]: {
    title: "",
    content: <></>,
  },
};

function Modal({ modalType, closeCallback }) {
  const [isDisplayed, setIsDisplayed] = useState(false);

  useEffect(() => {
    switch (modalType) {
      case ModalType.LOSE:
      case ModalType.WIN:
        setTimeout(() => setIsDisplayed(true), 2000);
        break;
      case ModalType.TUTORIAL:
        setIsDisplayed(true);
        break;
      default:
        setIsDisplayed(false);
    }
  }, [modalType]);

  return (
    <>
      <Wrapper isDisplayed={isDisplayed}>
        <ModalBackground isDisplayed={isDisplayed} />
        {modalType !== ModalType.NONE && (
          <ModalWindow isDisplayed={isDisplayed}>
            <ModalCloseButton onClick={closeCallback}>
              <ModalCloseButtonIcon src={xIcon} alt="✖" />
            </ModalCloseButton>
            <ModalTitle>{modals[modalType]?.title}</ModalTitle>
            <ModalContent>{modals[modalType]?.content}</ModalContent>
          </ModalWindow>
        )}
      </Wrapper>
    </>
  );
}

export default Modal;
