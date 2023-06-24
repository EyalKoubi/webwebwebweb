/**
 * Props interface for the Option component.
 */
interface OptionProps {
  option: string;
  options: string[];
  setOptions: React.Dispatch<React.SetStateAction<string[]>>;
  index: any;
}

/**
 * Component for rendering an input field for an option in a quiz.
 * @param {OptionProps} props - The component props.
 * @returns {JSX.Element} - JSX element representing the Option component.
 */
const Option = (props: OptionProps): JSX.Element => {
  /**
   * Event handler for the change event of the option input field.
   * Updates the options array with the new value for the specific option.
   * @param {any} index - The index of the option in the options array.
   * @param {any} value - The new value for the option.
   */
  const handleOptionChange = (index: any, value: any): void => {
    const updatedOptions = [...props.options];
    updatedOptions[index] = value;
    props.setOptions(updatedOptions);
  };

  return (
    <div className="input-group" key={props.index}>
      <label htmlFor={`option${props.index + 1}`}>{`Option ${
        props.index + 1
      }:`}</label>
      <input
        type="text"
        id={`option${props.index + 1}`}
        value={props.option}
        onChange={(event) =>
          handleOptionChange(props.index, event.target.value)
        }
      />
    </div>
  );
};

export default Option;
