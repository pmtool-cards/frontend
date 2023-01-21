import { Container, Box, CssBaseline, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Route, Routes } from "react-router-dom";
import { useAuthUser } from "./api/auth";
import GuestLayout from "./layouts/GuestLayout";
import MainLayout from "./layouts/MainLayout";
import Board from "./pages/Board";
import BoardList from "./pages/BoardList";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";
import useStore from "./store";

function App() {
  const store = useStore();
  const user = store.authUser;

  const onGetAuthUserSuccess = (data: any) => {
    store.setAuthUser(data.data);
  };

  const { isLoading, data, isError, error, isFetching } =
    useAuthUser(onGetAuthUserSuccess);

  if (isLoading) {
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
          <Box sx={{ display: "flex", mt: 2 }}>
            <CircularProgress />
          </Box>
        </Box>
      </Container>
    );
  }

  return user ? (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<BoardList />} />
        <Route path="/boards" element={<BoardList />} />
        <Route path="/boards/:boardId" element={<Board />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<GuestLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
