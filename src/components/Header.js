import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material";
import Link from "next/link";

function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" component="div">
              The Driver-Kid Matching System
            </Typography>
            <Box>
              <Link href="/">
                <Button sx={{ color: "#fff" }}>Home</Button>
              </Link>
              <Link href="/drivers">
                <Button sx={{ color: "#fff" }}>Drivers</Button>
              </Link>
              <Link href="/kids">
                <Button sx={{ color: "#fff" }}>Kids</Button>
              </Link>
              <Link href="/match">
                <Button sx={{ color: "#fff" }}>Matching</Button>
              </Link>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
