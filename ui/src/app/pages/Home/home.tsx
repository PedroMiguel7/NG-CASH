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
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
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
      usernameTransaction: "radm23",
      value: 25.76,
      createdAt: "2022-11-17 15:12:18 +0000",
    },
    {
      id: 2,
      debitedAccountId: 1,
      creditedAccountId: 2,
      usernameTransaction: "b123",
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

  const [filter, setFilter] = useState("");
  const handleChange = (event: any) => {
    setFilter(event.target.value);
  };

  var emptyState = false;
  var TRANSFERENCIASFl: any[] = TRANSFERENCIAS;

  if (filter) {
    const exp = eval(`/${filter.replace(/[^\d\w]+/, ".*")}/i`);
    TRANSFERENCIASFl = TRANSFERENCIAS?.filter((projetos) =>
      exp.test(projetos.usernameTransaction.toUpperCase())
    );
    if (TRANSFERENCIAS.length === 0) {
      emptyState = true;
    }
  }

  return (
    <Container>
      <div>{Sidebar}</div>
      <HomeContainer>
        <Header>
          <H>Olá, user</H>
        </Header>
        <Transferencias>
          <P>Últimas Transferências</P>
          <div className="search">
            <div className="searchIcon">
              <SearchIcon />
            </div>
            <InputBase
              id="pesquisa"
              onChange={handleChange}
              type="search"
              name="main-search"
              placeholder="Pesquise aqui..."
              className="inputRoot inputInput"
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          {TRANSFERENCIASFl.map((e) => (
            <Transferencia>
              <TRicon>
                {e.creditedAccountId === 1 ? (
                  <img src={RECEBIDO} alt="" width="44px" height="43px" />
                ) : (
                  <img src={ENVIADO} alt="" width="44px" height="43px" />
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
