import Home from "../pages/Home/home";
import Signin from "../pages/Signin/signin";
import Signup from "../pages/Signup/signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Private = (props: any) => {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "token";
  // const { decodedToken, isExpired, reEvaluateToken } = useJwt(token);
  // const userId = decodedToken?.id;
  // const userName = decodedToken?.username;

  // console.log(decodedToken)

  // const updateToken = () => {
  //   const newToken = "A new JWT";
  //   reEvaluateToken(newToken); // decodedToken and isExpired will be updated
  // };

  if (token !== null) {
    return props;
  } else {
    return Signin;
  }
};

export const Rout = (props: { SideBar: any }) => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </BrowserRouter>
);
