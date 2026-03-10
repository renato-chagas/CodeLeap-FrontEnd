import { useNavigate } from "react-router-dom";
import "./signup.css";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const isDisabled = username.trim().length === 0;

  function handleSubmit() {
    if (isDisabled) {
      return false;
    }

    localStorage.setItem("username", username);
    navigate("/home");
  }

  return (
    <div className="LayoutSignup">
      <div className="SignupCard">
        <h1>Welcome to CodeLeap network!</h1>
        <div className="SignupForm">
          <label htmlFor="">Please enter your username</label>
          <input
            className="Input"
            type="text"
            placeholder="John Doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleSubmit} disabled={isDisabled}>
            ENTER
          </button>
        </div>
      </div>
    </div>
  );
}
