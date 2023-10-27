import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { supabase } from "../utils/supabaseClient";
import { matchDriversWithKids } from "../utils/matchingAlgorithm"; // Import your matching algorithm

export default function Matching() {
  const [drivers, setDrivers] = useState([]);
  const [kids, setKids] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch drivers
      const { data: driversData } = await supabase.from("Drivers").select("*");
      setDrivers(driversData);

      // Fetch kids
      const { data: kidsData } = await supabase.from("Kids").select("*");
      setKids(kidsData);

      // Perform matching
      const matches = matchDriversWithKids(driversData, kidsData);
      setMatches(matches);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom marginTop={5}>
        Match Drivers with Kids
      </Typography>

      <Button variant="contained" color="primary" style={{ marginTop: 20 }}>
        Confirm Matches
      </Button>
    </Container>
  );
}
