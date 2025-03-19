import React, { useState } from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  color: #333;
`;

const RestartButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 5px;
  margin: 20px auto;
`;

const Cell = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border: 2px solid #ccc;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index: number) => {
    if (squares[index] || calculateWinner(squares)) return;
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(squares);
  const isDraw = squares.every((square) => square !== null);
  let status;
  if (winner) {
    status = `Победитель: ${winner}`;
  } else if (isDraw) {
    status = 'Ничья!';
  } else {
    status = `Следующий игрок: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <GameContainer>
      <Title>Крестики-нолики</Title>
      <BoardContainer>
        {squares.map((value, index) => (
          <Cell key={index} onClick={() => handleClick(index)}>
            {value}
          </Cell>
        ))}
      </BoardContainer>
      <h2>{status}</h2>
      <RestartButton onClick={restartGame}>Начать заново</RestartButton>
    </GameContainer>
  );
}

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6], // Diagonals
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;