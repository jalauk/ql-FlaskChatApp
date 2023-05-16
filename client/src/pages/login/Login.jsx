import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState,useLayoutEffect } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("user")){
      navigate("/chat")
    }
  },[])

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = values;
    const { data } = await axios.post("http://localhost:5000/api/user/login", {
      username,
      email,
      password,
    });
    if (data.status === false) {
        console.log(data.data)
      alert(data.data.message);
    }
    if (data.status === true) {
      localStorage.setItem("access_token",data.data.tokens.access_token)
      localStorage.setItem("refresh_token",data.data.tokens.refresh_token)
      localStorage.setItem("user",JSON.stringify(data.data.user))
      navigate("/chat");
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-membership">
      <div className="form-wrapper">
        <div className="logo"></div>

        <h5>Sign in</h5>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="email"
              name="email"
              required
              autoFocus
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              required
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="form-group d-flex justify-content-between">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                checked=""
                readOnly
                id="customCheck1"
              ></input>
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
            <a href="reset-password.html">Reset password</a>
          </div>
          <button className="btn btn-primary btn-block">Sign in</button>
          <hr />
          <p className="text-muted">Login with your social media account.</p>
          {/* <ul className="list-inline">
            <li className="list-inline-item">
                <a href="#" className="btn btn-floating btn-facebook">
                    <i className="fa fa-facebook"></i>
                </a>
            </li>
            <li className="list-inline-item">
                <a href="#" className="btn btn-floating btn-twitter">
                    <i className="fa fa-twitter"></i>
                </a>
            </li>
            <li className="list-inline-item">
                <a href="#" className="btn btn-floating btn-dribbble">
                    <i className="fa fa-dribbble"></i>
                </a>
            </li>
            <li className="list-inline-item">
                <a href="#" className="btn btn-floating btn-linkedin">
                    <i className="fa fa-linkedin"></i>
                </a>
            </li>
            <li className="list-inline-item">
                <a href="#" className="btn btn-floating btn-google">
                    <i className="fa fa-google"></i>
                </a>
            </li>
            <li className="list-inline-item">
                <a href="#" className="btn btn-floating btn-behance">
                    <i className="fa fa-behance"></i>
                </a>
            </li>
            <li className="list-inline-item">
                <a href="#" className="btn btn-floating btn-instagram">
                    <i className="fa fa-instagram"></i>
                </a>
            </li>
        </ul> */}
          <hr />
          <p className="text-muted">Don't have an account?</p>
          <Link to="/register" className="btn btn-outline-light btn-sm">
            Register now!
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
