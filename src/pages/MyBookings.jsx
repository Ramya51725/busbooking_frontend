import { Container, Paper, Typography, Button , Box , Chip  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";

function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/");
        console.log("API RESPONSE:", res.data);

        setBookings(res.data.result || []);
      } catch (err) {
        console.error(err);
        setBookings([]);
      }
    };

    fetchBookings();
  }, []);



const handleCancel = async (booking) => {
  try {
    await api.patch(`/bookings/${booking._id}`);

    const seats = booking.passengerDetails.map(p => p.seatNumber);

    await api.patch("/buses/", {
      busId: booking.busId,
      seats: seats,
      action: "remove"
    });

    setBookings((prev) =>
      prev.map((b) =>
        b._id === booking._id
          ? { ...b, status: "Cancelled" }
          : b
      )
    );

  } catch (err) {
    console.error(err);
  }
};



  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>

      <Typography variant="h4" fontWeight="900" sx={{ mb: 4 }}>
        My Tickets
      </Typography>
  {bookings?.length === 0 ? (
    <Paper className="p-10 text-center rounded-xl py-20">
      <div style={{ marginBottom: "20px" }}>
        <ConfirmationNumberIcon />
      </div>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        No Bookings Yet
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        You haven't booked any bus tickets. Looking for a getaway?
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/")}
        sx={{ borderRadius: "12px", px: 4, textTransform: "none" }}
      >
        Explore Buses
      </Button>
    </Paper>
  ) :
   (
        bookings.map((booking) => (
          <Paper
            key={booking._id}
            sx={{
              p: 2,
              mb: 2,
              mx: "auto",
              width: "fit-content",
              minWidth: 800,
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              gap: 5,
              justifyContent: "space-between",
              border: "1px solid #eef2f6",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <Box
              sx={{
                minWidth: 220,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
            <Typography variant="h6" fontWeight="900" color="primary">{booking.busName || 'Premium Bus'}</Typography>

              <Typography variant="subtitle1" fontWeight="700">
                {booking.boardingPoint} ➔ {booking.droppingPoint}
              </Typography>
              <Typography variant="body2" color="text.secondary"   sx={{ display: "flex", gap:1}}>
                <CalendarTodayIcon/> 
                <Typography>
                        {booking.travelDate}
                </Typography>
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 3,
                justifyContent: "center",
              }}
            >
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                {booking.passengerDetails.map((p, i) => (
                  <Box
                    key={i}
                    sx={{
                      px: 2,
                      py: 0.5,
                      bgcolor: "#f8fafc",
                      borderRadius: 2,
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <Typography variant="caption" fontWeight="bold">
                      <AccountCircleIcon/> {p.name} (S{p.seatNumber})
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ px: 2, borderLeft: "2px dashed #e2e8f0" }}>
                <Typography variant="h5" fontWeight="950" color="primary">
                  ₹{booking.totalAmount}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Total Paid
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 1,
                minWidth: 150,
              }}
            >
              <Chip
                label={booking.status}
                color={booking.status === "Confirmed" ? "success" : "error"}
                size="small"
                sx={{ fontWeight: "bold" }}
              />
              {booking.status === "Confirmed" && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: "bold",
                  }}
                  onClick={() => handleCancel(booking)}
                >
                  Cancel Ticket
                </Button>
              )}
            </Box>
          </Paper>
        ))
      )}
    </Container>
  );
}

export default MyBookings;

