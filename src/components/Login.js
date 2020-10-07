import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" >
        App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function SignInSide(props) {
  const classes = useStyles();

  const [userName,setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isSnackBarVisible, setSnackBarVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const shouldDisable = (userName === '' || password === '');

  function handleClick(e) {
    e.preventDefault();
    setSnackBarVisible(false);
    //var loginData = new FormData();
    var user = {
      "name": userName,
      "password": password,
    }
    //loginData.append('name', userName);
    //loginData.append('password', password);
    axios({
      url : "http://localhost:3001/user/signin/",
      method : 'post',
      data: user,
      headers: {'Content-Type': 'application/json' }
    })
      .then((result) => {
        if (result.status === 200 && result.data && result.data.token) {
          localStorage.setItem('token', result.data.token);
          props.history.push("/dash");
        }
      }, (error) => {
        // show snackbar here
        console.log(error);
        setSnackMessage("Invalid username or password");
        if (!isSnackBarVisible)
          setSnackBarVisible(true);
        return false;
      })
  }

  function onChange (e) {
    setUserName(e.target.value);
  }

  function onChangePass (e) {
    setPassword(e.target.value);
  }

  function onSnackBarClose() {
    setSnackBarVisible(false);
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
     
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete=""
              autoFocus
              onChange = {onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {onChangePass}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled = {shouldDisable}
              onClick={handleClick}>
              Sign In
            </Button>
            <Snackbar 
              open = {isSnackBarVisible} 
              autoHideDuration={3000} 
              message = {snackMessage}
              onClose = {onSnackBarClose}
            >
            </Snackbar>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
     
  );
}