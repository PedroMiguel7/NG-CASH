import { Container } from "./styles";

export default function Home(Sidebar: any) {
  return (
    <Container>
      <div>{Sidebar}</div>
      <div>Home</div>
    </Container>
  );
}
