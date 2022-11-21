import { Paper, Twobuttons } from "./styles";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Modal from "@material-ui/core/Modal";
import api from "../../services/api";
import { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

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

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Transaction() {
  const [username, setUsername] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const transferir = (e: any) => {
    e.preventDefault();
    api
      .post(`/Transaction`, {
        usernameIN: username,
        value: value,
      })
      .then((res: any) => {
        setOpenAlert(true);
        setOpen(false);
      })
      .catch((err: any) => alert(err));
  };

  const Body = () => {
    return (
      <>
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
              id="valor"
              name="valor"
              label="valor"
              value={value}
              onChange={(f: any) => [setValue(f.target.value), setError("")]}
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
                  background: "#7431F4",
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
                onClick={() => setOpen(false)}
              >
                CANCELAR
              </Button>
            </Twobuttons>
          </form>
        </Paper>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            This is a success message!
          </Alert>
        </Snackbar>
      </>
    );
  };

  return (
    <>
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
        {<Body></Body>}
      </Modal>
    </>
  );
}

export default Transaction;
