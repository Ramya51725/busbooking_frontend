import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  CircularProgress,
  Typography,
  Alert,
  Box,
  Paper,
  Button,
} from "@mui/material";
import BusCard from "../components/busCard";
import api from "../api/index.js";

function SearchResult() {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";

  const navigate = useNavigate();

  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchBuses = async () => {
      setLoading(true);

      try {
        const res = await api.get(
          `/buses/search?from=${from}&to=${to}&date=${date}`,
        );

        console.log("API RESPONSE:", res.data);

        setBuses(res.data.data || []);
      } catch (err) {
        setError(`could not find buses : ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, [from, to, date]);

  return (
    <Box sx={{ background: "#f5f5f5", minHeight: "100vh", py: 5 }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold">
            {from} to {to}
          </Typography>
          <Typography color="text.secondary">
            {date || "All Dates"} {buses.length} Buses Found
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ textAlign: "center", mt: 10 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : buses.length === 0 ? (
          <Paper sx={{ p: 5, textAlign: "center" }}>
            <Typography variant="h6">No buses found.</Typography>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => navigate("/")}
            >
              Go Back
            </Button>
          </Paper>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {buses.map((bus) => (
              <BusCard
                key={bus._id}
                id={bus._id}
                busName={bus.busName}
                type={bus.type}
                rating={bus.rating}
                departureTime={bus.departureTime}
                arrivalTime={bus.arrivalTime}
                duration={bus.duration}
                price={bus.price}
                seatsAvailable={bus.seatsAvailable}
                date={bus.date}
              />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default SearchResult;
