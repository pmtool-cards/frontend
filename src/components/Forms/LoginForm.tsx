import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useEffect } from "react";
import Copyright from "../Copyright";
import { object, string, TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { redirect } from "react-router-dom";
import { useLoginUser } from "../../api/auth";
import { AxiosError } from "axios";

const loginSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type LoginInput = TypeOf<typeof loginSchema>;
const LoginForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: loginUser, isSuccess, isError, error } = useLoginUser();

  useEffect(() => {
    if (isSubmitSuccessful && isSuccess) {
      reset();
      redirect("/");
    }
  }, [isSubmitSuccessful, isSuccess]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            {...register("email")}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={errors.email ? true : false}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            {...register("password")}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={errors.password ? true : false}
            helperText={errors.password?.message}
          />
          <Typography
            component="p"
            variant="overline"
            sx={{ position: "absolute", color: "red" }}
          >
            {isError && error instanceof AxiosError
              ? error.response?.data.message
              : ""}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default LoginForm;
