import { useState, useEffect } from "react";
import "../../../CSS/AdminScreens/RemoveQuiz.css";
import axios from "axios";
import SpecificQuestion from "./SpecificQuestion";

/**
 * Component representing the screen for removing quizzes in the admin section of the gaming application.
 * @returns {JSX.Element} - JSX element representing the RemoveQuiz component.
 */
const RemoveQuiz = (): JSX.Element => {
  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    /**
     * Fetches the quiz data from the API and updates the quizList state.
     */
    axios
      .get("http://localhost:8000/quizs/getQuestions")
      .then((response: any) => {
        setQuizList(response.data);
      })
      .catch((error) => console.error(error));
  }, [quizList]);

  return (
    <>
      <div className="remove-quiz-screen">
        <div className="titleDiv">
          <h1 className="remove-screen-title">Remove Quiz</h1>
        </div>
        <ul className="quiz-list">
          {quizList.map((quiz: any) => (
            <SpecificQuestion quiz={quiz} setQuizList={setQuizList} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default RemoveQuiz;
