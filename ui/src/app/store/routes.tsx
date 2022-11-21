import Home from "../pages/Home/home";
import Signin from "../pages/Signin/signin";
import Signup from "../pages/Signup/signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const Rout = (props: { SideBar: any }) => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </BrowserRouter>
);
