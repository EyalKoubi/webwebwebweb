import React, { useEffect, useState } from "react";
import "../../CSS/GamesProps/RockPaperScissors.css";

// Define a functional component called 'RockPaperScissors'
const RockPaperScissors = () => {
  // Declare state variables
  const [playerChoice, setPlayerChoice] = useState<string>("");
  const [computerChoice, setComputerChoice] = useState<string>("");
  const [playerDraw, setPlayerDraw] = useState<string>("");
  const [computerDraw, setComputerDraw] = useState<string>("");
  const [result, setResult] = useState<string>("");

  // Generate player and computer drawings based on playerChoice and computerChoice
  useEffect(() => {
    switch (playerChoice) {
      case "rock":
        setPlayerDraw("✊");
        break;
      case "paper":
        setPlayerDraw("✋");
        break;
      case "scissors":
        setPlayerDraw("✌️");
        break;
      default:
        break;
    }
    switch (computerChoice) {
      case "rock":
        setComputerDraw("✊");
        break;
      case "paper":
        setComputerDraw("✋");
        break;
      case "scissors":
        setComputerDraw("✌️");
        break;
      default:
        break;
    }
  }, [playerChoice, computerChoice]);

  // Event handler for player choice
  const handlePlayerChoice = (choice: string) => {
    generateComputerChoice(choice);
  };

  // Generate computer choice randomly and determine the result
  const generateComputerChoice = (choice: string) => {
    const choices = ["rock", "paper", "scissors"];
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
    determineResult(randomChoice, choice);
  };

  // Determine the result based on the player and computer choices
  const determineResult = (computerChoice: string, playerChoice: string) => {
    setPlayerChoice(playerChoice);
    if (playerChoice === computerChoice) {
      setResult("tie");
    } else if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      setResult("win");
    } else {
      setResult("loss");
    }
  };

  // Render the Rock Paper Scissors game screen
  return (
    <div className="rps-container">
      <h2 className="rps-title">Rock Paper Scissors</h2>
      <div className="rps-choices">
        <div className="rps-choice" onClick={() => handlePlayerChoice("rock")}>
          <span role="img" aria-label="rock">
            ✊
          </span>
        </div>
        <div className="rps-choice" onClick={() => handlePlayerChoice("paper")}>
          <span role="img" aria-label="paper">
            ✋
          </span>
        </div>
        <div
          className="rps-choice"
          onClick={() => handlePlayerChoice("scissors")}
        >
          <span role="img" aria-label="scissors">
            ✌️
          </span>
        </div>
      </div>
      {result && (
        <div className={`rps-result ${result}`}>
          <span className="choice-label">You: {playerDraw}</span>
          <span className="choice-label">Computer: {computerDraw}</span>
          <span>{result}</span>
          <div className="emojis">
            {result === "win" && <span>🎉</span>}
            {result === "loss" && <span>😢</span>}
            {result === "tie" && <span>🤝</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default RockPaperScissors;
