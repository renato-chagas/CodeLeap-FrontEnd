import "./signupModal.css";
import { useState } from "react";

type SignupModalProps = {
  onSuccess: () => void;
};

export default function SignupModal({ onSuccess }: SignupModalProps) {
  const [username, setUsername] = useState("");
  const isDisabled = username.trim().length === 0;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isDisabled) {
      return;
    }

    localStorage.setItem("username", username.trim());
    onSuccess();
  }

  return (
    <div className="LoginModalOverlay" role="dialog" aria-modal="true">
      <form className="SignupCard" onSubmit={handleSubmit}>
        <h1>Welcome to CodeLeap network!</h1>
        <div className="SignupForm">
          <label htmlFor="signup-username">Please enter your username</label>
          <input
            id="signup-username"
            className="Input"
            type="text"
            placeholder="John Doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit" disabled={isDisabled}>
            ENTER
          </button>
        </div>
      </form>
    </div>
  );
}
