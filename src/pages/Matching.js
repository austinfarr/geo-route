import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { supabase } from "../../lib/supabase";
import { geocodeAddress } from "../../lib/geocode";
import { matchDriversWithKids } from "../../lib/matchingAlgorithm"; // Import your matching algorithm
import Header from "@/components/Header";

export default function Matching() {
  const [drivers, setDrivers] = useState([]);
  const [kids, setKids] = useState([]);
  const [matches, setMatches] = useState([]);

  const [driversLocations, setDriversLocations] = useState({});
  const [kidsLocations, setKidsLocations] = useState({});

  useEffect(() => {
    console.log("driversLocations", driversLocations);
    console.log("kidsLocations", kidsLocations);
    // Perform matching if drivers and kids locations are available
    if (driversLocations && kidsLocations) {
      console.log("Performing matching");
      console.log("driversLocations", driversLocations);
      console.log("kidsLocations", kidsLocations);
      const matches = matchDriversWithKids(driversLocations, kidsLocations);
      console.log("matches:", matches);
      setMatches(matches);
    }
  }, [driversLocations, kidsLocations]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch drivers
      const { data: driversData } = await supabase.from("Drivers").select("*");
      setDrivers(driversData);

      // Fetch kids
      const { data: kidsData } = await supabase.from("Kids").select("*");
      setKids(kidsData);

      // Geocode driver addresses

      // Geocode kid addresses
      // Geocode kid addresses
      const kidsLocationsTemp = {};
      for (const kid of kidsData) {
        try {
          console.log("kid:", kid);
          console.log("kid.location:", kid.location);
          const location = await geocodeAddress(kid.location);
          kidsLocationsTemp[kid.id] = { ...kid, location }; // Add the entire kid object along with the location
          console.log("location:", location);
        } catch (error) {
          console.error("Error geocoding address for kid:", kid.name, error);
        }
      }
      setKidsLocations(kidsLocationsTemp);

      // Similarly, Geocode driver addresses
      const driversLocationsTemp = {};
      for (const driver of driversData) {
        try {
          console.log("driver:", driver);
          console.log("driver.location:", driver.location);
          const location = await geocodeAddress(driver.location);
          driversLocationsTemp[driver.id] = { ...driver, location }; // Add the entire driver object along with the location
          console.log("location:", location);
        } catch (error) {
          console.error(
            "Error geocoding address for driver:",
            driver.name,
            error
          );
        }
      }
      setDriversLocations(driversLocationsTemp);
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Box textAlign="center" mt={5}>
          <Typography variant="h4" gutterBottom>
            Match Results
          </Typography>

          <Box>
            {matches.map((match, index) => (
              <div key={index}>
                <Typography>{`Driver: ${match.driver.name} - Kid: ${match.kid.name}`}</Typography>
              </div>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
}
