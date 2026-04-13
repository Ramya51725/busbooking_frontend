import React from "react";
import { Paper, Button, Typography, Box, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";

function BusCard({ id, type, rating, departureTime, arrivalTime, duration, busName, price, seatsAvailable, date }) {
  const navigate = useNavigate();

  return (
    <Paper sx={{ p: 4, borderRadius: 3, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Typography variant="h6" fontWeight="bold">{busName}</Typography>
          <Badge badgeContent={rating} color="success"/>
        </Box>
        <Typography variant="body2" color="text.secondary">{type} • {date}</Typography>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" fontWeight="bold">{departureTime} - {arrivalTime}</Typography>
        <Typography variant="caption" color="text.secondary">{duration}</Typography>
      </Box>

      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="h5" color="primary" fontWeight="bold">₹{price}</Typography>
        <Typography  color={seatsAvailable > 0 ? "success" : "error"} fontWeight="bold">
          {seatsAvailable > 0 ? `${seatsAvailable} Seats Left` : "Sold Out"}
        </Typography>
        <Button 
          variant="contained" 
          disabled={seatsAvailable === 0} 
          onClick={() => navigate(`/seats?busId=${id}`)}  
          sx={{ mt: 1, textTransform: 'none', borderRadius: 2 }}
        >
          Select Seat
        </Button>
      </Box>
    </Paper>
  );
}

export default BusCard;
