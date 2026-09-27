import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const user = {
      name: form.name.value.trim(),
      email: form.email.value.trim().toLowerCase(),
    };
    const existing = JSON.parse(localStorage.getItem("fandomverse-demo-user") || "null");
    if (existing?.email === user.email) {
      setError("A demo account already exists for this email.");
      return;
    }
    localStorage.setItem("fandomverse-demo-user", JSON.stringify(user));
    sessionStorage.setItem("fandomverse-demo-session", "1");
    navigate("/");
  };

  return (
    <div className="container page">
      <form className="form" onSubmit={submit}>
        <span className="eyebrow">Join FandomVerse</span>
        <h1>Create account</h1>
        <p>Dummy authentication for the project demonstration. No server-side account storage is used.</p>
        <div className="field"><label htmlFor="signup-name">Name</label><input id="signup-name" name="name" autoComplete="name" required /></div>
        <div className="field"><label htmlFor="signup-email">Email</label><input id="signup-email" name="email" type="email" autoComplete="email" required /></div>
        <div className="field"><label htmlFor="signup-password">Password</label><input id="signup-password" name="password" type="password" autoComplete="new-password" minLength="6" required /></div>
        <button className="button primary" type="submit">Sign Up</button>
        {error && <p className="error-message" role="alert">{error}</p>}
        <p>Already registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
