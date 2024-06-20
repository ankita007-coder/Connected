import React, { useState } from "react";
import Wrapper from "../assets/wrappers/LoginRegister";
import Button from "@mui/material/Button";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { NavHead } from "../components";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");

  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      setLoading(true);
      if (response.status === 201) {
        const token = response.data.token;
        login(token);
        const msg = await response.data.msg;
        toast.success(msg);
        setLoading(false);
      }
    } catch (error) {
      const msg = await error.response.data.msg;
      toast.error(msg);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await customFetch.post(
        "/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(true);
      if (response.status === 200) {
        const { token } = response.data;
        await login(token);
        setLoading(false);
        navigate('/');
        toast.success(response.data.msg);
      }
    } catch (error) {
      const msg = await error?.response?.data?.msg;
      toast.error(msg);
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }
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
                onClick={handleLogin}
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
