import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState,useLayoutEffect } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('reload', '1');
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
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/login`, {
      username,
      email,
      password,
    });
    if (data.status === false) {
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
        <div className="logo">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="612px"
          height="612px"
          viewBox="0 0 612 612"
          style={{ enableBackground: "new 0 0 612 612" }}
          xmlSpace="preserve"
        >
              <g>
                  <g id="_x32__26_">
                      <g>
                      <path d="M401.625,325.125h-191.25c-10.557,0-19.125,8.568-19.125,19.125s8.568,19.125,19.125,19.125h191.25
                      c10.557,0,19.125-8.568,19.125-19.125S412.182,325.125,401.625,325.125z M439.875,210.375h-267.75
                      c-10.557,0-19.125,8.568-19.125,19.125s8.568,19.125,19.125,19.125h267.75c10.557,0,19.125-8.568,19.125-19.125
                      S450.432,210.375,439.875,210.375z M306,0C137.012,0,0,119.875,0,267.75c0,84.514,44.848,159.751,114.75,208.826V612
                      l134.047-81.339c18.552,3.061,37.638,4.839,57.203,4.839c169.008,0,306-119.875,306-267.75C612,119.875,475.008,0,306,0z
                      M306,497.25c-22.338,0-43.911-2.601-64.643-7.019l-90.041,54.123l1.205-88.701C83.5,414.133,38.25,345.513,38.25,267.75
                      c0-126.741,119.875-229.5,267.75-229.5c147.875,0,267.75,102.759,267.75,229.5S453.875,497.25,306,497.25z"/>
                      </g>
                  </g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
          </svg>
        </div>

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
          <button className="btn btn-primary btn-block">Sign in</button>
          <hr />
          <p className="text-muted">Login with your social media account.</p>
          {/* <ul className="list-inline">
            <li className="list-inline-item">
                <a onClick={ e => e.preventDefault() } className="btn btn-floating btn-facebook">
                    <i className="fa fa-facebook"></i>
                </a>
            </li>
            <li className="list-inline-item">
                <a onClick={ e => e.preventDefault() } className="btn btn-floating btn-twitter">
                    <i className="fa fa-twitter"></i>
                </a>
            </li>
            <li className="list-inline-item">
                <a onClick={ e => e.preventDefault() } className="btn btn-floating btn-dribbble">
                    <i className="fa fa-dribbble"></i>
                </a>
            </li>
            <li className="list-inline-item">
                <a onClick={ e => e.preventDefault() } className="btn btn-floating btn-linkedin">
                    <i className="fa fa-linkedin"></i>
                </a>
            </li>
            <li className="list-inline-item">
                <a onClick={ e => e.preventDefault() } className="btn btn-floating btn-google">
                    <i className="fa fa-google"></i>
                </a>
            </li>
            <li className="list-inline-item">
                <a onClick={ e => e.preventDefault() } className="btn btn-floating btn-behance">
                    <i className="fa fa-behance"></i>
                </a>
            </li>
            <li className="list-inline-item">
                <a onClick={ e => e.preventDefault() } className="btn btn-floating btn-instagram">
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
