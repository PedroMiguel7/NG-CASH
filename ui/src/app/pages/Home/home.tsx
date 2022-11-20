import {
  Container,
  H,
  Header,
  HomeContainer,
  P,
  Transferencia,
  Transferencias,
  TRdados,
  TRdata,
  TRicon,
  TRnome,
  TRhead,
  TRvalor,
} from "./styles";
import { useJwt } from "react-jwt";
import { Input } from "@material-ui/core";
import RECEBIDO from "../../../assets/svgs/money+recebido.svg";
import ENVIADO from "../../../assets/svgs/money+enviado.svg";
import { useState } from "react";

export default function Home(Sidebar: any) {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "token";
  // const { decodedToken, isExpired, reEvaluateToken } = useJwt(token);
  // const userId= decodedToken?.id
  // const userName = decodedToken?.username;

  const [TRANSFERENCIAS, setTRANSFERENCIAS] = useState([
    {
      id: 1,
      debitedAccountId: 1,
      creditedAccountId: 2,
      usernameTransaction: "adm2",
      value: 25.76,
      createdAt: "2022-11-17 13:12:18 +0000",
    },
    {
      id: 5,
      debitedAccountId: 2,
      creditedAccountId: 1,
      usernameTransaction: "adm2",
      value: 25.76,
      createdAt: "2022-11-17 15:12:18 +0000",
    },
    {
      id: 2,
      debitedAccountId: 1,
      creditedAccountId: 2,
      usernameTransaction: "adm2",
      value: 25.76,
      createdAt: "2022-11-17 15:12:18 +0000",
    },
    {
      id: 4,
      debitedAccountId: 2,
      creditedAccountId: 1,
      usernameTransaction: "adm2",
      value: 25.76,
      createdAt: "2022-11-17 13:12:18 +0000",
    },
  ]);

  return (
    <Container>
      <div>{Sidebar}</div>
      <HomeContainer>
        <Header>
          <H>Olá, user</H>
        </Header>
        <Transferencias>
          <P>Últimas Transferências</P>
          <Input></Input>
          {TRANSFERENCIAS.map((e) => (
            <Transferencia>
              <TRicon>
                {e.creditedAccountId === 1 ? (
                  <img src={RECEBIDO} alt="" />
                ) : (
                  <img src={ENVIADO} alt="" />
                )}
              </TRicon>
              <TRdados>
                <TRhead>
                  <div>
                    {e.creditedAccountId === 1
                      ? "Transferência recebida "
                      : "Transferência enviada"}
                  </div>
                  <TRdata>
                    {new Date(e.createdAt).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </TRdata>
                </TRhead>
                <TRnome>{e.usernameTransaction}</TRnome>
                <TRvalor>R$ {e.value}</TRvalor>
              </TRdados>
            </Transferencia>
          ))}
        </Transferencias>
      </HomeContainer>
    </Container>
  );
}
