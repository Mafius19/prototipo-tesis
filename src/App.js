import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { FormControl, InputLabel, Input, FormHelperText, Paper, Card, CardContent, Typography, CardActions, Button, Grid, TextField, Tooltip, IconButton, tooltipClasses, Modal, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SendIcon from '@mui/icons-material/Send';
import { Container } from '@mui/system';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import information from './data/information.json';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';

function App() {
  // datoEjemplo para cargar el time
  // const [currentTime, setCurrentTime] = useState(0);
  // useStates de los campos del formulario
  const [newVisitor, setNewVisitor] = useState(null);
  const [administrativeP, setAdministrativeP] = useState(null);
  const [administrativeTime, setAdministrativeTime] = useState(null);
  const [informational, setInformational] = useState(null);
  const [productRelated, setProductRelated] = useState(null);
  const [productRelatedDuration, setProductRelatedDuration] = useState(null);
  const [bounceRates, setBounceRates] = useState(null);
  const [exitRates, setExitRates] = useState(null);
  const [pageValues, setPageValues] = useState(null);
  // glosario para la informacion de cada campo a completar
  const { tooltip_info } = information
  //loader del boton estimar
  const [loading, setLoading] = useState(false);
  // variables para gestionar el modal de la respuesta de prediccion
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // Variable que contendra la respuesta de estimacion
  const [estimacion, setEstimacion] = useState(null);

  const allFieldCompleted = () => {
    console.log('aqui')
    if (newVisitor !== null &&
      administrativeP &&
      administrativeTime &&
      informational &&
      productRelated &&
      productRelatedDuration &&
      bounceRates &&
      exitRates &&
      pageValues
    ) {
      return false;
    } else {
      return true
    }
  }
  // codigo ejemplo para cargar el tiempo time
  // useEffect(() => {
  //   fetch('/time').then(res => res.json()).then(data => {
  //     console.log(data)
  //     setCurrentTime(data.time);
  //   });
  // }, []);

  // useEffect(() => {
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ title: 'React Hooks POST Request Example' })
  // };
  // fetch('/predict', requestOptions)
  //     .then(response => response.json())
  //     .then(data => console.log(data));
  // }, []);

  const empezarEstimacion = () => {
    setLoading(true)
    setTimeout(function(){
    setLoading(false)
    estimar()
  }, 1500);
}

  const estimar = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          newVisitor: newVisitor,
          administrativeP: administrativeP,
          administrativeTime: administrativeTime,
          informational: informational,
          productRelated: productRelated,
          productRelatedDuration: productRelatedDuration,
          bounceRates: bounceRates,
          exitRates: exitRates,
          pageValues: pageValues
        })
    };
    fetch('/predict', requestOptions)
      .then(response => response.json())
      .then(data => {
        setEstimacion(data)
        handleOpen()
      });
  }

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.info.light,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.info.light,
    },
  }));

  return (
    <div >
      <Container>
        {/* una unidad es equivalente a 8px */}
        <Paper elevation={8} sx={{ width: '80%', mt: 4, p: 3, mb: 4 }}>
          <Typography variant="h2" sx={{ mb: 4 }}>
            Sitema Predictor de Comprador Efectivo
          </Typography>
          {/* <p>The current time is {currentTime}.</p> */}
          <Grid container spacing={2} sx={{ mt: 4 }}>
            {/* New_Visitor */}
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="button" >
                    ¿Es un visitante nuevo?
                    <BootstrapTooltip TransitionProps={{ timeout: 600 }} title={tooltip_info.new_visitor} placement="right">
                      <IconButton >
                        <InfoOutlinedIcon color="primary" />
                      </IconButton>
                    </BootstrapTooltip>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <FormControl
                    variant="outlined"
                    size="small"
                    sx={{ width: '40px', mr: 4, }}
                  >
                    <Button variant={newVisitor ? "contained" : "outlined"} color="success" onClick={() => setNewVisitor(true)}>
                      SI
                    </Button>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    size="small"
                    sx={{ width: '40px', mr: 4, }}
                  >
                    <Button variant={newVisitor === false ? "contained" : "outlined"} color="error" onClick={() => setNewVisitor(false)}>
                      NO
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            {/* Administrative */}
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="button" >
                    Páginas administrativas visitadas
                    <BootstrapTooltip TransitionProps={{ timeout: 600 }} title={tooltip_info.administrative} placement="right">
                      <IconButton >
                        <InfoOutlinedIcon color="primary" />
                      </IconButton>
                    </BootstrapTooltip>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <FormControl
                    variant="outlined"
                    size="small"
                    fullWidth
                  >
                    <TextField
                      required
                      size="small"
                      id="inputPersonalData"
                      name="administrativeP"
                      value={administrativeP}
                      onChange={(e) => setAdministrativeP(e.target.value)}
                      variant="standard"
                      color="primary"
                    />
                  </FormControl>
                  {/* {validatePersonalData &&
											(EmpleadoSelected.distancia_trabajo === null ||
												EmpleadoSelected.distancia_trabajo === '') && (
												<InputLabel className={classes.errorText}>
													{validateData.distancia_trabajo}
												</InputLabel>
											)}
										{isNaN(EmpleadoSelected.distancia_trabajo) && (
											<InputLabel className={classes.errorText}>
												{validateData.distancia_trabajo_invalid_type}
											</InputLabel>
										)} */}
                </Grid>
              </Grid>
            </Grid>
            {/* Administrative_Duration */}
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="button" >
                    Tiempo dedicado en las paginas administrativas (minutos)
                    <BootstrapTooltip TransitionProps={{ timeout: 600 }} title={tooltip_info.administrative_duration} placement="right">
                      <IconButton >
                        <InfoOutlinedIcon color="primary" />
                      </IconButton>
                    </BootstrapTooltip>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <FormControl
                    variant="outlined"
                    size="small"
                    fullWidth
                  >
                    <TextField
                      required
                      size="small"
                      id="inputPersonalData"
                      name="administrativeTime"
                      value={administrativeTime}
                      onChange={(e) => setAdministrativeTime(e.target.value)}
                      variant="standard"
                      color="primary"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            {/* Informational */}
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="button" >
                    Paginas informativas visitadas
                    <BootstrapTooltip TransitionProps={{ timeout: 600 }} title={tooltip_info.informational} placement="right">
                      <IconButton >
                        <InfoOutlinedIcon color="primary" />
                      </IconButton>
                    </BootstrapTooltip>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <FormControl
                    variant="outlined"
                    size="small"
                    fullWidth
                  >
                    <TextField
                      required
                      size="small"
                      id="inputPersonalData"
                      name="informational"
                      value={informational}
                      onChange={(e) => setInformational(e.target.value)}
                      variant="standard"
                      color="primary"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            {/* ProductRelated */}
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="button" >
                    Paginas relacionadas al producto visitadas
                    <BootstrapTooltip TransitionProps={{ timeout: 600 }} title={tooltip_info.product_related} placement="right">
                      <IconButton >
                        <InfoOutlinedIcon color="primary" />
                      </IconButton>
                    </BootstrapTooltip>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <FormControl
                    variant="outlined"
                    size="small"
                    fullWidth
                  >
                    <TextField
                      required
                      size="small"
                      id="inputPersonalData"
                      name="productRelated"
                      value={productRelated}
                      onChange={(e) => setProductRelated(e.target.value)}
                      variant="standard"
                      color="primary"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            {/* ProductRelated_Duration */}
            <Grid item xs={12}>
              <Grid container spacing={1} >
                <Grid item xs={12}>
                  <Typography variant="button" >
                    Tiempo dedicado a páginas relacionadas al producto (minutos).
                    <BootstrapTooltip TransitionProps={{ timeout: 600 }} title={tooltip_info.product_related_duration} placement="right">
                      <IconButton >
                        <InfoOutlinedIcon color="primary" />
                      </IconButton>
                    </BootstrapTooltip>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <FormControl
                    variant="outlined"
                    size="small"
                    fullWidth
                  >
                    <TextField
                      //label="Observación"
                      required
                      size="small"
                      id="inputPersonalData"
                      name="productRelatedDuration"
                      value={productRelatedDuration}
                      onChange={(e) => setProductRelatedDuration(e.target.value)}
                      variant="standard"
                      color="primary"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            {/* BounceRates */}
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="button" >
                    Ratio de saltos
                    <BootstrapTooltip TransitionProps={{ timeout: 600 }} title={tooltip_info.bounce_rates} placement="right">
                      <IconButton >
                        <InfoOutlinedIcon color="primary" />
                      </IconButton>
                    </BootstrapTooltip>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <FormControl
                    variant="outlined"
                    size="small"
                    fullWidth
                  >
                    <TextField
                      required
                      size="small"
                      id="inputPersonalData"
                      name="bounceRates"
                      value={bounceRates}
                      onChange={(e) => setBounceRates(e.target.value)}
                      variant="standard"
                      color="primary"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            {/* ExitRates */}
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="button" >
                    Ratio de salida
                    <BootstrapTooltip TransitionProps={{ timeout: 600 }} title={tooltip_info.exit_rates} placement="right">
                      <IconButton >
                        <InfoOutlinedIcon color="primary" />
                      </IconButton>
                    </BootstrapTooltip>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <FormControl
                    variant="outlined"
                    size="small"
                    fullWidth
                  >
                    <TextField
                      required
                      size="small"
                      id="inputPersonalData"
                      name="exitRates"
                      value={exitRates}
                      onChange={(e) => setExitRates(e.target.value)}
                      variant="standard"
                      color="primary"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            {/* PageValues */}
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="button" >
                    Valor de pagina
                    <BootstrapTooltip TransitionProps={{ timeout: 600 }} title={tooltip_info.page_values} placement="right">
                      <IconButton >
                        <InfoOutlinedIcon color="primary" />
                      </IconButton>
                    </BootstrapTooltip>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <FormControl
                    variant="outlined"
                    size="small"
                    fullWidth
                  >
                    <TextField
                      required
                      size="small"
                      id="inputPersonalData"
                      name="pageValues"
                      value={pageValues}
                      onChange={(e) => setPageValues(e.target.value)}
                      variant="standard"
                      color="primary"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            {/* Estimar */}
            <Grid item xs={12}>
              <Grid container spacing={1} justifyContent="flex-end">
                <FormControl
                  variant="outlined"
                  size="small"
                >
                  <LoadingButton
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={() => empezarEstimacion()}
                    disabled={allFieldCompleted()}
                    sx={{ width: '150px', mr: 4, mt: 4 }}
                    loading={loading}
                    // loadingIndicator="Estimando…"
                    loadingPosition="end"
                  >
                    Estimar
                  </LoadingButton>

                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} style={estimacion? {backgroundColor:"#77DD77"}:{backgroundColor:"#EB0014"}}>
            {estimacion? 
            (
              <div style={{fontSize: 88, display:'flex', flexDirection: "column", alignItems:"center" }}>
                <CheckCircleOutlineIcon style={{color:"#ffff"}} fontSize="inherit"/>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:"#ffffff"}}>
                  El usuario será un comprador efectivo.
                </Typography>
              </div>
            )
            : 
            (
              <div style={{fontSize: 88, display:'flex', flexDirection: "column", alignItems:"center" }}>
                <ErrorIcon style={{color:"#ffff"}} fontSize="inherit"/>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:"#ffffff"}}>
                  El usuario no será un comprador efectivo.
                </Typography>
              </div>
            )}
            
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
          </Box>
        </Modal>
        <div><br /></div>
      </Container>
    </div>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};
export default App;
