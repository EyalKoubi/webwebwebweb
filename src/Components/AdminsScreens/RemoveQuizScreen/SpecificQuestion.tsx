import axios from "axios";

interface SpecificQuestionProps {
  quiz: any;
  setQuizList: (value: React.SetStateAction<never[]>) => void;
}

/**
 * Component representing a specific question in the list of quizzes on the "Remove Quiz" screen.
 * @param {SpecificQuestionProps} props - The properties passed to the component.
 * @returns {JSX.Element} - JSX element representing the SpecificQuestion component.
 */
const SpecificQuestion = (props: SpecificQuestionProps): JSX.Element => {
  /**
   * Handles the removal of a quiz by making a DELETE request to the server.
   * @param {number} id - The ID of the quiz to be removed.
   */
  const handleRealRemoveQuiz = (id: number): void => {
    axios
      .delete(`http://localhost:8000/quizs/delete/${id}`)
      .then((response) => {
        const data = response.data;
        if (data.success) {
          const element = document.getElementById("all");
          if (element) {
            element.remove();
          }
          axios
            .get("http://localhost:8000/quizs/getQuestions")
            .then((response: any) => {
              props.setQuizList(response.data);
            });
        }
      });
  };

  return (
    <li className="quiz-item">
      <div className="quiz-question">{props.quiz.question}</div>
      <button
        className="remove-button"
        onClick={() => handleRealRemoveQuiz(props.quiz._id)}
      >
        X
      </button>
    </li>
  );
};

export default SpecificQuestion;
