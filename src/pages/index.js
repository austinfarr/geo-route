import React from "react";
import { Container, Typography, Button, Stack, Box } from "@mui/material";
import Link from "next/link";
import { geocodeAddress } from "../../lib/geocode";
import Header from "@/components/Header";

export default function Home() {
  async function exampleUsage() {
    const address = "100 Harding St, Fort Worth, TX 76102"; // Example address
    const coordinates = await geocodeAddress(address);
    console.log(coordinates); // { longitude: ..., latitude: ... }
  }

  exampleUsage();

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h2" gutterBottom align="center" marginTop={5}>
          Welcome to the Driver-Kid Matching System
        </Typography>

        <Typography variant="h5" paragraph align="center">
          Easily coordinate rides for your high school program after school.
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          marginTop={3}
        >
          <Link href="/drivers" passHref>
            <Button variant="contained" color="primary">
              Manage Drivers
            </Button>
          </Link>

          <Link href="/kids" passHref>
            <Button variant="contained" color="primary">
              Manage Kids
            </Button>
          </Link>
        </Stack>
        <Box textAlign="center" sx={{ p: 2 }}>
          <Link href="/match" passHref>
            <Button variant="contained" color="secondary">
              MATCH!!!!
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
}
