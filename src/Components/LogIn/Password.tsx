import "../../CSS/App.css";

interface PasswordProps {
  password: string;
  setPassword: (value: React.SetStateAction<string>) => void;
}

// component for the
// password field of log in
const Password = (props: PasswordProps) => {
  const handlePasswordChange = (event: any) => {
    props.setPassword(event.target.value);
  };

  return (
    <div className="form-group-pas">
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={props.password}
        onChange={handlePasswordChange}
      />
    </div>
  );
};

export default Password;
