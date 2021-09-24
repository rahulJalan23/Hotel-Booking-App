import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useHistory } from "react-router";

export default function Navbar() {
  const history = useHistory();

  function toLogin() {
    history.push("/login");
  }
  function toRegister() {
    history.push("/register");
  }
  function toHome() {
    history.push("/home");
  }
  console.log(window.location.pathname);
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
              Hotel Bookin App
            </Typography>
          </Button>
          <Button color="inherit" onClick={toLogin}>
            Login
          </Button>
          <Button color="inherit" onClick={toRegister}>
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
