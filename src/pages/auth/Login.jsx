import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const email = form.email.value.trim().toLowerCase();
    const user = JSON.parse(localStorage.getItem("fandomverse-demo-user") || "null");
    if (!user || user.email !== email) {
      setError("No demo account was found for this email. Create an account first.");
      return;
    }
    sessionStorage.setItem("fandomverse-demo-session", "1");
    setSuccess(true);
    window.setTimeout(() => navigate("/"), 500);
  };

  return (
    <div className="container page">
      <form className="form" onSubmit={submit}>
        <span className="eyebrow">Welcome back</span>
        <h1>Login</h1>
        <p>This is a local demo account. No credentials are sent to a server.</p>
        <div className="field"><label htmlFor="login-email">Email</label><input id="login-email" name="email" type="email" autoComplete="email" required /></div>
        <div className="field"><label htmlFor="login-password">Password</label><input id="login-password" name="password" type="password" autoComplete="current-password" minLength="6" required /></div>
        <button className="button primary" type="submit">Login</button>
        {error && <p className="error-message" role="alert">{error}</p>}
        {success && <div className="success-message" role="status">Logged in successfully.</div>}
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </form>
    </div>
  );
}
