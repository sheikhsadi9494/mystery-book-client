import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import Grid from '@mui/material/Grid';

const Login = () => {
  const [loginData, setLoginData] = useState([]);
  const { user, login, authError, isLoading, signInWithGoogle } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
    e.preventDefault();
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(loginData.email, loginData.password, location, navigate);
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    signInWithGoogle(location, navigate);
  };

  return (
    <Container sx={{pt: 10}}>
      {/* <Box sx={{alignContents: 'center'}}> */}
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
        <Grid item xs={12} lg={5}>
        <Paper
          sx={{
            width: "85%",
            mx: "auto",
            padding: "20px",
            borderRadius: "5px",
          }}
          elevation={3}
        >
            <form onSubmit={handleLoginSubmit}>
              <TextField
                sx={{ width: "100%" }}
                label="Email"
                type="email"
                name="email"
                onBlur={handleOnChange}
                variant="standard"
              />{" "}
              <br />
              <TextField
                sx={{ width: "100%" }}
                label="Password"
                type="password"
                name="password"
                onBlur={handleOnChange}
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
                  Login
                </Button>
              </Box>
            </form>
          <p style={{ textAlign: "center" }}>
            dont have an account ? <Link to="/register">register</Link>
          </p>
        </Paper>
        <p
            style={{
              textAlign: "center",
              marginTop: "50px",
              marginBottom: "15px",
            }}
          >
            -------- or --------
          </p>
        <Box sx={{width: '60%', mx: 'auto'}}>
            <Button
              onClick={handleGoogleSignIn}
              color="warning"
              type="submit"
              sx={{ width: "100%", fontWeight: 'bold'}}
              variant="contained"
            >
              Signin With Google
            </Button>
          </Box>
        </Grid>
        <Box sx={{width: '10%', mx: 'auto', my: 2}}>
            {isLoading && <CircularProgress />}
            </Box>
      </Grid>
      {authError && <Alert sx={{mt: 4, width: '50%', mx: 'auto'}} severity="error">{authError}</Alert>}
      {/* </Box> */}
    </Container>
  );
};

export default Login;
