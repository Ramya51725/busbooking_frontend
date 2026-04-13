import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import api from "../../api";
import CreateBus from "./CreateBus"; 

const StatCard = ({ title, value, color }) => (
  <Card
    sx={{
      bgcolor: color,
      color: "white",
      borderRadius: 3,
      minWidth: 200,
      textAlign: "center",
    }}
  >
    <CardContent>
      <Typography variant="subtitle1" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="h4" fontWeight="bold">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false); 

  const fetchData = async () => {
    try {
      const statsRes = await api.get("/admin/dashboard");
      const busRes = await api.get("/buses/");
      setStats(statsRes.data.dashboard);
      setBuses(busRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/buses/${id}`);
      setBuses(buses.filter((bus) => bus._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );

  if (!stats) return null;

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        
            <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Grid container spacing={3} justifyContent="center" maxWidth="900px">
            <Grid item>
              <StatCard title="Total Buses" value={stats.totalBuses} color="#3b82f6" />
            </Grid>

            <Grid item>
              <StatCard title="Total Users" value={stats.totalUsers} color="#6366f1" />
            </Grid>

            <Grid item>
              <StatCard title="Total Bookings" value={stats.totalBookings} color="#10b981" />
            </Grid>

            <Grid item>
              <StatCard title="Total Revenue" value={`₹${stats.totalRevenue}`} color="#f59e0b" />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 2, height: 50 }}
            onClick={() => setOpen(true)} 
          >
            Add Bus
          </Button>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          width: "1300px",
          margin: "0 auto",
          borderRadius: 3,
          mt: 5,
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f1f5f9" }}>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Route</b></TableCell>
              <TableCell><b>Price</b></TableCell>
              <TableCell><b>Time</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {buses.map((bus) => (
              <TableRow key={bus._id}>
                <TableCell>{bus.busName}</TableCell>

                <TableCell>
                  {bus.from} → {bus.to}
                </TableCell>

                <TableCell>₹{bus.price}</TableCell>

                <TableCell>{bus.departureTime || "N/A"}</TableCell>

                <TableCell>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => handleDelete(bus._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateBus
        open={open}
        handleClose={() => setOpen(false)}
        refreshBuses={fetchData}
      />
    </Box>
  );
};

export default Dashboard;