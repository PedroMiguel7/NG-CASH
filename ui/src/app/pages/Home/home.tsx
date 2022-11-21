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
  Saldo,
  NEWTr,
} from "./styles";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RECEBIDO from "../../../assets/svgs/money+recebido.svg";
import ENVIADO from "../../../assets/svgs/money+enviado.svg";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Transaction from "../../components/modal_transaction/transaction";
import SideBar from "../../components/Sidebar/sidebar";

export default function Home() {
  const [user, setUser]: any = useState([]);

  const fetchUser = async () => {
    try {
      const response = await api.get(`/user`);
      setUser(response.data);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        window.location.href = "/";
      }
    }
  };
  fetchUser();

  // const [TRANSFERENCIAS, setTRANSFERENCIAS] = useState([
  //   {
  //     id: 1,
  //     debitedAccountId: 1,
  //     creditedAccountId: 2,
  //     value: 5.76,
  //     createdAt: "2022-11-17 13:12:18 +0000",
  //   },
  //   {
  //     id: 5,
  //     debitedAccountId: 2,
  //     creditedAccountId: 1,
  //     value: 125.76,
  //     createdAt: "2022-11-17 15:12:18 +0000",
  //   },
  //   {
  //     id: 2,
  //     debitedAccountId: 1,
  //     creditedAccountId: 2,
  //     value: 65.76,
  //     createdAt: "2022-11-17 15:12:18 +0000",
  //   },
  //   {
  //     id: 4,
  //     debitedAccountId: 2,
  //     creditedAccountId: 1,
  //     value: 15.7,
  //     createdAt: "2022-10-18 13:12:18 +0000",
  //   },
  // ]);
  const [TRANSFERENCIAS, setTRANSFERENCIAS]: any = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await api.get(`/Transaction`);
      setTRANSFERENCIAS(response.data);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        window.location.href = "/";
      }
    }
  };
  fetchTransactions();

  const fetchAccount = async () => {
    try {
      const response = await api.get(`/user/account`);
      setUser(response.data);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        window.location.href = "/";
      }
    }
  };

  const [filter, setFilter] = useState("");
  const handleChange = (event: any) => {
    setFilter(event.target.value);
  };
  var emptyState = false;
  var TRANSFERENCIASFl: any[] = TRANSFERENCIAS;

  if (filter) {
    const exp = eval(`/${filter.replace(/[^\d\w]+/, ".*")}/i`);
    TRANSFERENCIASFl = TRANSFERENCIAS?.filter(
      (tr: { value: any; createdAt: string | number | Date }) =>
        // exp.test(
        //   tr.creditedAccountId === userId
        //     ? usernametransaction(tr.creditedAccountId)
        //     : usernametransaction(tr.debitedAccountId)
        // ) ||
        exp.test(tr.value) ||
        exp.test(
          new Date(tr.createdAt).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "short",
          })
        )
    );
    if (TRANSFERENCIAS.length === 0) {
      emptyState = true;
    }
  }

  return (
    <Container>
      <SideBar></SideBar>
      <HomeContainer>
        <Header>
          <H>Olá, {user ? user?.username : "user"}</H>
          <Saldo>
            SALDO: R$
            {user ? user?.account?.balance : "saldo indisponivel"}
          </Saldo>
        </Header>
        <NEWTr>
          <Transaction></Transaction>
        </NEWTr>
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
          {TRANSFERENCIASFl ? (
            TRANSFERENCIASFl.map((e) => (
              <Transferencia>
                <TRicon>
                  {e.creditedAccountId === user?.id ? (
                    <img src={RECEBIDO} alt="" width="44px" height="43px" />
                  ) : (
                    <img src={ENVIADO} alt="" width="44px" height="43px" />
                  )}
                </TRicon>
                <TRdados>
                  <TRhead>
                    <div>
                      {e.creditedAccountId === user?.id
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
                  <TRnome>
                    {/* {e.creditedAccountId === userId
                      ? usernametransaction(e.creditedAccountId)
                      : usernametransaction(e.debitedAccountId)} */}
                  </TRnome>
                  <TRvalor>R$ {e.value}</TRvalor>
                </TRdados>
              </Transferencia>
            ))
          ) : (
            <div>sem transferencia</div>
          )}
        </Transferencias>
      </HomeContainer>
    </Container>
  );
}
