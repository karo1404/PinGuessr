import { useEffect, useState } from "react";
import Board from "../Board/Board";
import Keyboard from "../Keyboard/Keyboard";

export const NUMBER_OF_TRIES = 5;
export const PIN_LENGTH = 4;
export const BoardElementState = {
  EMPTY: "EMPTY",
  FILLED: "FILLED",
  WRONG_POSITION: "WRONG_POSITION",
  CORRECT: "CORRECT",
  WRONG: "WRONG",
};
export const GameState = {
  IN_PROGRESS: "IN_PROGRESS",
  WON: "WON",
  LOST: "LOST",
};

function Game() {
  const [board, setBoard] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [cursorPosition, setCursorPosition] = useState({ row: 0, col: 0 });
  const [solution, setSolution] = useState([]);
  const [gameState, setGameState] = useState(GameState.IN_PROGRESS);

  useEffect(() => {
    const initialBoard = [];
    for (let row = 0; row < NUMBER_OF_TRIES; row++) {
      const rowElements = [];
      for (let col = 0; col < PIN_LENGTH; col++) {
        rowElements[col] = {
          content: "",
          state: BoardElementState.EMPTY,
        };
      }
      initialBoard[row] = rowElements;
    }

    const initialInputs = [];
    for (let number = 0; number < 10; number++) {
      initialInputs[number] = { number, possible: true };
    }

    const newSolution = new Array(PIN_LENGTH);
    for (let position = 0; position < PIN_LENGTH; position++) {
      newSolution[position] = Math.floor(Math.random() * 10);
    }

    setBoard(initialBoard);
    setInputs(initialInputs);
    setSolution(newSolution);
  }, []);

  const handleInput = (key) => {
    if (gameState !== GameState.IN_PROGRESS) return;
    switch (key) {
      case "ENTER":
        checkSolution();
        break;
      case "CLEAR":
        removeNumber();
        break;
      default:
        insertNumber(Number.parseInt(key));
    }
  };

  function insertNumber(number = 0) {
    if (cursorPosition.col >= PIN_LENGTH) return;
    if (cursorPosition.row >= NUMBER_OF_TRIES) return;

    const newBoard = board;
    newBoard[cursorPosition.row][cursorPosition.col].content =
      number.toString();
    newBoard[cursorPosition.row][cursorPosition.col].state =
      BoardElementState.FILLED;
    setBoard(
      newBoard,
      setCursorPosition((prev) => ({ row: prev.row, col: prev.col + 1 }))
    );
  }

  function removeNumber() {
    if (cursorPosition.col === 0) return;

    const newBoard = board;
    newBoard[cursorPosition.row][cursorPosition.col - 1].content = "";
    newBoard[cursorPosition.row][cursorPosition.col - 1].state =
      BoardElementState.EMPTY;
    setBoard(
      newBoard,
      setCursorPosition((prev) => ({ row: prev.row, col: prev.col - 1 }))
    );
  }

  function checkSolution() {
    if (cursorPosition.row >= NUMBER_OF_TRIES) return;
    if (cursorPosition.col < PIN_LENGTH) return;

    const newBoard = board;
    const userSolution = [];
    const possibleElements = [];
    let correct = true;

    // Extract solution and check for correct/wrong
    for (let current = 0; current < PIN_LENGTH; current++) {
      userSolution[current] = newBoard[cursorPosition.row][current].content;

      if (userSolution[current].toString() === solution[current].toString()) {
        newBoard[cursorPosition.row][current].state = BoardElementState.CORRECT;
        possibleElements.push(userSolution[current]);
      } else {
        newBoard[cursorPosition.row][current].state = BoardElementState.WRONG;
        correct = false;
      }
    }

    // Check for wrong positions afterwards
    for (let current = 0; current < PIN_LENGTH; current++) {
      const isNotCorrect =
        newBoard[cursorPosition.row][current].state !==
        BoardElementState.CORRECT;
      if (
        isNotCorrect &&
        solution.some(
          (number, index) =>
            number.toString() === userSolution[current].toString() &&
            newBoard[cursorPosition.row][index].state !==
              BoardElementState.CORRECT
        )
      ) {
        newBoard[cursorPosition.row][current].state =
          BoardElementState.WRONG_POSITION;
        possibleElements.push(userSolution[current]);
        correct = false;
      }
    }

    setBoard(newBoard);
    disableImpossibleInputs(
      userSolution.filter(
        (number) =>
          !possibleElements.some(
            (possibleNumber) => number.toString() === possibleNumber.toString()
          )
      )
    );

    if (correct) {
      setGameState(GameState.WON);
    } else if (cursorPosition.row + 1 >= NUMBER_OF_TRIES) {
      setGameState(GameState.LOST);
    }
    setCursorPosition((prev) => ({ row: prev.row + 1, col: 0 }));
  }

  function disableImpossibleInputs(numbers) {
    if (numbers?.length === 0) return;
    const newInputs = inputs;
    numbers.forEach((number) => {
      newInputs.find(
        (input) => input.number.toString() === number.toString()
      ).possible = false;
    });
    setInputs(newInputs);
  }

  return (
    <>
      <Board boardState={board} />
      <Keyboard inputs={inputs} clickCallback={handleInput} />
    </>
  );
}

export default Game;
