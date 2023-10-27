// pages/drivers.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { supabase } from "../../lib/supabase";
import DriverForm from "../components/DriverForm";
export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);

  const fetchDrivers = async () => {
    const { data, error } = await supabase.from("Drivers").select("*");
    if (error) {
      console.error("Error fetching drivers:", error);
    } else {
      setDrivers(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleAddDriver = async (newDriver) => {
    const { data, error } = await supabase.from("Drivers").insert([newDriver]);
    if (error) {
      console.error("Error adding driver:", error);
    } else if (data) {
      setDrivers([...drivers, data[0]]);
      fetchDrivers();
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom marginTop={5}>
        Manage Drivers
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: 20 }}
        onClick={() => setOpenForm(true)}
      >
        Add New Driver
      </Button>
      <DriverForm
        open={openForm}
        handleClose={() => setOpenForm(false)}
        handleAddDriver={handleAddDriver}
      />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <List>
          {drivers.map((driver) => (
            <ListItem key={driver.id} divider>
              <ListItemText
                primary={driver.name}
                secondary={`Location: ${driver.location}, Capacity: ${driver.capacity}`}
              />
              <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: 10 }}
              >
                Edit
              </Button>
              <Button variant="outlined" color="secondary">
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}
