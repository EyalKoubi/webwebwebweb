/**
 * Props interface for the CorrectAnswer component.
 */
interface CorrectAnswerProps {
  correctAnswer: number;
  setCorrectAnswer: (value: React.SetStateAction<number>) => void;
}

/**
 * Component for selecting the correct answer for a quiz.
 * @param {CorrectAnswerProps} props - The component props.
 * @returns {JSX.Element} - JSX element representing the CorrectAnswer component.
 */
const CorresctAnswer = (props: CorrectAnswerProps): JSX.Element => {
  /**
   * Event handler for the change event of the select input.
   * Updates the selected correct answer value.
   * @param {any} event - The change event.
   */
  const handleCorrectAnswerChange = (event: any): void => {
    props.setCorrectAnswer(Number(event.target.value));
  };

  return (
    <div className="input-group">
      <label htmlFor="correctAnswer">Correct Answer:</label>
      <select
        id="correctAnswer"
        value={props.correctAnswer}
        onChange={handleCorrectAnswerChange}
      >
        <option value={1}>Option 1</option>
        <option value={2}>Option 2</option>
        <option value={3}>Option 3</option>
        <option value={4}>Option 4</option>
      </select>
    </div>
  );
};

export default CorresctAnswer;
