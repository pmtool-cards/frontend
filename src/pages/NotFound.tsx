import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, CssBaseline, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CssBaseline />
        <Typography component="h1" variant="h4">
          Page not found!
        </Typography>
        <Typography component="h2" variant="h5" sx={{ mt: 10 }}>
          Redirecting...
        </Typography>
        <Box sx={{ display: "flex", mt: 2 }}>
          <CircularProgress />
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;
