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
  TransferenciaHeader,
} from "./styles";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RECEBIDO from "../../../assets/svgs/money+recebido.svg";
import ENVIADO from "../../../assets/svgs/money+enviado.svg";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Transaction from "../../components/modal_transaction/transaction";
import SideBar from "../../components/Sidebar/sidebar";
import FilterPopper from "../../components/filter/filtro";

export default function Home() {
  const [user, setUser]: any = useState([]);

  const [TRANSFERENCIAS, setTRANSFERENCIAS]: any = useState([]);
  const [filterResults, setFilterResults]: any = useState("");

  useEffect(() => {
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
    const fetchTransactions = async () => {
      try {
        const response = await api.get(`/transaction${filterResults}`);
        setTRANSFERENCIAS(response.data);
      } catch (error: any) {
        console.log(error);
        if (error.response.status === 401) {
          window.location.href = "/";
        }
      }
    };
    fetchTransactions();
  }, []);

  function updateT() {
    // const fetchTransactions = async () => {
    //   try {
    //     const response = await api.get(`/transaction${filterResults}`);
    //     setTRANSFERENCIAS(response.data);
    //   } catch (error: any) {
    //     console.log(error);
    //     if (error.response.status === 401) {
    //       window.location.href = "/";
    //     }
    //   }
    // };
    // fetchTransactions();
  }

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
        // exp.test(tr.username.toUpperCase()) ||
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

  const getTransactionType = (transaction: any) => {
    if (transaction["creditedAccount"])
      return <img src={RECEBIDO} alt="" width="44px" height="43px" />;
    return <img src={ENVIADO} alt="" width="44px" height="43px" />;
  };

  const getUsername = (transaction: any): string => {
    if (transaction["creditedAccount"])
      return transaction.creditedAccount.username;
    return transaction.debitedAccount.username;
  };

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
          <TransferenciaHeader>
            <P>Últimas Transferências</P>
            <FilterPopper
              filterResults={setFilterResults}
              updateT={updateT()}
            ></FilterPopper>
          </TransferenciaHeader>
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
                  {e?.creditedAccount
                    ? getTransactionType(e)
                    : getTransactionType(e)}
                </TRicon>
                <TRdados>
                  <TRhead>
                    <div>
                      {e?.creditedAccount
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
                    {e?.creditedAccount ? getUsername(e) : getUsername(e)}
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
