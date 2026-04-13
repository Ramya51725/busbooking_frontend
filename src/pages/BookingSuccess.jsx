import { Container, Paper, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function BookingSuccess() {
  const navigate = useNavigate();
  const bookingData = JSON.parse(localStorage.getItem("successDetail"));
  console.log("bookingdata", bookingData);

  return (
    <Container maxWidth="sm" sx={{ py: 12 }}>
      <Paper
        className="p-10 text-center search-card rounded-xl"
        sx={{ borderRadius: "32px", border: "1px solid rgba(0,0,0,0.05)" }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#dcfce7",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            fontSize: "2.5rem",
          }}
        >
          <CheckCircleIcon sx={{ color: "green", mr: 1 }} />{" "}
        </div>

        <Typography
          variant="h4"
          className="font-bold mb-2"
          sx={{ color: "#166534" }}
        >
          Booking Confirmed!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Your journey has been successfully booked. Electronic tickets have
          been sent to your email.
        </Typography>

        <div
          style={{
            backgroundColor: "#f8fafc",
            padding: "24px",
            borderRadius: "16px",
            marginBottom: "2rem",
            textAlign: "left",
          }}
        >
          <div className="flex justify-between mb-2">
            <Typography variant="caption" color="text.secondary">
              Booking ID
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {bookingData.booking.data.bookingId}
            </Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="caption" color="text.secondary">
              Total Paid
            </Typography>
            <Typography variant="body2" fontWeight={700} color="primary">
              ₹{bookingData.booking.data.totalAmount}
            </Typography>
          </div>
        </div>

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => navigate("/mybooking")}
          sx={{ py: 2, borderRadius: "12px", fontSize: "1.1rem" }}
        >
          View My Bookings
        </Button>
        <Button
          onClick={() => navigate("/")}
          sx={{ mt: 2, color: "text.secondary", textTransform: "none" }}
        >
          Back to Home
        </Button>
      </Paper>
    </Container>
  );
}

export default BookingSuccess;
