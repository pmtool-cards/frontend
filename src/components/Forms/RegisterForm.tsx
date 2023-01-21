import { useEffect } from "react";
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
import Copyright from "../Copyright";
import { object, string, TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterUser } from "../../api/auth";
import { redirect } from "react-router-dom";
import { AxiosError } from "axios";

const registerSchema = object({
  username: string().min(1, "Username is required").max(100),
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate: registerUser, isSuccess, isError, error } = useRegisterUser();

  useEffect(() => {
    if (isSubmitSuccessful && isSuccess) {
      reset();
      redirect("/");
    }
  }, [isSubmitSuccessful, isSuccess]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    registerUser(values);
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
          Sign up
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
            error={errors.email ? true : false}
            helperText={errors.email?.message}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            {...register("username")}
            error={errors.username ? true : false}
            helperText={errors.username?.message}
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            {...register("password")}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            {...register("passwordConfirm")}
            error={errors.passwordConfirm ? true : false}
            helperText={errors.passwordConfirm?.message}
            name="passwordConfirm"
            label="Confirm password"
            type="password"
            id="passwordConfirm"
            autoComplete="passwordConfirm"
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
            Sign Up
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default RegisterForm;
