import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";

const Register = () => {
  const [registerData, setRegisterData] = useState([]);
  const { register, isLoading, user, authError, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newRegisterData = { ...registerData };
    newRegisterData[field] = value;
    setRegisterData(newRegisterData);
    e.preventDefault();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.password2) {
      alert("password did not match");
      return;
    }
    register(
      registerData.email,
      registerData.password,
      registerData.img,
      registerData.name,
      navigate
    );
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    signInWithGoogle(navigate);
  };

  return (
    <Container  sx={{pt: 10}}>
      <Grid sx={{alignItems: 'center', justifyContent: 'space-evenly'}} container spacing={2}>
        <Grid item xs={12} lg={6}>
        <Box sx={{mx: 1, mb: 4}}>
          <Typography
            color="primary"
            sx={{ fontWeight: "bold"}}
            variant="h3"
            gutterBottom
            component="div"
          >
            mysterybook
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
          >
            Mysterybook helps you connect and share with the people in your life.
          </Typography>
        </Box>
        </Grid>
        <Grid item xs={12} md={5}>
        <Paper
          sx={{
            width: "85%",
            mx: "auto",
            padding: "20px",
            borderRadius: "5px",
          }}
          elevation={3}
        >
          <form onSubmit={handleRegisterSubmit}>
            <TextField
              sx={{ width: "100%" }}
              label="Name"
              type="text"
              name="name"
              onBlur={handleOnBlur}
              variant="standard"
            />
            <TextField
              sx={{ width: "100%" }}
              label="Photo Url"
              type="text"
              name="img"
              onBlur={handleOnBlur}
              variant="standard"
            />
            <TextField
              sx={{ width: "100%" }}
              label="Email"
              type="email"
              name="email"
              onBlur={handleOnBlur}
              variant="standard"
            />
            <TextField
              sx={{ width: "100%" }}
              label="Password"
              type="password"
              name="password"
              onBlur={handleOnBlur}
              variant="standard"
            />
            <TextField
              sx={{ width: "100%" }}
              label="Retype Your Password"
              type="password"
              name="password2"
              onBlur={handleOnBlur}
              variant="standard"
            />
            <Box>
              <Button
                type="submit"
                sx={{
                  width: "100%",
                  marginY: "10px",
                  fontWeight: 'bold'
                }}
                variant="contained"
              >
                Register
              </Button>
            </Box>
          </form>
        <p style={{ textAlign: "center" }}>
          already have an account ? please <Link to="/login">login</Link>
        </p>
      </Paper>
      <p
          style={{
            textAlign: "center",
            marginTop: "30px",
            marginBottom: "15px",
          }}
        >
          -------- or --------
        </p>
        <Box sx={{ my: "10px", width: '90%', mx:'auto'}}>
          <Button
            onClick={handleGoogleSignIn}
            color="warning"
            type="submit"
            sx={{ width: "100%", fontWeight: 'bold'}}
            variant="contained"
          >
            Sign in With Google
          </Button>
        </Box>
        </Grid>
        <Box sx={{width: '10%', mx: 'auto', my: 2}}>
            {isLoading && <CircularProgress />}
            </Box>
      </Grid>
      {authError && <Alert sx={{mt: 4, width: '50%', mx: 'auto'}} severity="error">{authError}</Alert>}
    </Container>
  );
};

export default Register;
