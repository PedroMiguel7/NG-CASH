import { Paper, Twobuttons } from "./styles";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import api from "../../services/api";
import { useState } from "react";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    color: "black",
    svg: { color: "black" },
    "&.Mui-focused": {
      borderColor: "black",
      svg: { color: "var(--corBotao)" },
    },
    "& fieldset": {
      borderColor: "black",
      borderRadius: 5,
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--corBotao)",
    },
  },
  ".MuiInputLabel-outlined": {
    color: "black",
    "&.Mui-focused": {
      color: "var(--corBotao)",
    },
  },
});

function Transaction(props: any) {
  const [username, setUsername] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const transferir = (e: any) => {
    e.preventDefault();
    api
      .post(`/Transaction/${props.userid}`, {
        accountId: `${props.accountid}`,
        usernameIN: username,
        value: value,
      })
      .then((res: any) => {})
      .catch((err: any) => alert(err));
  };
  return (
    <Paper>
      <h2 id="simple-modal-title">FAZER NOVA TRANSAÇÃO</h2>
      <form>
        <CssTextField
          required
          id="username"
          name="username"
          label="username"
          value={username}
          onChange={(e: any) => [setUsername(e.target.value), setError("")]}
          variant="outlined"
          margin="dense"
          fullWidth
          className="textField"
          type="text"
        />
        <CssTextField
          required
          id="username"
          name="username"
          label="valor"
          value={value}
          onChange={(e: any) => [setValue(e.target.value), setError("")]}
          variant="outlined"
          margin="dense"
          fullWidth
          className="textField"
          type="text"
        />
        <Twobuttons>
          <Button
            style={{
              color: "#F4F5FA",
              width: "45%",
              background: "var(--corBotao)",
              textTransform: "capitalize",
              boxShadow: "none",
            }}
            id="button"
            variant="contained"
            type="submit"
            onClick={(e: any) => transferir(e)}
          >
            ENVIAR
          </Button>
          <Button
            style={{
              color: "#F4F5FA",
              background: "var(--corBotao)",
              textTransform: "capitalize",
              width: "45%",
              boxShadow: "none",
            }}
            id="button"
            variant="contained"
            type="submit"
          >
            CANCELAR
          </Button>
        </Twobuttons>
      </form>
    </Paper>
  );
}

export default Transaction;
