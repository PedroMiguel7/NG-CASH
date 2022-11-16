import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/home";
import { Signin } from "../pages/Signin/signin";

import { useJwt } from "react-jwt";
import { ReactChild, ReactFragment, ReactPortal } from "react";
import { Signup } from "../pages/Signup/signup";

const Private = (Item: JSX.IntrinsicAttributes) => {
  const token = localStorage.getItem("token");
//   const { decodedToken, isExpired, reEvaluateToken } = useJwt(token);
//   const userId = decodedToken?.sum;
//   const userName = decodedToken?.name;
//   const userType = decodedToken?.tipo;

  //console.log(decodedToken)
  //console.log(userType)

//   const updateToken = () => {
//     const newToken = "A new JWT";
//     reEvaluateToken(newToken); // decodedToken and isExpired will be updated
//   };

  if (token !== null) {
    return Item;
  } else {
    return Signin;
  }
};

export const Rout = (props: {
  SideBar:
    | boolean
    | ReactChild
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
}) => (
  <BrowserRouter>
    <div className="GeneralContainer d-flex row">
      {props.SideBar}
      <Routes>
        {/* <Route exect path="/" element={Signin} />
        <Route exect path="/signup" element={Signup} />
        <Route exect path="/home" element={<Private Item={Home} />} /> */}
      </Routes>
    </div>
  </BrowserRouter>
);
