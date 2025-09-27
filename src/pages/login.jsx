import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Predefined accounts
    const predefinedUsers = [
      { email: "bus@bus.com", password: "bus123", accountType: "business" },
      { email: "in@in.com", password: "in123", accountType: "investor" }
    ];

    // Users from localStorage
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];

    const allUsers = [...predefinedUsers, ...localUsers];

    const user = allUsers.find(u => u.email === email && u.password === password);

    if (user) {
      // Navigate based on account type
      if (user.accountType === "business") {
        navigate("/create-pitch");
      } else {
        navigate("/display-pitches");
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome</h1>
        <p>Login to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>

        {error && <p className="error">{error}</p>}

        <button
          className="login-button"
          style={{ marginTop: "1rem", backgroundColor: "#28a745" }}
          onClick={() => navigate("/create-account")}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
