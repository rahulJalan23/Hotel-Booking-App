import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

export default function Navbar() {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  let { auth } = useSelector((state) => {
    // console.log(' use selector ran', state.auth);
    return state;
  });

  const history = useHistory();

  function toLogin() {
    history.push('/login');
  }
  function toRegister() {
    history.push('/register');
  }
  function toHome() {
    history.push('/home');
  }
  const onLogout = async () => {
    window.localStorage.setItem('auth', null);
    dispatch({
      type: 'LOGGED_OUT_USER',
      payload: null,
    });
    history.push('/login');
  };
  const regLoginTags = (
    <>
      <Button color="inherit" onClick={toLogin}>
        Login
      </Button>
      <Button color="inherit" onClick={toRegister}>
        Register
      </Button>
    </>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {/** TODO: Replace with Logo*/}
          <Button variant="contained" onClick={toHome} sx={{ mr: 10 }}>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Hotel Booking App
            </Typography>
          </Button>
          {auth !== null && (
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          )}
          {auth === null && regLoginTags}
          {/* TODO Implement Conditional Rendering */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
