import React from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <Typography variant="h2" gutterBottom align="center" marginTop={5}>
        Welcome to the Driver-Kid Matching System
      </Typography>

      <Typography variant="h5" paragraph align="center">
        Easily coordinate rides for your high school program after school.
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center" marginTop={3}>
        <Link href="/drivers" passHref>
          <Button variant="contained" color="primary">
            Manage Drivers
          </Button>
        </Link>

        <Link href="/kids" passHref>
          <Button variant="contained" color="secondary">
            Manage Kids
          </Button>
        </Link>
      </Stack>
    </Container>
  );
}
