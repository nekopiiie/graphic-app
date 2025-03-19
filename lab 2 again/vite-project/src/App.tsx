import React, { useState } from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; 
  width: 100vw; 
  font-family: Verdana, sans-serif;
  background-color: #f7f7f7; 
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px; 
`;

const RestartButton = styled.button`
  background-color:rgb(104, 169, 160);
  color: white;
  padding: 10px 20px;
  border: 2px solid;
  border-radius: 10px;
  border-color:rgb(69, 87, 160);
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color:rgb(69, 87, 160);
  }
`;

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 5px;
  background-color:rgb(69, 87, 160); 
  padding: 10px; 
  border-radius: 10px; 
  box-shadow: 0 4px 8px rgba(31, 73, 112, 0.1); 
`;

const Cell = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0f7fa; 
  border: 2px solid #ccc;
  font-size: 24px;
  cursor: pointer;
  border-radius: 8px; 

  &:hover {
    background-color:rgb(197, 234, 238); 
  }
`;

const Status = styled.h2`
  margin: 20px 0; 
  color: #333;
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
  const isDraw = !winner && squares.every((square) => square !== null); // проверка на ничью
  let status;
  if (winner) {
    status = `победитель: ${winner}`;
  } else if (isDraw) {
    status = 'ничья :3';
  } else {
    status = `следующий игрок: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <GameContainer>
      <Title>крестики-нолики</Title>
      <BoardContainer>
        {squares.map((value, index) => (
          <Cell key={index} onClick={() => handleClick(index)}>
            {value}
          </Cell>
        ))}
      </BoardContainer>
      <Status>{status}</Status>
      <RestartButton onClick={restartGame}>начать заново</RestartButton>
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