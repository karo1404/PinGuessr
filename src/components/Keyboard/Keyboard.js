import styled from "styled-components";
import back from "../../assets/back.svg";
import { NUMBER_OF_TRIES, PIN_LENGTH } from "../../assets/const";
import useEventListener from "../../hooks/useEventListener";

const KeyboardContainer = styled.div`
  width: 100%;
  height: min-content;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  place-items: center;
  place-content: center;
  padding-bottom: 1rem;
`;

const KeyboardRow = styled.div`
  display: flex;
  flex: 1 1;
  gap: 0.5rem;
  width: calc(
    min(
        calc(57vh / ${NUMBER_OF_TRIES} + 1rem),
        calc(100vw / ${PIN_LENGTH} + 1rem)
      ) * ${PIN_LENGTH}
  );
  min-width: calc(10 * (18px + 0.5rem));
  max-width: 95%;
  justify-content: stretch;
  align-content: stretch;

  @media only screen and (max-width: 768px) {
    min-width: 0px;
    width: 90%;
  }

  @media only screen and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
    min-width: 0px;
    width: 90%;
  }

  @media only screen and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    min-width: 0px;
    width: 90%;
  }
`;

const Key = styled.button`
  width: 100%;
  height: calc(2rem + 2vh);
  font-size: 1rem;
  background-color: ${(props) =>
    props.possible ? "var(--gray-light)" : "var(--gray-dark)"};
  color: white;
  font-family: "Cabin", sans-serif;
  font-weight: bold;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
`;

function Keyboard({ inputs, clickCallback }) {
  const handlePhysicalKeyPress = (e) => {
    e.preventDefault();
    const key = e.key;
    const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    switch (key) {
      case "Enter":
        clickCallback("ENTER");
        break;
      case "Backspace":
        clickCallback("CLEAR");
        break;
      default:
        if (NUMBERS.includes(key.toString())) {
          clickCallback(key);
        }
    }
  };

  useEventListener("keydown", handlePhysicalKeyPress);

  return (
    <KeyboardContainer>
      <KeyboardRow>
        {inputs.map((input) => (
          <Key
            key={input.number}
            possible={input.possible}
            onClick={() => clickCallback(input.number)}
          >
            {input.number}
          </Key>
        ))}
      </KeyboardRow>
      <KeyboardRow>
        <Key onClick={() => clickCallback("ENTER")} possible>
          ENTER
        </Key>
        <Key onClick={() => clickCallback("CLEAR")} possible>
          <img src={back} alt="CLEAR" />
        </Key>
      </KeyboardRow>
    </KeyboardContainer>
  );
}

export default Keyboard;
