import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../CSS/GamesProps/QuizGame.css";

// Define the type for QuizQuestion
interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

// Define a functional component called 'QuizGame'
const QuizGame: React.FC = () => {
  // Declare state variables
  const [quizList, setQuizList] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [queLen, setQueLen] = useState<number>(-1);

  // Fetch quiz questions from the server using axios and update state variables
  useEffect(() => {
    axios
      .get("http://localhost:8000/quizs/getQuestions")
      .then((response) => {
        setQuizList(response.data);
        setQueLen(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching quiz questions:", error);
      });
  }, []);

  // Event handler for selecting an option
  const handleOptionSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  // Event handler for moving to the next question
  const handleNextQuestion = () => {
    const currentQuestion = quizList[currentQuestionIndex];
    const isCorrect =
      currentQuestion.options[currentQuestion.correct - 1] === selectedOption;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex === quizList.length - 1) {
      setShowResult(true);
    } else {
      setSelectedOption(null);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Event handler for restarting the quiz
  const handleRestartQuiz = () => {
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setCurrentQuestionIndex(0);
  };

  // Render the result screen if showResult is true
  if (showResult) {
    return (
      <div className="quiz-game-container">
        <h1 className="quiz-game-title">Quiz Result</h1>
        <p className="quiz-game-result">Your score: {score}</p>
        <p className="quiz-game-result">
          Success: {Math.floor((score / queLen) * 100)}%
        </p>
        <button
          className="quiz-game-restart-button"
          onClick={handleRestartQuiz}
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  // Render a loading message if quizList is empty
  if (quizList.length === 0) {
    return (
      <p className="quiz-game-loading-message">Loading quiz questions...</p>
    );
  }

  // Get the current question from quizList
  const currentQuestion = quizList[currentQuestionIndex];

  // Render the quiz game screen
  return (
    <div className="quiz-game-container">
      <h1 className="quiz-game-title">Quiz Game</h1>
      <h2 className="quiz-game-question">
        Question {currentQuestionIndex + 1}
      </h2>
      <p>{currentQuestion.question}</p>
      <ul className="quiz-game-options">
        {currentQuestion.options.map((option: string, index: number) => (
          <li className="quiz-game-option" key={index}>
            <label>
              <input
                type="radio"
                name="quiz-option"
                value={option}
                checked={selectedOption === option}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleOptionSelect(event)
                }
              />

              {option}
            </label>
          </li>
        ))}
      </ul>
      <button
        className="quiz-game-next-button"
        onClick={handleNextQuestion}
        disabled={!selectedOption}
      >
        Next
      </button>
    </div>
  );
};

export default QuizGame;
