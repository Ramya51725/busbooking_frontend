import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SeatContext } from "../context/SeatContext";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

function PassengerDetails() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { setSelectedSeats, boardingPoint, droppingPoint } =
    useContext(SeatContext);

  const selectedBus = JSON.parse(localStorage.getItem("selectedBus") || "null");
  const selectedSeats = JSON.parse(
    localStorage.getItem("selectedSeats") || "[]",
  );

  const boarding = boardingPoint || localStorage.getItem("boardingPoint");
  console.log("boarding", boarding);

  const dropping = droppingPoint || localStorage.getItem("droppingPoint");
  console.log("dropping", dropping);
  console.log("user id", user.id);

  const [passengers, setPassengers] = useState([]);
  const [contact, setContact] = useState({ email: "", phone: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !user.email) {
      return navigate("/login");
    }

    if (!selectedBus || selectedSeats.length === 0) {
      return navigate("/");
    }

    setPassengers(
      selectedSeats.map((seat) => ({
        name: "",
        age: "",
        gender: "Male",
        seatNumber: seat,
      })),
    );

    setContact((prev) => ({ ...prev, email: user.email }));
  }, [user]);

  const handleBooking = async () => {
    if (
      passengers.some(
        (p) => !p.name || !p.age || !contact.email || !contact.phone,
      )
    ) {
      return alert("Fill all details");
    }

    try {
      const payload = {
        busId: selectedBus._id,
        userId: user.id,
        busName: selectedBus.busName,
        passengerDetails: passengers,
        contactDetails: contact,
        totalAmount: selectedSeats.length * selectedBus.price + 150,
        boardingPoint: boarding,
        droppingPoint: dropping,
        travelDate: selectedBus.date,
      };

      const res = await api.post("/bookings/", payload);

      if (res.status === 201) {
        await api.patch("/buses/", {
          busId: selectedBus._id,
          seats: selectedSeats,
          action: "add",
        });

        alert(res.data.message);
        localStorage.setItem("successDetail", JSON.stringify(res.data));

        setSelectedSeats([]);
        navigate("/success");
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Passenger Details
      </Typography>

      {passengers.map((p, i) => (
        <Paper key={p.seatNumber} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Seat {p.seatNumber}
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Name"
              fullWidth
              value={p.name}
              onChange={(e) => {
                const up = [...passengers];
                up[i].name = e.target.value;
                setPassengers(up);
              }}
            />

            <TextField
              label="Age"
              type="number"
              sx={{ width: 100 }}
              value={p.age}
              onChange={(e) => {
              const value = e.target.value;

              if (value < 0) return;

              const up = [...passengers];
              up[i].age = value;
              setPassengers(up);
            }}
            />

            <TextField
              select
              label="Gender"
              sx={{ width: 120 }}
              value={p.gender}
              onChange={(e) => {
                const up = [...passengers];
                up[i].gender = e.target.value;
                setPassengers(up);
              }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
          </Box>
        </Paper>
      ))}

      <Paper sx={{ p: 4, mb: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Contact Info
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Email"
            fullWidth
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />

          <TextField
            label="Phone"
            fullWidth
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          />
        </Box>
      </Paper>

      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: "#1e293b",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h5">
            Total: ₹ {selectedSeats.length * selectedBus?.price + 150}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            Incl. taxes & fees
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleBooking}
          disabled={loading}
        >
          Pay & Book Now
        </Button>
      </Paper>
    </Container>
  );
}

export default PassengerDetails;
