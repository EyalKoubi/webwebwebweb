interface UpdateOptionProps {
  option: string;
  index: number;
  oldOptions: string[];
  options: string[];
  setOptions: (value: React.SetStateAction<string[]>) => void;
  setOldOptions: (value: React.SetStateAction<string[]>) => void;
}

// component for option
// field update
const UpdateOption = (props: UpdateOptionProps) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedOptions = [...props.options];
    updatedOptions[props.index] = props.option;
    props.setOptions(updatedOptions);

    const updatedOldOptions = [...props.oldOptions];
    updatedOldOptions[props.index] = event.target.value;
    props.setOldOptions(updatedOldOptions);
  };

  return (
    <div key={props.index}>
      <label htmlFor={`option${props.index + 1}`}>
        Option {props.index + 1}:
      </label>
      <input
        type="text"
        id={`option${props.index + 1}`}
        value={props.oldOptions[props.index]}
        onChange={handleOptionChange}
      />
    </div>
  );
};

export default UpdateOption;
