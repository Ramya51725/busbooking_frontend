import React from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Divider,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import api from "../api";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

const handleDeleteAccount = async () => {
  const isConfirmed = window.confirm(
    "Are you sure? This will permanently delete your account."
  );

  if (!isConfirmed) return; 

  try {
    await api.delete(`/users/${user?.id}`);

    localStorage.clear();

    alert("Account Deleted.");
    navigate("/register");
  } catch (err) {
    console.log(err.message);
    alert("Delete failed");
  }
};

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper
        sx={{
          p: 5,
          borderRadius: 4,
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: "primary.main",
            mb: 2,
            mx: "auto",
          }}
        >
          <PersonIcon sx={{ fontSize: 50 }} />
        </Avatar>
        <Typography variant="h4" fontWeight="bold">
          {user.name || "User"}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {user.role?.toUpperCase()}
        </Typography>

        <Box sx={{ mt: 4, textAlign: "left" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <PersonIcon color="action" />
            <Typography variant="body1">
              <b>Name:</b> {user.name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <EmailIcon color="action" />
            <Typography variant="body1">
              <b>Email:</b> {user.email}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleLogout}
            sx={{ borderRadius: 2 }}
          >
            Logout
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="large"
            onClick={handleDeleteAccount}
            sx={{ borderRadius: 2 }}
          >
            Delete Account
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Profile;
