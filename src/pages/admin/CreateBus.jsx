import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Button,
  MenuItem,
  Box,
} from "@mui/material";
import api from "../../api";

const CreateBus = ({ open, handleClose, refreshBuses }) => {
  const [form, setForm] = useState({
    busName: "",
    type: "AC Seater", 
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    duration: "",
    price: "",
    date: "",
    boardingPoints: "",
    droppingPoints: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      let totalSeats = 0;

      if (form.type.includes("Seater")) {
        totalSeats = 30;
      } else if (form.type.includes("Sleeper")) {
        totalSeats = 20;
      }

      const payload = {
        ...form,
        totalSeats: totalSeats,
        seatsAvailable: totalSeats,
        bookedSeats: [],

        boardingPoints: form.boardingPoints.split(","),
        droppingPoints: form.droppingPoints.split(","),
      };

      await api.post("/buses", payload);

      handleClose();
      refreshBuses();

      setForm({
        busName: "",
        type: "AC Seater",
        from: "",
        to: "",
        departureTime: "",
        arrivalTime: "",
        duration: "",
        price: "",
        date: "",
        boardingPoints: "",
        droppingPoints: "",
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>

      <DialogTitle sx={{ fontSize: "24px", fontWeight: "bold" }}>
        Add Bus
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3} mt={1}>

          {/* BUS NAME */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Bus Name *"
              name="busName"
              value={form.busName}
              onChange={handleChange}
            />
          </Grid>

          {/* TYPE (AC + SEAT) */}
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Type *"
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <MenuItem value="AC Seater">AC Seater</MenuItem>
              <MenuItem value="Non-AC Seater">Non-AC Seater</MenuItem>
              <MenuItem value="AC Sleeper">AC Sleeper</MenuItem>
              <MenuItem value="Non-AC Sleeper">Non-AC Sleeper</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="From *"
              name="from"
              value={form.from}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="To *"
              name="to"
              value={form.to}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Departure Time (e.g. 10:30 AM) *"
              name="departureTime"
              value={form.departureTime}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Arrival Time (e.g. 06:00 PM) *"
              name="arrivalTime"
              value={form.arrivalTime}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Duration (e.g. 5h) *"
              name="duration"
              value={form.duration}
              onChange={handleChange}
            />
          </Grid>

          {/* PRICE */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Price *"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="Date *"
              name="date"
              value={form.date}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Boarding Points (comma separated) *"
              name="boardingPoints"
              value={form.boardingPoints}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dropping Points (comma separated) *"
              name="droppingPoints"
              value={form.droppingPoints}
              onChange={handleChange}
            />
          </Grid>

        </Grid>

        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{ height: 45 }}
            onClick={handleSubmit}
          >
            Save
          </Button>

          <Button
            variant="outlined"
            fullWidth
            sx={{ height: 45 }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>

      </DialogContent>
    </Dialog>
  );
};

export default CreateBus;