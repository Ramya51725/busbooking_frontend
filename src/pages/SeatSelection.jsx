import React, { useState, useEffect, useContext } from "react";
import {Container, Typography,Paper,Button,Box,CircularProgress, Grid,TextField,MenuItem} from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SeatContext } from "../context/SeatContext";
import api from "../api";

function SeatSelection() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const {
    selectedSeats,setSelectedSeats,selectedBus,setSelectedBus,
    boardingPoint,setBoardingPoint,droppingPoint,setDroppingPoint,} = useContext(SeatContext);

  const [loading, setLoading] = useState(true);
  console.log(selectedBus)


  const busId = params.get("busId");

  useEffect(() => {
    const getBus = async () => {
      try {
        const res = await api.get(`/buses/${busId}`);
        setSelectedBus(res.data);

        localStorage.setItem("selectedBus", JSON.stringify(res.data));

      } catch (err) {
        console.log(err);
        setSelectedBus(null);
      } finally {
        setLoading(false);
      }
    };

    getBus();
  }, [busId]);

  useEffect(() => {
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  }, [selectedSeats]);


  const toggleSeat = (id) => {
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!selectedBus) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography color="error">Bus not found</Typography>
      </Container>
    );
  }

  const isSleeper = selectedBus.type?.toLowerCase().includes("sleeper");

  const Seat = ({ id }) => {
    const isSelected = selectedSeats.includes(id);
    const isBooked = selectedBus.bookedSeats?.includes(id);

    return (
      <Box
        onClick={() => !isBooked && toggleSeat(id)}
        sx={{
           width: isSleeper ? 70 : 45,
          height: isSleeper ? 90 : 45,
          borderRadius: 2,
          border: "2px solid",

          borderColor: isBooked
            ? "#e5e7eb"
            : isSelected
              ? "#16a34a"
              : "#cbd5e1",

          bgcolor: isBooked ? "#f1f5f9" : isSelected ? "#16a34a" : "white",

          color: isSelected ? "white" : "#1e293b",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          cursor: isBooked ? "not-allowed" : "pointer",

          "&:hover": {
            transform: !isBooked ? "scale(1.05)" : "none",
          },
        }}
      >
        {isSleeper ? `B${id}` : id}
      </Box>
    );
  };

  const renderSeats = () => {
    const total = isSleeper ? 20 : 30;
    let seatNumber = 1;
    const rows = [];

    while (seatNumber <= total) {
      const leftCount = isSleeper ? 1 : 2;
      const rightCount = 2;

      const left = Array.from({ length: leftCount }, () =>
        seatNumber <= total ? (
          <Seat key={seatNumber} id={seatNumber++} />
        ) : null,
      );

      const right = Array.from({ length: rightCount }, () =>
        seatNumber <= total ? (
          <Seat key={seatNumber} id={seatNumber++} />
        ) : null,
      );

      rows.push(
        <Box
          key={seatNumber}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>{left}</Box>
          <Box sx={{ display: "flex", gap: 1 }}>{right}</Box>
        </Box>,
      );
    }

    return rows;
  };



  return (
    <>
      <Typography variant="h4" fontWeight="900"  sx={{ textAlign: "center" , mt:5 }}>
        Select Your Seat
      </Typography>

    <Container sx={{ py: 5 , display:"flex" , justifyContent : "center"}} >


      <Grid container spacing={10}>

        <Paper sx={{ p: 5, borderRadius: 4, bgcolor: "#f8fafc" }}>

          <Box sx={{ display: "flex", gap: 3, my: 3 }}>

            <Box display="flex" alignItems="center" gap={1}>
              <Box sx={{ width: 20, height: 20, border: "2px solid #ccc" }} />
              <Typography variant="caption">Available</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <Box sx={{ width: 20, height: 20, bgcolor: "#16a34a" }} />
              <Typography variant="caption">Selected</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <Box sx={{ width: 20, height: 20, bgcolor: "#e5e7eb" }} />
              <Typography variant="caption">Booked</Typography>
            </Box>
          </Box>

          {renderSeats()}
          
        </Paper>

          <Paper sx={{ p: 4, borderRadius: 4, position: "sticky", top: 100  , height: "fit-content",}}>

            <Typography variant="h6" fontWeight="bold">
              Booking Details
            </Typography>

            <Box mt={3} display="flex" flexDirection="column" gap={2}>
              <TextField
                select
                label="Boarding"
                value={boardingPoint}
                onChange={(e) => {
                  setBoardingPoint(e.target.value);
                  localStorage.setItem("boardingPoint", e.target.value); 
                }}
              >
                {selectedBus.boardingPoints.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Dropping"
                value={droppingPoint}
                onChange={(e) => {
                  setDroppingPoint(e.target.value);
                  localStorage.setItem("droppingPoint", e.target.value);
                }}              >
                {selectedBus.droppingPoints?.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </TextField>

              <Box sx={{ p: 2, bgcolor: "#f1f5f9", borderRadius: 2 }}>
                <Typography variant="body2">Seat No</Typography>
                <Typography fontWeight="bold">
                  {selectedSeats.length ? selectedSeats.join(", ") : "None"}
                </Typography>

                <Typography variant="h5" color="green" fontWeight="bold" mt={1}>
                  ₹{selectedSeats.length * (selectedBus.price || 0)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ py: 1.5, borderRadius: 3, bgcolor: "#16a34a" }}
                disabled={
                  !selectedSeats.length || !boardingPoint || !droppingPoint
                }
          onClick={() => {
                localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
                navigate("/passenger");
              }}              >
                Proceed to Booking
              </Button>
            </Box>
          </Paper>
        </Grid>
    </Container>
    
        </>

  );
  

  
  
}

export default SeatSelection;