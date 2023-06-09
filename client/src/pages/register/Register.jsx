import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"

function Register() {
  const navigate = useNavigate();
  const [values,setValues] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
  })

  useEffect(() => {
    if(localStorage.getItem("user")){
      navigate("/chat")
    }
  },[])

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const {username,email,password} = values;
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/signup`,{username,email,password});
    console.log(data)
    if (data.status === false) {
      if(data.code === 311)
      {
        const key = Object.keys(data.data.message)
        for(let i=0;i<key.length;i++)
          toast.error(data.data.message[key[i]], toastOptions);
      }
      else{
        toast.error(data.data.message, toastOptions);
      }
    }
    if(data.status === true){
      navigate("/");
    } 
  }

  const handleChange = (e) => {
    setValues({...values,[e.target.name]:e.target.value})
  }

  return (
    <>
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
    <ToastContainer/>
    </>
  );
}

export default Register;
