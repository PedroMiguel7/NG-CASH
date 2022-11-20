import {  Container, Logo } from "./styles";
import logo from "../../../assets/svgs/logo_svg.svg"

function SideBar(props: any) {
  return( 
  <Container>
    <Logo>
      <img src={logo} alt="logo" />
    </Logo>
  </Container>);
}

export default SideBar;
