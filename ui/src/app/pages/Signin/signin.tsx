import { useState } from "react";
import styled from "styled-components";
import api from "../../services/api";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const Logar = (e: any) => {
    e.preventDefault();
    api
      .post("/login", {
        username: username,
        password: password,
      })
      .then((res: any) => {
        const fetchToken = async () => { 
          try {
            localStorage.setItem("token", JSON.stringify(res.data.token))
          } catch (error) {
            console.log(error);
          }
          window.location.href = "/home";
        };
        fetchToken();
      })
      .catch((err: any) => alert(err));
  };

  return (
    <>
      Signin
    </>
  );
}

export default Signin;
