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
import Modal from "@material-ui/core/Modal";
import Button from "@mui/material/Button";
import SearchIcon from "@material-ui/icons/Search";
import RECEBIDO from "../../../assets/svgs/money+recebido.svg";
import ENVIADO from "../../../assets/svgs/money+enviado.svg";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Transaction from "../../components/modal_transaction/transaction";
import SideBar from "../../components/Sidebar/sidebar";

export default function Home() {
  const token: any = localStorage.getItem("token");

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

  const [TRANSFERENCIAS, setTRANSFERENCIAS] = useState([
    {
      id: 1,
      debitedAccountId: 1,
      creditedAccountId: 2,
      value: 5.76,
      createdAt: "2022-11-17 13:12:18 +0000",
    },
    {
      id: 5,
      debitedAccountId: 2,
      creditedAccountId: 1,
      value: 125.76,
      createdAt: "2022-11-17 15:12:18 +0000",
    },
    {
      id: 2,
      debitedAccountId: 1,
      creditedAccountId: 2,
      value: 65.76,
      createdAt: "2022-11-17 15:12:18 +0000",
    },
    {
      id: 4,
      debitedAccountId: 2,
      creditedAccountId: 1,
      value: 15.7,
      createdAt: "2022-10-18 13:12:18 +0000",
    },
  ]);

  const fetchTransactions = async () => {
    try {
      const response = await api.get(`/Transaction/${user?.id}`);
      setTRANSFERENCIAS(response.data);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        window.location.href = "/";
      }
    }
  };

  const fetchAccount = async () => {
    try {
      const response = await api.get(`/user/${user?.id}`);
      setUser(response.data);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        window.location.href = "/";
      }
    }
  };

  const usernametransaction = (e: any) => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/user/${e}/idaccount`);
        return response.data.accountId;
      } catch (error: any) {
        console.log(error);
        if (error.response.status === 401) {
          window.location.href = "/";
        }
      }
    };
    fetchUser();
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
      (tr) =>
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

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (user) {
    return (
      <Container>
        {/* {SideBar} */}
        <HomeContainer>
          <Header>
            <H>Olá, {user?.username}</H>
            <Saldo> SALDO: R${user.account.balance}</Saldo>
          </Header>
          <NEWTr>
            <Button
              style={{
                color: "#F4F5FA",
                width: "25%",
                background: "#7431F4",
                textTransform: "capitalize",
                boxShadow: "none",
              }}
              id="button"
              variant="contained"
              type="submit"
              onClick={handleOpen}
            >
              Transferir
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {<Transaction></Transaction>}
            </Modal>
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
              <>sem transferencia</>
            )}
          </Transferencias>
        </HomeContainer>
      </Container>
    );
  } else {
    return <>sem user</>;
  }
}
