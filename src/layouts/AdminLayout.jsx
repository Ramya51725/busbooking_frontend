import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";

function AdminLayout() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.clear();
    handleMenuClose();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      <header className="bg-white border-b">
        <Container maxWidth="lg">
          <nav className="flex justify-between items-center h-20">

            <Box className="flex items-center gap-2">
              <Box className="bg-blue-600 p-2 rounded-xl">
                <AdminPanelSettingsIcon sx={{ color: "white", fontSize: 30 }} />
              </Box>
              <Typography variant="h5" fontWeight={900}>
                Admin Panel
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", gap: 2, cursor: "pointer" }}
              onClick={handleMenuOpen}
            >
              <Avatar sx={{ bgcolor: "#eff6ff", color: "#2563eb" }}>
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </Avatar>

              <Typography fontWeight={700}>
                {user?.name || "Admin"}
              </Typography>
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem disabled>
                <ListItemIcon>
                  <AdminPanelSettingsIcon fontSize="small" />
                </ListItemIcon>
                Admin
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" color="error" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>

          </nav>
        </Container>
      </header>

      <main className="flex-grow bg-[#f8fafc]">
        <Outlet />
      </main>

      <footer className="bg-[#111827] py-6 px-4">
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Typography sx={{ color: "#9CA3AF" }}>
              © 2026 Bus Booking System | Admin Panel
            </Typography>
          </Box>
        </Container>
      </footer>

    </div>
  );
}

export default AdminLayout;