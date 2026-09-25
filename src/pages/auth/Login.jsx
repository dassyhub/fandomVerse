import { Link } from "react-router-dom";

export default function Login() {
  return <div className="container page"><div className="form"><span className="eyebrow">Welcome back</span><h1>Login</h1><div className="field"><label>Email</label><input type="email" /></div><div className="field"><label>Password</label><input type="password" /></div><button className="button primary">Login</button><p>Don't have an account? <Link to="/signup">Sign up</Link></p></div></div>;
}