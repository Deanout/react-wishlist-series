import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Box, Button, Card, CardActions, CardContent, Container, Divider, FormControl, FormGroup, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { resetErrorState, signUpUser, updateProfile } from "./sessionSlice";


function UpdateProfile() {
  const emailRef = useRef<HTMLInputElement>();
  const emailConfirmationRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const passwordConfirmationRef = useRef<HTMLInputElement>();
  const currentPasswordRef = useRef<HTMLInputElement>();

  const accessToken = useSelector((state: RootState) => state.session.accessToken);
  const errorMessages = useSelector((state: RootState) => state.session.errorMessages);

  const [errors, setErrors] = useState<Array<string>>([])
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const loading = false;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    emailRef?.current?.focus();
    if (errorMessages !== undefined) {
      setErrors(errorMessages);
      dispatch(resetErrorState());
    }
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors([]);
    const shouldUpdateEmail = emailRef?.current !== undefined && emailRef?.current?.value !== "";
    const shouldUpdatePassword = passwordRef?.current !== undefined && passwordRef?.current?.value !== "";
    const shouldUpdateProfile = shouldUpdateEmail || shouldUpdatePassword;
    if (!shouldUpdateProfile) {
      navigate("/");
    }
    if (shouldUpdateEmail) {
      if (emailRef?.current?.value !== emailConfirmationRef?.current?.value) {
        setErrors(["Emails do not match"])
      }
    }

    if (shouldUpdatePassword) {
      if (passwordRef?.current?.value !== passwordConfirmationRef?.current?.value) {
        setErrors(errors => [...errors, "Passwords do not match"])
      }
    }
    if (currentPasswordRef?.current?.value === undefined || currentPasswordRef.current.value === "") {
      setErrors(errors => [...errors, "Please enter your current password to confirm your changes"])
    }
    if (errors.length > 0) {
      return errors;
    }

    const payload = {
      email: emailRef?.current?.value,
      token: accessToken,
      password: passwordRef?.current?.value,
      currentPassword: currentPasswordRef!.current!.value
    }
    const response = await dispatch(updateProfile(payload)) as any;

    console.log(response);
    if (response.error) {
      return setErrors(response.error);
    } else {
      navigate("/")
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

  const passwordConfirmationInput = <OutlinedInput id="password-confirmation" type={showPassword ? 'text' : 'password'} inputRef={passwordConfirmationRef} endAdornment={
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

  const currentPasswordInput = <OutlinedInput 
  id="current-password-confirmation" 
  type={showCurrentPassword ? 'text' : 'password'} 
  inputRef={currentPasswordRef} 
  endAdornment={
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
        onMouseDown={() => setShowCurrentPassword(!showCurrentPassword)}
        edge="end">
          {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
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
                Update Profile
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
                    <InputLabel htmlFor="email" id="email-label">Email Address</InputLabel>
                    <Input id="email" type="email" inputRef={emailRef}/>
                    <FormHelperText id="email-helper-text">Enter current email</FormHelperText>
                  </FormControl>
                </FormGroup>
                <FormGroup row={true} id="email-confirmation-group" sx={{marginTop: "1em"}}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="email-confirmation" id="email-confirmation-label">Email Address Confirmation</InputLabel>
                    <Input id="email-confirmation" type="email" inputRef={emailConfirmationRef}/>
                    <FormHelperText id="email-confirmation-helper-text">Enter new email again</FormHelperText>
                  </FormControl>
                </FormGroup>
                <FormGroup row={true} id="password-group" sx={{marginTop: "1em"}}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="password" id="password-label">Password</InputLabel>
                    {passwordInput}
                  </FormControl>
                </FormGroup>
                <FormGroup row={true} id="password-confirmation-group" sx={{marginTop: "1em"}}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="password-confirmation" id="password-confirmation-label">Password Confirmation</InputLabel>
                    {passwordConfirmationInput}
                  </FormControl>
                </FormGroup>
                <FormGroup row={true} id="current-password-group" sx={{marginTop: "1em"}}>
                  <FormControl fullWidth>
                    <InputLabel required htmlFor="current-password" id="current-password-label">Current Password</InputLabel>
                    {currentPasswordInput}
                  </FormControl>
                </FormGroup>
                <FormGroup row={true} id="submit-group" sx={{marginTop: "1em"}}>
                  <FormControl fullWidth>
                    <Button 
                      disabled={loading} 
                      variant="contained" 
                      color="primary" 
                      type="submit" 
                      id="submit-button">Save Changes</Button>
                  </FormControl>
                </FormGroup>
              </form>
            </Container>
          </CardContent>
        </Card>
      </Container>

    </section>
  )
}

export default UpdateProfile