import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button, Avatar, Divider, Menu, MenuItem, ListItemIcon } from "@mui/material";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



function MainLayout() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  console.log("user", user?.name);

  const [anchorEl, setAnchorEl] = useState(null);


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    handleMenuClose();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <Container maxWidth="lg">
          <nav className="flex justify-between items-center h-20">
            
            <Link to="/" className="flex items-center gap-2">
              <Box className="bg-blue-600 p-2 rounded-xl">
                <DirectionsBusIcon sx={{ color: 'white', fontSize: 32 }} />
              </Box>
              <Typography variant="h5" fontWeight={900} sx={{ color: '#1e293b'}}>
                Next<span className="text-blue-600">Stop</span>
              </Typography>
            </Link>


            <Box className="flex items-center gap-6">
              <Link
                to="/mybooking"
                className="flex items-center gap-2 hover:text-blue-600"
              >
                <ConfirmationNumberIcon sx={{ fontSize: 20 }} />
                <Typography variant="body2" fontWeight={600}>My Bookings</Typography>
              </Link>

              {user ? (
                <>
                  <Box
                    sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1 }}
                    onClick={handleMenuOpen}
                  >
                    <Avatar sx={{ bgcolor: '#eff6ff', color: '#2563eb', fontWeight: 700, fontSize: '15px', border: '1px solid #dbeafe' }}>
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </Avatar>

                    <Typography variant="body2" fontWeight={700} sx={{ color: '#1e293b' }}>
                      {user?.name?.split(' ')[0] || "User"}
                    </Typography>
                  </Box>


                  <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      PaperProps={{
                        sx: { borderRadius: 2, mt: 1, minWidth: 150 }
                      }}
                    >

                      <MenuItem onClick={() => { handleMenuClose(); navigate("/profile"); }}>
                        <ListItemIcon><AccountCircleIcon fontSize="small" /></ListItemIcon>
                        Profile
                      </MenuItem>

                      <Divider />

                      <MenuItem onClick={handleLogout} sx={{ color: 'red' }}>
                        <ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
                        Logout
                      </MenuItem>

                  </Menu>
                </>
              ) : (
                <Link to="/login" className="no-underline">
                  <Button
                    variant="contained"
                    startIcon={<LoginIcon />}
                    sx={{
                      borderRadius: '50px',
                      textTransform: 'none',
                      fontWeight: 700,
                      px: 3,
                      background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)'
                    }}
                  >
                    Login
                  </Button>
                </Link>
              )}
            </Box>
          </nav>
        </Container>
      </header>

      <main className="flex-grow bg-[#f8fafc]">
        <Outlet />
      </main>

<footer className="bg-[#111827] py-6 px-4">
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 1.5, md: 3 },
              textAlign: 'center'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                fontSize: '16px',
                fontWeight: 500,
                color: '#D1D5DB'
              }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  color: '#3B82F6',
                  fontWeight: 800,
                  transition: 'color 0.2s',
                  "&:hover": { color: '#60a5fa' }
                }}
              >
                NextStop
              </Link>
              <Box component="span" sx={{ color: '#4B5563' }}>|</Box>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '16px',
                  cursor: 'pointer',
                  "&:hover": { color: '#3B82F6' },
                  transition: 'color 0.2s'
                }}
              >
                About
              </Typography>
              <Box component="span" sx={{ color: '#4B5563' }}>|</Box>
              <Link
                to="/mybookings"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'color 0.2s'
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '16px',
                    "&:hover": { color: '#3B82F6' }
                  }}
                >
                  Bookings
                </Typography>
              </Link>
            </Box>

            <Typography
              variant="body2"
              sx={{
                fontSize: '16px',
                color: '#9CA3AF',
                fontWeight: 400
              }}
            >
              © 2026 NextStop Pvt Ltd. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </footer>
          </div>
  );
}

export default MainLayout;



