import styled from "styled-components";
import { keyframes } from "styled-components";
import { css } from "styled-components";
import { NUMBER_OF_TRIES, PIN_LENGTH } from "../../assets/const";
import { BoardElementState } from "../Game/Game";

const popAnimation = keyframes`
  50%  {transform: scale(1.3);}
`;

const rotateAnimation = keyframes`
50% {transform: rotateX( 90deg );}`;

export const BoardContainer = styled.div`
  display: grid;
  height: min-content;
  width: min-content;
  margin: auto;
  gap: 8px;
  grid-template-rows: ${(props) =>
    props.rows ? `repeat(${props.rows}, 1fr)` : "repeat(5, 1fr)"};
  grid-template-columns: ${(props) =>
    props.columns ? `repeat(${props.columns}, 1fr)` : "repeat(4, 1fr)"};
  place-items: center;
  place-content: center;
`;

export const BoardCell = styled.div`
  width: min(
    calc(57vh / ${NUMBER_OF_TRIES || 5} - 16px),
    calc(100vw / ${PIN_LENGTH} - 16px)
  );
  height: min(
    calc(57vh / ${NUMBER_OF_TRIES} - 16px),
    calc(100vw / ${PIN_LENGTH} - 16px)
  );

  box-shadow: inset 0px 0px 0px 2px var(--gray-dark);
  font-size: min(
    calc(52vh / ${NUMBER_OF_TRIES} - 16px),
    calc(95vw / ${PIN_LENGTH} - 16px)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: var(--background);
  z-index: -100;

  ${(props) =>
    (props.state === BoardElementState.FILLED &&
      css`
        animation: ${popAnimation} 0.15s linear 1;
      `) ||
    (props.state === BoardElementState.WRONG_POSITION &&
      css`
        background-color: var(--yellow);
        box-shadow: inset 0px 0px 0px 2px rgba(0, 0, 0, 0);
        animation: ${rotateAnimation} 0.5s linear 1;
        transition: background-color 0s linear 0.25s, box-shadow 0s linear 0.25s;
      `) ||
    (props.state === BoardElementState.CORRECT &&
      css`
        background-color: var(--green);
        box-shadow: inset 0px 0px 0px 2px rgba(0, 0, 0, 0);
        animation: ${rotateAnimation} 0.5s linear 1;
        transition: background-color 0s linear 0.25s, box-shadow 0s linear 0.25s;
      `) ||
    (props.state === BoardElementState.WRONG &&
      css`
        background-color: var(--gray-dark);
        box-shadow: inset 0px 0px 0px 2px rgba(0, 0, 0, 0);
        animation: ${rotateAnimation} 0.5s linear 1;
        transition: background-color 0s linear 0.25s, box-shadow 0s linear 0.25s;
      `)};
`;

function Board({ boardState }) {
  return (
    <BoardContainer rows={NUMBER_OF_TRIES} columns={PIN_LENGTH}>
      {boardState.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <BoardCell key={`${rowIndex}-${cellIndex}`} state={cell.state}>
            {cell.content}
          </BoardCell>
        ))
      )}
    </BoardContainer>
  );
}

export default Board;
