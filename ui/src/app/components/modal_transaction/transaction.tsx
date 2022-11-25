import { Twobuttons } from "./styles";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Modal from "@material-ui/core/Modal";
import api from "../../services/api";
import { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Box, Typography } from "@material-ui/core";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FCFCFC",
  borderRadius: 2,
  boxShadow: 24,
  p: 10,
  minWidth: "400px",
  width: "40vw",
  height: "40vh",
  border: "2px solid #000",
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Transaction() {
  const [usernameT, setUsernameT] = useState("");
  const [value, setValue] = useState();
  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openAlertError, setOpenAlertError] = useState(false);
  const handleCloseAlertError = () => {
    setOpenAlertError(false);
  };

  const [openAlert, setOpenAlert] = useState(false);
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const transferir = (e: any) => {
    e.preventDefault();
    api
      .post(`/Transaction`, {
        usernameIN: usernameT,
        value: value,
      })
      .then((res: any) => {
        setOpenAlert(true);
        setOpen(false);
      })
      .catch((err: any) => {
        setOpenAlertError(true);
        setError(err.message);
      });
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
        {
          <>
            <Box sx={style}>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  className="text-center order-1"
                >
                  FAZER NOVA TRANSAÇÃO
                </Typography>
              </div>
              <form>
                <CssTextField
                  required
                  id="usernameT"
                  name="usernameT"
                  label="username"
                  value={usernameT}
                  onChange={(p: any) => [
                    setUsernameT(p.target.value),
                    setError(""),
                  ]}
                  variant="outlined"
                  type="text"
                  multiline
                  size="small"
                  margin="dense"
                  fullWidth
                  className="textField"
                />
                <CssTextField
                  required
                  id="valor"
                  size="small"
                  name="valor"
                  label="valor"
                  value={value}
                  onChange={(f: any) => [
                    setValue(f.target.value),
                    setError(""),
                  ]}
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  className="textField"
                  type="number"
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
            </Box>
          </>
        }
      </Modal>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openAlertError}
        autoHideDuration={6000}
        onClose={handleCloseAlertError}
      >
        <Alert onClose={handleCloseAlertError} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Transaction;
