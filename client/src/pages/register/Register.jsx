import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import {ToastContainer,toast} from 'react-toastify'
// import "react-toastify/dist/ReactToastify.css";
import axios from "axios"

function Register() {
  const navigate = useNavigate();
  const [values,setValues] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
  })

  const handleSubmit = async(e) => {
    e.preventDefault();
    const {username,email,password} = values;
    const {data} = await axios.post("http://localhost:5000/api/user/signup",{username,email,password});
    console.log(data)
    if (data.status === false) {
      alert(data.data.message);
    }
    if(data.status === true){
      navigate("/");
    } 
  }

  const handleChange = (e) => {
    setValues({...values,[e.target.name]:e.target.value})
  }

  return (
    <div className="form-membership">
      <div className="form-wrapper">
        <div className="logo"></div>

        <h5>Create account</h5>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="username"
              required
              autoFocus
              onChange={(e) => handleChange(e)}
            />
          </div>
          {/* <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Lastname"
              required
            />
          </div> */}
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Register</button>
          <hr />
          <p className="text-muted">Already have an account?</p>
          <Link to="/" className="btn btn-outline-light btn-sm">
            Sign in!
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
