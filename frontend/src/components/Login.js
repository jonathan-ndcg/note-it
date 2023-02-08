import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../store/auth-context";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false)
  const [errMessage, setErrMessage] = useState("")

  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmitLogin = (e) => {
    if (e) e.preventDefault()

    axios
      .post("http://localhost:4000/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.err) {
          setErrors(true)
          setErrMessage(response.data.message)
        } else {
          authCtx.login(response.data.token, response.data.expiresIn)
          navigate(from, { replace: true })
        }
      });
  };

  const registerUser = (e) => {
    e.preventDefault()
    axios.post("http://localhost:4000/register", {
      email: email,
      password: password
    })
      .then(response => {
        console.log(response.data)
        if (response.data.err) {
          setErrors(true)
          setErrMessage(response.data.message)
        }
        else {
          handleSubmitLogin()
        }
      })
  }

  return (
    <form className='m-3'>
      <div className="row justify-content-center">
        <div className="col-md-6">
          {errors ?
            (
              <div className="alert alert-danger" role="alert">
                {errMessage}
              </div>
            ) : <div></div>
          }

          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label text-light">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="inputPassword" className="form-label text-light">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-4 text-center">
          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            onClick={handleSubmitLogin}>
            Log in
          </button>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-4 text-center">
          <button
            type="submit"
            className="btn btn-success w-100"
            onClick={registerUser}>
            Sign up
          </button>
        </div>
      </div>
    </form>
  )
}

export default Login