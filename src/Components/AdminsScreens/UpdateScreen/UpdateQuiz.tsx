import React, { useEffect, useState } from "react";
import "../../../CSS/AdminScreens/UpdateQuiz.css";
import MultipleChoice from "./MultipleChoice";
import AdminMenu from "../AdminMenuScreen/AdminMenu";
import axios from "axios";

// component for the opening update
// screen - the comboBox of the questions
const UpdateQuiz = () => {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [updateError, setUpdateError] = useState(false);
  const [updateErrorMessage, setUpdateErrorMessage] = useState("");
  const [multiplyChoice, setMultiplyChoice] = useState(false);
  const [back, setBack] = useState(false);
  const [questionOptions, setQuestionOptions] = useState([]);

  useEffect(() => {
    setBack(false);
    fetchQuestions();
  }, []);

  function fetchQuestions() {
    axios
      .get("http://localhost:8000/quizs/getQuestions")
      .then((response) => {
        setQuestionOptions(
          response.data.map((question: any) => question.question)
        );
      })
      .catch((error) => console.error(error));
  }

  function isNotEmpty() {
    if (selectedQuestion === "") {
      setUpdateError(true);
      setUpdateErrorMessage("Please select a question");
      return false;
    }
    return true;
  }

  const searchAndUpdate = (event: any) => {
    event.preventDefault();
    const notEmpty = isNotEmpty();
    if (notEmpty) {
      setUpdateError(false);
      axios
        .get(`http://localhost:8000/quizs/isFound?question=${selectedQuestion}`)
        .then((response) => {
          const data = response.data;
          if (data !== true) {
            setUpdateError(true);
            setUpdateErrorMessage("There is no such quiz!");
          } else {
            setUpdateError(false);
            setMultiplyChoice(true);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <span className="update-div">
      {!back && !multiplyChoice && (
        <div className="update-screen">
          <form className="form-of-update" onSubmit={searchAndUpdate}>
            <div className="question-title-div">
              <label htmlFor="question" className="question-title">
                Question
              </label>
            </div>
            <select
              id="question"
              className="update-combobox"
              value={selectedQuestion}
              onChange={(event) => setSelectedQuestion(event.target.value)}
            >
              <option value="">Select a question</option>
              {questionOptions.map((question) => (
                <option key={question} value={question}>
                  {question}
                </option>
              ))}
            </select>
            <div className="button-group">
              <button type="submit" className="update-button">
                Update
              </button>
            </div>
            {updateError && <div className="error">{updateErrorMessage}</div>}
          </form>
        </div>
      )}
      {!back && multiplyChoice && <MultipleChoice from={selectedQuestion} />}
      {back && <AdminMenu />}
    </span>
  );
};

export default UpdateQuiz;
