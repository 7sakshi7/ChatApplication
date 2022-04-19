import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [value, setValue] = useState({
    username: "",

    password: "",
  });

  useEffect(() => {
    console.log(localStorage.getItem("chat-app-user"))
    if (localStorage.getItem("chat-app-user")) {
      navigate("/chat");
    }
  },[]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      // console.log("in validation");
      const { username, password } = value;
      const { data } = await axios.post(loginRoute, {
        username,

        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      }
      navigate("/");
    }
  };

  const handleValidation = () => {
    // console.log("fwjhfuwe");
    const { username, password } = value;
    if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 5) {
      toast.error(
        "Password be greater than or equal to 8 characters",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={logo} alt="" />
            <h1>Snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={value.username}
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={value.password}
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Login</button>
          <span>
            Don't have An Account ? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }

    button {
      backgound-color: #997af0;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s;
      &:hover {
        background-color: #4e0eff;
        color: white;
      }
    }

    span {
      text-transform: uppercase;
      color: white;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;
