import React from "react";
import { Paper, Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../api";

function Register() {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Minimum 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        const { confirmPassword, ...data } = values;

        const res = await api.post("/users/register", data);

        alert(res.data.message);
        navigate("/login");
      } catch (err) {
        alert(err.response?.data?.message || "Error");
      }
    },
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
            backgroundColor: "rgba(67, 67, 67, 0.1)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "20px",
          }}
        >
          <EditIcon />
        </div>

        <Typography variant="h4">Create Account</Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Join us for a better travel experience
        </Typography>

        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <TextField
              label="Full Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
            {formik.errors.name && formik.touched.name && (
              <Typography color="error">{formik.errors.name}</Typography>
            )}

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

            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <Typography color="error">
                  {formik.errors.confirmPassword}
                </Typography>
              )}

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                fontSize: "18px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              }}
            >
              Create Account
            </Button>

            <Typography color="text.secondary" align="center">
              Already have an account?
              <span
                style={{ fontWeight: 600, cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                {" "}
                Login
              </span>
            </Typography>
          </div>
        </form>
      </Paper>
    </Container>
  );
}

export default Register;
