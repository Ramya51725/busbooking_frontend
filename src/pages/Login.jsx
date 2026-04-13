import React from "react";
import { Paper, Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useFormik } from "formik";
import * as yup from "yup";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api";


function Login() {
  const navigate = useNavigate();

  const { setUser, setToken } = useContext(AuthContext);

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema,

    onSubmit: async (values) => {
      try {
        const res = await api.post("/users/login", values);

        const token = res.data.token;
        const user = res.data.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setToken(token);
        setUser(user);

        alert(res.data.message);

        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }

      } catch (err) {
        alert(err.response?.data?.message || "Login failed");
      }
    }

  });

  return (
    <Container maxWidth="sm" sx={{ padding: 7 }}>
      <Paper
        elevation={10}
        sx={{
          display: "flex",
          width: "500px",
          alignItems: "center",
          borderRadius: "24px",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "20px",
          }}
        >
          <PersonIcon />
        </div>

        <Typography variant="h4">Welcome Back</Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Login to manage your bus bookings
        </Typography>

        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <TextField
              label="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
            {formik.errors.email && formik.touched.email && (
              <Typography color="error">{formik.errors.email}</Typography>
            )}

            <TextField
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
            {formik.errors.password && formik.touched.password && (
              <Typography color="error">{formik.errors.password}</Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                fontSize: "18px",
                borderRadius: "12px",
              }}
            >
              Sign In
            </Button>

            <Typography color="text.secondary" align="center">
              Don't have an account?
              <span
                style={{ fontWeight: 600, cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                {" "}Register
              </span>
            </Typography>
          </div>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;