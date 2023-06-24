import { SetStateAction } from "react";

interface UpdateCorrectAnswerProps {
  oldCorrectAnswer: string;
  setCorrectAnswer: (value: SetStateAction<string>) => void;
  setOldCorrectAnswer: (value: SetStateAction<string>) => void;
  oldOptions: string[];
}

// component for correct option
// field update (comboBox)
const UpdateCorrectAnswer = (props: UpdateCorrectAnswerProps) => {
  return (
    <div>
      <label htmlFor="correct-answer">Correct Answer:</label>
      <select
        id="correct-answer"
        value={props.oldCorrectAnswer}
        onChange={(event) => {
          props.setCorrectAnswer(event.target.value);
          props.setOldCorrectAnswer(event.target.value);
        }}
      >
        <option value="">Select correct answer</option>
        {props.oldOptions.map((option, index) => (
          <option value={index + 1} key={index}>{`Option ${index + 1}`}</option>
        ))}
      </select>
    </div>
  );
};

export default UpdateCorrectAnswer;
