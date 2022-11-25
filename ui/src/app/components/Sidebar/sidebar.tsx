import { Container, SideLogo, SideLogout } from "./styles";
import logo from "../../../assets/svgs/logo_svg.svg";
import { useNavigate } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

function SideBar(props: any) {
  const navigate = useNavigate();
  const signout = (e: any) => {
    e.preventDefault();
    localStorage.setItem("token", "false");
  };

  return (
    <Container>
      <SideLogo>
        <img src={logo} alt="logo" />
      </SideLogo>

      <SideLogout>
        <LogoutRoundedIcon
          sx={{ color: "#87888C" }}
          onClick={(e) => [signout(e), navigate("/")]}
        >
          logout
        </LogoutRoundedIcon>
      </SideLogout>
    </Container>
  );
}

export default SideBar;
