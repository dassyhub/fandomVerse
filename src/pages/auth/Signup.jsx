import { Link } from "react-router-dom";

export default function Signup() {
  return <div className="container page"><div className="form"><span className="eyebrow">Join FandomVerse</span><h1>Create account</h1><div className="field"><label>Name</label><input /></div><div className="field"><label>Email</label><input type="email" /></div><div className="field"><label>Password</label><input type="password" /></div><button className="button primary">Sign Up</button><p>Already registered? <Link to="/login">Login</Link></p></div></div>;
}