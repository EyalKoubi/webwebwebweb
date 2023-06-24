interface PresentUpdatedProps {
  oldOptions: string[];
  oldQuestion: string;
  oldCorrectAnswer: string;
}

// component that present the
// update to the user in live
const PresentUpdated = (props: PresentUpdatedProps) => {
  return (
    <div className="multiple-choice-data">
      <h1 className="multi-title">Questions Details:</h1>
      <h3>The question: {props.oldQuestion}</h3>
      {props.oldOptions.map((option, index) => (
        <p key={index}>
          Option {index + 1}: {option}
        </p>
      ))}
      <h3>Correct answer is {props.oldCorrectAnswer}</h3>
    </div>
  );
};

export default PresentUpdated;
