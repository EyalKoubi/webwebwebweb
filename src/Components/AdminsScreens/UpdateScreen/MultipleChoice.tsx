import { useEffect, useState } from "react";
import "../../../CSS/AdminScreens/MultipleChoice.css";
import UpdateQuiz from "./UpdateQuiz";
import axios from "axios";
import UpdateQuestion from "./UpdateQuestion";
import UpdateOption from "./UpdateOption";
import UpdateCorrectAnswer from "./UpdateCorrectAnswer";
import PresentUpdated from "./PresnetUpdated";

const MultipleChoice = ({ from }: any): JSX.Element => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [ID, setID] = useState("");
  const [oldQuestion, setOldQuestion] = useState("");
  const [oldOptions, setOldOptions] = useState(["", "", "", ""]);
  const [oldCorrectAnswer, setOldCorrectAnswer] = useState("");
  const disabled = false;
  const [firstAppear, setFirstAppear] = useState(true);
  const [back, setBack] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/quizs/getSingleQuestion?question=${from}`)
      .then((response) => response.data)
      .then((data) => {
        if (firstAppear) {
          setOldQuestion(data.question);
          setOldOptions(data.options);
          setOptions(data.options); // Update the options state with fetched values
          setOldCorrectAnswer(`Option ${data.correct}`);
          setID(data._id);
          setFirstAppear(false);
        }
      })
      .catch((error) => console.error(error));
  });

  /**
   * Checks for conflicts between the old options.
   * @returns {boolean} - Indicates if there are conflicts between the old options.
   */
  const haveConflict = (): boolean => {
    const [opt1, opt2, opt3, opt4] = oldOptions;

    if (opt1 === opt2) {
      setErrorMessage("Option 1 and Option 2 are the same.");
      return true;
    }
    if (opt1 === opt3) {
      setErrorMessage("Option 1 and Option 3 are the same.");
      return true;
    }
    if (opt1 === opt4) {
      setErrorMessage("Option 1 and Option 4 are the same.");
      return true;
    }
    if (opt2 === opt3) {
      setErrorMessage("Option 2 and Option 3 are the same.");
      return true;
    }
    if (opt2 === opt4) {
      setErrorMessage("Option 2 and Option 4 are the same.");
      return true;
    }
    if (opt3 === opt4) {
      setErrorMessage("Option 3 and Option 4 are the same.");
      return true;
    }
    return false;
  };

  /**
   * Creates an object representing the question update based on the current state.
   * @returns {object} - The update object.
   */
  const createUpdateObject = (): object => {
    const toUpdate: any = {};

    if (question === "") toUpdate["question"] = oldQuestion;
    else toUpdate["question"] = question;

    toUpdate["options"] = options.map((option, index) => oldOptions[index]);

    if (!correctAnswer)
      toUpdate.correct = parseInt(oldCorrectAnswer.split(" ")[1]);
    else toUpdate.correct = parseInt(correctAnswer);

    return toUpdate;
  };

  /**
   * Handles the updating of the question with the provided update object.
   * @param {object} toUpdate - The update object.
   */
  const updating = (toUpdate: object): void => {
    axios
      .patch(`http://localhost:8000/quizs/update/${ID}`, toUpdate, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .then((data) => {
        console.log("data.question: " + data.question);
        axios
          .get(
            `http://localhost:8000/quizs/getSingleQuestion?question=${data.question}`
          )
          .then((response) => response.data)
          .then((data) => {
            setOldQuestion(data.question);
            setOldOptions(data.options);
            setOldCorrectAnswer(`Option ${data.correct}`);
            setID(data._id);
            setFirstAppear(false);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));

    setFirstAppear(true);
  };

  /**
   * Handles the submission of the question update form.
   * @param {object} event - The form submit event.
   */
  const updateChoice = (event: any): void => {
    event.preventDefault();
    const toUpdate = createUpdateObject();

    if (haveConflict()) {
      setError(true);
      setSuccess(false);
      return;
    }

    setError(false);
    setSuccess(true);
    updating(toUpdate);
  };

  /**
   * Handles the click event of the back button.
   * @param {object} event - The button click event.
   */
  function handleUpdateBack(event: any): void {
    setBack(true);
  }

  return (
    <>
      {!back && (
        <div className="multiple-choice">
          <PresentUpdated
            oldOptions={oldOptions}
            oldQuestion={oldQuestion}
            oldCorrectAnswer={oldCorrectAnswer}
          />
          <form onSubmit={updateChoice}>
            <UpdateQuestion
              oldQuestion={oldQuestion}
              setOldQuestion={setOldQuestion}
              setQuestion={setQuestion}
            />
            {options.length > 0 &&
              options.map((option, index) => (
                <UpdateOption
                  option={option}
                  index={index}
                  oldOptions={oldOptions}
                  options={options}
                  setOptions={setOptions}
                  setOldOptions={setOldOptions}
                />
              ))}
            <UpdateCorrectAnswer
              oldCorrectAnswer={oldCorrectAnswer}
              setCorrectAnswer={setCorrectAnswer}
              setOldCorrectAnswer={setOldCorrectAnswer}
              oldOptions={oldOptions}
            />
            <button type="submit" className="submit-button" disabled={disabled}>
              {disabled ? "Submitting..." : "Submit"}
            </button>
            <button
              onClick={handleUpdateBack}
              className="back-button-from-updating"
            >
              Back
            </button>
            {error && <h2 className="error-message">{errorMessage}</h2>}
            {success && (
              <h2 className="success-message">
                The question updated successfully
              </h2>
            )}
          </form>
        </div>
      )}
      {back && <UpdateQuiz />}
    </>
  );
};

export default MultipleChoice;
