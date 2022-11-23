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
import TextField from "@mui/material/TextField";
import { Filtros, FiltrosContainer, FiltrosHeader } from "./styles";

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
    setValue(new Date());
    setValue2(new Date("1998-10-09"));
    setCheckedFA(true);
    setCheckedAN(true);
    setCheckedCO(true);
  };

  const CheckboxStyle = styled(Checkbox)({
    color: "black",
    "&.Mui-checked": {
      color: "#05FE3E",
    },
  });

  const [checkedFA, setCheckedFA] = React.useState(true);
  const handleChangeFA = (evento: any) => {
    setCheckedFA(evento.target.checked);
  };

  const [checkedAN, setCheckedAN] = React.useState(true);
  const handleChangeAN = (evento: any) => {
    setCheckedAN(evento.target.checked);
  };

  const [checkedCO, setCheckedCO] = React.useState(true);
  const handleChangeCO = (evento: any) => {
    setCheckedCO(evento.target.checked);
  };

  const [value, setValue] = React.useState(new Date());
  //const [value2, setValue2] = React.useState('1998-10-09');
  const [value2, setValue2] = React.useState(new Date("1998-10-09"));

  var projetos = props.PROJETOS;

  function Filtrar() {
    projetos = props.PROJETOS;
    var elementos: string[] = [];
    if (checkedAN === true) {
      elementos.push("Em Andamento");
    }
    if (checkedFA === true) {
      elementos.push("A Fazer");
    }
    if (checkedCO === true) {
      elementos.push("Concluido");
    }
    if (elementos !== null) {
      var novadata1 =
        value2.getFullYear() +
        "-" +
        "0" +
        (value2.getMonth() + 1) +
        "-" +
        value2.getDate();
      var novadata =
        value.getFullYear() +
        "-" +
        "0" +
        (value.getMonth() + 1) +
        "-" +
        value.getDate();

      props.SET(
        projetos?.filter(
          (Projetos: any) =>
            elementos.includes(Projetos.status) &&
            Projetos.data_criacao.slice(0, 10) >= novadata1 &&
            Projetos.data_criacao.slice(0, 10) <= novadata
        )
      );

      handleClose();
    } else {
      props.SET(projetos);
    }
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
                maxWidth: "490px",
                border: "2px solid",
                borderColor: "black",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  mt: "10px",
                  "&::before": {
                    backgroundColor: "#494A58",
                    content: '""',
                    display: "block",
                    position: "absolute",
                    width: 12,
                    height: 12,
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
                        checked={checkedFA}
                        onChange={handleChangeFA}
                        control={<CheckboxStyle defaultChecked size="small" />}
                        label="CASH-IN"
                        id="AFAZER"
                      />
                      <FormControlLabel
                        checked={checkedAN}
                        onChange={handleChangeAN}
                        control={<CheckboxStyle defaultChecked size="small" />}
                        label="CASH-OUT"
                        id="EMANDAMENTO"
                      />    
                    </FormGroup>
                  </FiltrosContainer>
                  <div className="d-flex align-items-center mb-2">
                    <span className="me-5 PopperTitle">ORDER</span>
                    <FormGroup className="PopperOptions d-flex flex-row gap-2">
                      <FormControlLabel
                        checked={checkedFA}
                        onChange={handleChangeFA}
                        control={<CheckboxStyle defaultChecked size="small" />}
                        label="ID"
                        id="AFAZER"
                      />
                      <FormControlLabel
                        checked={checkedAN}
                        onChange={handleChangeAN}
                        control={<CheckboxStyle defaultChecked size="small" />}
                        label="VALOR"
                        id="EMANDAMENTO"
                      />
                      <FormControlLabel
                        checked={checkedCO}
                        onChange={handleChangeCO}
                        control={<CheckboxStyle defaultChecked size="small" />}
                        label="DATA"
                        id="CONCLUIDO"
                      />
                    </FormGroup>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <span className="me-5 PopperTitle">ORDER</span>
                    <FormGroup className="PopperOptions d-flex flex-row gap-2">
                      <FormControlLabel
                        checked={checkedFA}
                        onChange={handleChangeFA}
                        control={<CheckboxStyle defaultChecked size="small" />}
                        label="CRESCENTE"
                        id="AFAZER"
                      />
                      <FormControlLabel
                        checked={checkedAN}
                        onChange={handleChangeAN}
                        control={<CheckboxStyle defaultChecked size="small" />}
                        label="DECRESCENTE"
                        id="EMANDAMENTO"
                      />
                    </FormGroup>
                  </div>
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
                    Limpar Filtros
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
