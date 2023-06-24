/**
 * Props interface for the QuestionInput component.
 */
interface QuestionProps {
  question: string;
  setQuestion: (value: React.SetStateAction<string>) => void;
}

/**
 * Component for rendering an input field for entering a question in a quiz.
 * @param {QuestionProps} props - The component props.
 * @returns {JSX.Element} - JSX element representing the QuestionInput component.
 */
const QuestionInput = (props: QuestionProps): JSX.Element => {
  return (
    <div className="input-group">
      <label htmlFor="question">Question:</label>
      <input
        type="text"
        id="question"
        value={props.question}
        onChange={(event) => props.setQuestion(event.target.value)}
      />
    </div>
  );
};

export default QuestionInput;
