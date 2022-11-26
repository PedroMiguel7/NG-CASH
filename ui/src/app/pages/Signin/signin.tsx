import { useState } from "react";
import api from "../../services/api";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Twobuttons } from "./styles";
import logowhite from "../../../assets/svgs/logo_white.svg";
import logo_cao from "../../../assets/svgs/cao.svg";

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
  left: "25%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FCFCFC",
  borderRadius: 2,
  boxShadow: 24,
  p: 5,
  minWidth: "400px",
  width: "25vw",
  height: "65vh",
};

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const Logar = (e: any) => {
    e.preventDefault();
    api
      .post("/login", {
        username: username,
        password: password,
      })
      .then((res: any) => {
        const fetchToken = async () => {
          try {
            localStorage.setItem("token", JSON.stringify(res.data.token));
          } catch (error) {
            console.log(error);
          }
          setTimeout(() => (window.location.href = "/home"), 500);
        };
        fetchToken();
      })
      .catch((err: any) => alert(err));
  };

  return (
    <div className="Fundo">
      <Box sx={style}>
        <img src={logowhite} />
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="OcuparEspaco"></div>
          <div className="ClearRoundedIcon order-2" />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-center order-1"
          >
            LOG<span style={{ color: "var(--corBotao)" }}>IN</span>
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
            size="small"
            className="textField"
            type="text"
          />
          <CssTextField
            required
            id="password"
            name="password"
            label="password"
            size="small"
            value={password}
            onChange={(e: any) => [setPassword(e.target.value), setError("")]}
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
              onClick={(e: any) => Logar(e)}
            >
              LOGIN
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
              onClick={() => (window.location.href = "/signup")}
            >
              SIGNUP
            </Button>
          </Twobuttons>
        </form>
      </Box>
      <img src={logo_cao} alt="" height="100%" width="100%" />
    </div>
  );
}

export default Signin;
