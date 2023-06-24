interface UpdateQuestionProps {
  oldQuestion: string;
  setQuestion: (value: React.SetStateAction<string>) => void;
  setOldQuestion: (value: React.SetStateAction<string>) => void;
}

// component for question
// field update
const UpdateQuestion = (props: UpdateQuestionProps) => {
  return (
    <div className="Question">
      <label htmlFor="question">Question:</label>
      <input
        type="text"
        id="oldQuestion"
        name="oldQuestion"
        value={props.oldQuestion}
        onChange={(event) => {
          props.setOldQuestion(event.target.value);
          props.setQuestion(event.target.value);
        }}
      />
    </div>
  );
};

export default UpdateQuestion;
