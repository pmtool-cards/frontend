import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const GuestNav = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PMTool - Cards App
          </Typography>
          <Link to="/login" style={{ textDecoration: "none", color: "unset" }}>
            <Button color="inherit">Log in</Button>
          </Link>
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "unset" }}
          >
            <Button color="inherit">Sign up</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default GuestNav;
