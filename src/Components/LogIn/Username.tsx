import "../../CSS/App.css";

interface UsernameProps {
  username: string;
  setUsername: (value: React.SetStateAction<string>) => void;
}

// component for username
// field on login screen
const Username = (props: UsernameProps) => {
  const handleUsernameChange = (event: any) => {
    props.setUsername(event.target.value);
  };

  return (
    <div className="form-group-use">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={props.username}
        onChange={handleUsernameChange}
      />
    </div>
  );
};

export default Username;
