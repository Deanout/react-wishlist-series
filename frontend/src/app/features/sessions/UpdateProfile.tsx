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

  const errorMessages = useSelector((state: RootState) => state.session.errorMessages);
  const accessToken = useSelector((state : RootState) => state.session.accessToken);

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
    const shouldUpdateEmail = emailRef?.current?.value !== undefined && emailRef?.current?.value !== "";
    const shouldUpdatePassword = passwordRef?.current?.value !== undefined && passwordRef?.current?.value !== "";
    const shouldUpdateProfile = shouldUpdateEmail || shouldUpdatePassword;
    if (!shouldUpdateProfile) {
      navigate("/");
    } else {
      console.log("should update profile");
      console.log(shouldUpdateEmail);
      console.log(shouldUpdatePassword);
      console.log(shouldUpdateProfile);
      console.log("Emailref:", !emailRef?.current?.value);
      console.log("passwordref", passwordRef?.current?.value === "");
      console.log("oldpassword", currentPasswordRef?.current?.value);
    }
    if (shouldUpdateEmail) {
      if (emailRef?.current?.value !== emailConfirmationRef?.current?.value) {
        return setErrors(["Emails do not match"]);
      }
    }
    if (shouldUpdatePassword) {
      if (passwordRef?.current?.value !== passwordConfirmationRef?.current?.value) {
        return setErrors(["Passwords do not match"])
      }
    }
    if (currentPasswordRef?.current?.value === undefined || currentPasswordRef.current.value === "") {
      return setErrors(["Please enter your current password to confirm your changes"])
    }

    const payload = {
      email: emailRef?.current?.value,
      token: accessToken,
      password: passwordRef?.current?.value,
      currentPassword: currentPasswordRef.current.value
    }
    const response = await dispatch(updateProfile(payload)) as any;
    console.log(response);
    if (errorMessages.length > 0) {
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

  const currentPasswordInput = 
  <OutlinedInput  id="current-password" type={showCurrentPassword ? 'text' : 'password'} inputRef={currentPasswordRef} placeholder="Required to confirm changes." endAdornment={
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          onMouseDown={() => setShowCurrentPassword(!showCurrentPassword)}
          edge="end"
        >
          {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    }
  />;

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
                    <FormHelperText id="email-helper-text"></FormHelperText>
                  </FormControl>
                </FormGroup>
                <FormGroup row={true} id="email-confirmation-group" sx={{marginTop: "1em"}}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="email-confirmation" id="email-confirmation-label">Confirm Email Address</InputLabel>
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
                    <FormHelperText id="password-confirmation-helper-text">Enter new password again</FormHelperText>
                  </FormControl>
                </FormGroup>
                <FormGroup row={true} id="current-password-group" sx={{marginTop: "1em"}}>
                  <FormControl fullWidth>
                      <InputLabel required variant="filled" htmlFor="current-password" id="current-password-label">Confirm Changes With Current Password</InputLabel>
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
                      id="submit-button">Submit Changes</Button>
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