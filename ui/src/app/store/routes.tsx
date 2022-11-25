import Home from "../pages/Home/home";
import Signin from "../pages/Signin/signin";
import Signup from "../pages/Signup/signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FilterPopper from "../components/filter/filtro";

export const Rout = (props: { SideBar: any }) => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/filtro" element={<FilterPopper />} />
    </Routes>
  </BrowserRouter>
);
