import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [sortCode, setSortCode] = useState("");
  const [cvv, setCvv] = useState("");
  const [accountType, setAccountType] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password match validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Bank details validation
    if (!/^\d{16}$/.test(accountNumber)) {
      setError("Account number must be 16 digits");
      return;
    }

    if (!/^\d{6}$/.test(sortCode)) {
      setError("Sort code must be 6 digits");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      setError("CVV must be 3 digits");
      return;
    }

    if (!accountType) {
      setError("Please select an account type");
      return;
    }

    // Check existing users in localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (existingUsers.some(user => user.email === email)) {
      setError("Email is already registered");
      return;
    }

    // Save new user
    const newUser = { email, password, accountNumber, sortCode, cvv, accountType };
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

    alert("Account created successfully!");
    navigate("/"); // redirect to login
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Create Account</h1>
        <p>Sign up to get started</p>

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

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              maxLength={16}
              placeholder="16-digit account number"
              required
            />
          </div>

          <div className="form-group">
            <label>Sort Code</label>
            <input
              type="text"
              value={sortCode}
              onChange={(e) => setSortCode(e.target.value)}
              maxLength={6}
              placeholder="6-digit sort code"
              required
            />
          </div>

          <div className="form-group">
            <label>CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength={3}
              placeholder="3-digit CVV"
              required
            />
          </div>

          <div className="form-group">
            <label>Account Type</label>
            <select
              className="styled-select"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              required
            >
              <option value="">Select Account Type</option>
              <option value="business">Business</option>
              <option value="investor">Investor</option>
            </select>
          </div>

          <button type="submit" className="login-button">Create Account</button>
        </form>

        {error && <p className="error">{error}</p>}

        <button
          className="login-button"
          style={{ marginTop: "1rem", backgroundColor: "#6c757d" }}
          onClick={() => navigate("/")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
