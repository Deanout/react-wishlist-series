import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Box, Button, Card, CardActions, CardContent, Container, Divider, FormControl, FormGroup, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { loginUser, resetErrorState } from "./sessionSlice";


function Login() {
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const errorMessages = useSelector((state: RootState) => state.session.errorMessages);
  const [errors, setErrors] = useState<Array<string>>([])
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const loading = false;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    emailRef?.current?.focus();
    if (errorMessages.length > 0) {
      setErrors(errorMessages);
      dispatch(resetErrorState());
    }
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors([]);
    if (emailRef?.current === undefined
      || emailRef.current.value === ""
      || passwordRef?.current === undefined
      || passwordRef.current.value === "") {
      return setErrors(["Please fill out all fields"])
    }
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    const response = await dispatch(loginUser(payload)) as any;
    console.log(response);
    if (errorMessages.length === 0) {
      navigate("/");
    } else {
      return setErrors(errorMessages);
    }
  }

  const passwordInput = <OutlinedInput id="password" type={showPassword ? 'text' : 'password'} inputRef={passwordRef} endAdornment={
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => setShowPassword(!showPassword)}
        onMouseDown={() => setShowPassword(!showPassword)}
        edge="end">
          {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  } />;

  return (
    <section style={{marginTop:"2em"}}>
      <Container maxWidth="md">
        <Card sx={{boxShadow:1, maxWidth: 'md'}}>
          <CardContent>
            <Container maxWidth="sm">
              <Typography variant="h2" color="text.primary" gutterBottom>
                Login
              </Typography>
              {errors.length > 0 ?
                <Alert severity="error" aria-live="assertive">
                  {errors.map((error, index) => {
                    return <p key={`alert-${index}`}>
                      {error}
                    </p>
                  })}
                </Alert>
              : <></>} 
              <form onSubmit={handleSubmit}>
                <FormGroup row={true} id="email-group" sx={{marginTop: "1em"}}>
                  <FormControl fullWidth>
                    <InputLabel required htmlFor="email" id="email-label">Email Address</InputLabel>
                    <Input id="email" type="email" inputRef={emailRef}/>
                  </FormControl>
                </FormGroup>
                <FormGroup row={true} id="password-group" sx={{marginTop: "1em"}}>
                  <FormControl fullWidth>
                    <InputLabel required htmlFor="password" id="password-label">Password</InputLabel>
                    {passwordInput}
                  </FormControl>
                </FormGroup>
                <FormGroup row={true} id="submit-group" sx={{marginTop: "1em"}}>
                  <FormControl fullWidth>
                    <Button 
                      disabled={loading} 
                      variant="contained" 
                      color="primary" 
                      type="submit" 
                      id="submit-button">Login</Button>
                  </FormControl>
                </FormGroup>
              </form>
            </Container>
          </CardContent>
          <Divider light={false} />
          <CardActions sx={{marginTop: "1em", justifyContent: 'center' }} disableSpacing >
            <Box>
              <Typography variant="body2" color="text.secondary" align="center">
                  <Link to="/forgot-password">Forgot Password?</Link>
              </Typography>
              <Link to="/signup">Create an Account!</Link>
            </Box>
          </CardActions>
        </Card>
      </Container>

    </section>
  )
}

export default Login