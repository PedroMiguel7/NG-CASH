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
import { useJwt } from "react-jwt";
import { InputBase } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Button from "@mui/material/Button";
import SearchIcon from "@material-ui/icons/Search";
import RECEBIDO from "../../../assets/svgs/money+recebido.svg";
import ENVIADO from "../../../assets/svgs/money+enviado.svg";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Transaction from "../../components/modal_transaction/transaction";

export default function Home(Sidebar: any) {
  const token: any = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "token";
  const { decodedToken, isExpired, reEvaluateToken } = useJwt(token);
  const userId: any = decodedToken;
  const userName: any = decodedToken;
  const [user, setUser] = useState([]);

  const [TRANSFERENCIAS, setTRANSFERENCIAS] = useState([
    {
      id: 1,
      debitedAccountId: 1,
      creditedAccountId: 2,
      usernameTransaction: "adm2",
      value: 5.76,
      createdAt: "2022-11-17 13:12:18 +0000",
    },
    {
      id: 5,
      debitedAccountId: 2,
      creditedAccountId: 1,
      usernameTransaction: "radm23",
      value: 125.76,
      createdAt: "2022-11-17 15:12:18 +0000",
    },
    {
      id: 2,
      debitedAccountId: 1,
      creditedAccountId: 2,
      usernameTransaction: "b123",
      value: 65.76,
      createdAt: "2022-11-17 15:12:18 +0000",
    },
    {
      id: 4,
      debitedAccountId: 2,
      creditedAccountId: 1,
      usernameTransaction: "adm2",
      value: 15.7,
      createdAt: "2022-10-18 13:12:18 +0000",
    },
  ]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get(`/Transaction/${userId}/`);
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
        const response = await api.get(`/user/${userId}/`);
        setUser(response.data);
      } catch (error: any) {
        console.log(error);
        if (error.response.status === 401) {
          window.location.href = "/";
        }
      }
    };
    fetchAccount();
  }, []);

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
        exp.test(tr.usernameTransaction.toUpperCase()) ||
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

  return (
    <Container>
      <div>{Sidebar}</div>
      <HomeContainer>
        <Header>
          <H>Olá, {userName}</H>
          <Saldo> SALDO: R${user}</Saldo>
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
