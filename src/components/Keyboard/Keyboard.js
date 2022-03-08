import styled from "styled-components";
import back from "../../assets/back.svg";

const KeyboardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

const KeyboardRow = styled.div`
  display: flex;
  flex: 1 1;
  gap: 0.5rem;
  width: 25%;
  min-width: 20rem;
  justify-content: stretch;
  align-content: stretch;
`;

const Key = styled.button`
  width: 100%;
  height: 3rem;
  font-size: 1rem;
  background-color: ${(props) =>
    props.possible ? "var(--gray-light)" : "var(--gray-dark)"};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

function Keyboard({ inputs, clickCallback }) {
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