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
import { P } from "./styles";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    color: "#F4F5FA",
    svg: { color: "#F4F5FA" },
    "&.Mui-focused": {
      borderColor: "#F4F5FA",
      svg: { color: "var(--corBotao)" },
    },
    "& fieldset": {
      borderColor: "#F4F5FA",
      borderRadius: 5,
    },
    "&:hover fieldset": {
      borderColor: "#C2C3C6",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--corBotao)",
    },
  },
  ".MuiInputLabel-outlined": {
    color: "#F4F5FA",
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
  bgcolor: "#21222D",
  borderRadius: 2,
  boxShadow: 24,
  p: 5,
  minWidth: "400px",
  width: "25vw",
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
    <Box sx={style}>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="OcuparEspaco"></div>
        <div className="ClearRoundedIcon order-2" />
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="text-center order-1"
        >
           <P>SIG<span style={{ color: "var(--corBotao)" }}>NUP</span></P>
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
        <CssTextField
          required
          id="password"
          name="password"
          label="Confirm your password"
          value={confirmpassword}
          onChange={(e: any) => [setConfirmpassword(e.target.value), setError("")]}
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
        <div className="d-flex justify-content-space-between mt-5">
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
        </div>
      </form>
    </Box>
  );
}
