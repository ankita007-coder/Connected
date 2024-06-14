import React, { useContext, useState } from "react";
import Wrapper from "../assets/wrappers/LoginRegister";
import Button from "@mui/material/Button";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { NavHead } from "../components";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginRegister = ({ onlogin }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await customFetch.post(
        "/auth/register",
        {
          name,
          email,
          password,
          gender,
          bio,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        const msg = await response.data.msg;
        toast.success(msg);
        const token = response.data.token;
        login(token);
        navigate("/home");
      }
    } catch (error) {
      const msg = await error.response.data.msg;
      toast.error(msg);
    }
  };

  const clickLogin = async (e) => {
    e.preventDefault();
    onlogin(email, password);
  };

  return (
    <>
      <NavHead />
      <Wrapper>
        <div className={`register ${isLogin ? "loginOn" : "registerOn"}`}>
          {isLogin ? (
            <>
              <p> New to our community?</p>
              <Button
                variant="outlined"
                size="medium"
                onClick={() => setIsLogin(false)}
                className="button-primary"
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <h3>Register</h3>
              <div>
                <label htmlFor="name">Full Name :</label>
                <br />
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email : </label>
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password :</label>
                <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Gender</label>
              </div>
              <div className="gender">
                <div className="gender">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="Female"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="female">Female</label>
                </div>
                <div className="gender">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="Male"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="male">Male</label>
                </div>
              </div>
              <div>
                <label htmlFor="bio">Bio :</label>
                <br />
                <textarea
                  name="bio"
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows="4"
                ></textarea>
              </div>
              <Button
                variant="outlined"
                size="medium"
                className="button-primary"
                onClick={handleRegister}
              >
                Register
              </Button>
            </>
          )}
        </div>
        <div className={`login ${isLogin ? "loginOn" : "registerOn"}`}>
          {isLogin ? (
            <>
              <h3>Login</h3>
              <div>
                <label htmlFor="emailR">Email : </label>
                <br />
                <input
                  type="email"
                  name="email"
                  id="emailR"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <div>
                  <label htmlFor="password">Password :</label>
                  <br />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button
                variant="contained"
                size="medium"
                className="button-primary"
                onClick={clickLogin}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              <p>Already joined our community?</p>
              <Button
                variant="contained"
                size="medium"
                className="button-primary"
                onClick={() => setIsLogin(true)}
              >
                Login
              </Button>
            </>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default LoginRegister;
