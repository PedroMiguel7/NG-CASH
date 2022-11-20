import { useState } from "react";
import api from "../../services/api";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ButtonSignup, IMGPORCO } from "./styles";
import porco from "../../../assets/imgs/porquinho_limpo.png";
import ngcard from "../../../assets/svgs/ngcard.svg";

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
  left: "75%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FCFCFC",
  borderRadius: 2,
  boxShadow: 24,
  p: 5,
  minWidth: "400px",
  width: "25vw",
  height: "80vh",
};

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const CreateUser = (e: any) => {
    e.preventDefault();
    api
      .post("/user", {
        username: username,
        password: password,
      })
      .then((res: any) => {
        const fetchLogin = async () => {
          api
            .post("/login", {
              username: username,
              password: password,
            })
            .then((res: any) => {
              const fetchToken = async () => {
                try {
                  localStorage.setItem("token", JSON.stringify(res.data.token));
                  localStorage.setItem("acess", JSON.stringify("true"));
                } catch (error) {
                  console.log(error);
                }
                window.location.href = "/home";
              };
              fetchToken();
            })
            .catch((err: any) => alert(err));
        };
        fetchLogin();
      })
      .catch((err: any) => alert(err));
  };

  return (
    <div className="Fundo2" id="Fundo">
      <Box sx={style}>
        <IMGPORCO>
          <img src={porco} alt="" height="180px"/>
        </IMGPORCO>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-center order-1"
          >
            SIG<span style={{ color: "var(--corBotao)" }}>NUP</span>
          </Typography>
        </div>

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
            id="password"
            name="password"
            label="password"
            value={password}
            onChange={(f: any) => [setPassword(f.target.value), setError("")]}
            variant="outlined"
            margin="dense"
            fullWidth
            className="textField"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <CssTextField
            required
            id="password"
            name="password"
            label="Confirm your password"
            value={confirmpassword}
            onChange={(p: any) => [
              setConfirmpassword(p.target.value),
              setError(""),
            ]}
            variant="outlined"
            margin="dense"
            fullWidth
            className="textField"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <ButtonSignup>
            <Button
              style={{
                color: "#F4F5FA",
                background: "var(--corBotao)",
                textTransform: "capitalize",
                boxShadow: "none",
              }}
              id="button"
              variant="contained"
              type="submit"
              onClick={(e: any) => CreateUser(e)}
            >
              CREATE ACCOUNT
            </Button>
          </ButtonSignup>
        </form>
      </Box>
      <img src={ngcard} alt="" />
    </div>
  );
}
