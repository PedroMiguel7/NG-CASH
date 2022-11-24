import { styled } from "@mui/material/styles";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { Box } from "@mui/system";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import * as React from "react";
import { Filtros, FiltrosContainer, FiltrosHeader } from "./styles";
import { Radio } from "@material-ui/core";

function FilterPopper(props: any) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement: any) => (event: any) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const [checkboxState, setUnchecked] = React.useState();

  const limpar = () => {
    setCheckedFCI(true);
    setCheckedFCO(true);
    setCheckedID(true);
    setCheckedVA(false);
    setCheckedDA(false);
    setCheckedCE(true);
    setCheckedDE(false);
  };

  const CheckboxStyle = styled(Radio)({
    color: "black",
    "&.Mui-checked": {
      color: "#7431F4",
    },
  });

  const CheckboxStyleFILTER = styled(Checkbox)({
    color: "black",
    "&.Mui-checked": {
      //   color: "#05FE3E",
      color: "#7431F4",
    },
  });

  // CHECK FILTER
  const [checkedFCI, setCheckedFCI] = React.useState(true);
  const handleChangeFCI = (evento: any) => {
    setCheckedFCI(evento.target.checked);
  };
  const [checkedFCO, setCheckedFCO] = React.useState(true);
  const handleChangeFCO = (evento: any) => {
    setCheckedFCO(evento.target.checked);
  };

  // CHECK TIPO
  const [checkedID, setCheckedID] = React.useState(true);
  const handleChangeID = (evento: any) => {
    setCheckedID(evento.target.checked);
    setCheckedVA(false);
    setCheckedDA(false);
  };
  const [checkedVA, setCheckedVA] = React.useState(false);
  const handleChangeVA = (evento: any) => {
    setCheckedVA(evento.target.checked);
    setCheckedID(false);
    setCheckedDA(false);
  };
  const [checkedDA, setCheckedDA] = React.useState(false);
  const handleChangeDA = (evento: any) => {
    setCheckedDA(evento.target.checked);
    setCheckedID(false);
    setCheckedVA(false);
  };

  // CHECK ORDER
  const [checkedCE, setCheckedCE] = React.useState(true);
  const handleChangeCE = (evento: any) => {
    setCheckedCE(evento.target.checked);
    setCheckedDE(false);
  };
  const [checkedDE, setCheckedDE] = React.useState(false);
  const handleChangeDE = (evento: any) => {
    setCheckedDE(evento.target.checked);
    setCheckedCE(false);
  };

  function Filtrar() {
    var elementos: string[] = [];
    if (checkedFCO === false || checkedFCI === false) {
      checkedFCI
        ? elementos.push("filter=cash-in")
        : elementos.push("filter=cash-out");
    }
    if (checkedID === true || checkedVA === true || checkedDA === true) {
      checkedID
        ? elementos.push("order=id")
        : checkedVA
        ? elementos.push("order=value")
        : elementos.push("order=date");
    }
    if (checkedCE === true || checkedDE === true) {
      checkedCE ? elementos.push("desc=false") : elementos.push("desc=true");
    }

    if (elementos.length === 1) {
      props.filterResults(`?${elementos[0]}`);
    } else if (elementos.length === 2) {
      props.filterResults(`?${elementos[0]}&${elementos[1]}`);
    } else if (elementos.length === 3) {
      props.filterResults(`?${elementos[0]}&${elementos[1]}&&${elementos[2]}`);
    }
    props.updateT();
    handleClose();
  }

  return (
    <div id="filtro">
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Paper
              sx={{
                mt: 1,
                p: 2,
                backgroundColor: "white",
                color: "black",
                minWidth: "200px",
                maxWidth: "590px",
                border: "2px solid",
                borderColor: "black",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  mt: "10px",
                  "&::before": {
                    backgroundColor: "#05FE3E",
                    content: '""',
                    display: "block",
                    position: "absolute",
                    width: 12,
                    height: 10,
                    top: -6,
                    transform: "rotate(45deg)",
                    left: "calc(94% - 13px)",
                  },
                }}
              />
              <div>
                <Filtros>
                  <FiltrosContainer>
                    <FiltrosHeader>
                      <span>FILTER</span>
                    </FiltrosHeader>
                    <FormGroup>
                      <FormControlLabel
                        checked={checkedFCI}
                        onChange={handleChangeFCI}
                        control={
                          <CheckboxStyleFILTER defaultChecked size="small" />
                        }
                        label="CASH-IN"
                        id="CASH-IN"
                      />
                      <FormControlLabel
                        checked={checkedFCO}
                        onChange={handleChangeFCO}
                        control={
                          <CheckboxStyleFILTER defaultChecked size="small" />
                        }
                        label="CASH-OUT"
                        id="CASH-OUT"
                      />
                    </FormGroup>
                  </FiltrosContainer>

                  <FiltrosContainer>
                    <FiltrosHeader>
                      <span>TIPO</span>
                    </FiltrosHeader>
                    <FormGroup>
                      <FormControlLabel
                        checked={checkedID}
                        onChange={handleChangeID}
                        control={<CheckboxStyle defaultChecked size="small" />}
                        label="ID"
                        id="ID"
                      />
                      <FormControlLabel
                        checked={checkedVA}
                        onChange={handleChangeVA}
                        control={<CheckboxStyle defaultChecked size="small" />}
                        label="VALOR"
                        id="VALOR"
                      />
                      <FormControlLabel
                        checked={checkedDA}
                        onChange={handleChangeDA}
                        control={<CheckboxStyle defaultChecked size="small" />}
                        label="DATA"
                        id="DATA"
                      />
                    </FormGroup>
                  </FiltrosContainer>
                  <FiltrosContainer>
                    <FiltrosHeader>
                      <span>ORDER</span>
                    </FiltrosHeader>
                    <FormGroup>
                      <FormControlLabel
                        checked={checkedCE}
                        onChange={handleChangeCE}
                        control={<CheckboxStyle defaultChecked size="small" />}
                        label="CRESCENTE"
                        id="CRESCENTE"
                      />
                      <FormControlLabel
                        checked={checkedDE}
                        onChange={handleChangeDE}
                        control={<CheckboxStyle defaultChecked size="small" />}
                        label="DECRESCENTE"
                        id="DECRESCENTE"
                      />
                    </FormGroup>
                  </FiltrosContainer>
                </Filtros>

                <Divider />

                <Divider />
                <div className="d-flex align-items-center justify-content-between mt-4">
                  <Button
                    style={{
                      color: "#F66E6E",
                      opacity: 0.7,
                      textTransform: "capitalize",
                    }}
                    variant="text"
                    className=""
                    onClick={() => limpar()}
                  >
                    Resetar Filtros
                  </Button>
                  <div className="d-flex align-items-center">
                    <Button
                      style={{
                        color: "#C2C3C6",
                        opacity: 0.5,
                        textTransform: "capitalize",
                      }}
                      variant="text"
                      className=""
                      onClick={handleClose}
                    >
                      Cancelar
                    </Button>
                    <Button
                      style={{
                        color: "#C2C3C6",
                        textTransform: "capitalize",
                      }}
                      variant="text"
                      id="salvarFiltro"
                      type="submit"
                      onClick={Filtrar}
                    >
                      Salvar
                    </Button>
                  </div>
                </div>
              </div>
            </Paper>
          </Fade>
        )}
      </Popper>
      <button onClick={handleClick("bottom-end")} className="filter px-2 py-1">
        <FilterAltIcon />
      </button>
    </div>
  );
}

export default FilterPopper;
