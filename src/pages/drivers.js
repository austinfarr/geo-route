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
import Header from "@/components/Header";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);

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
    }
  };

  const handleUpdateDriver = async (updatedDriver) => {
    const { error } = await supabase
      .from("Drivers")
      .update(updatedDriver)
      .eq("id", updatedDriver.id);
    if (error) {
      console.error("Error updating driver:", error);
    } else {
      setDrivers(
        drivers.map((driver) =>
          driver.id === updatedDriver.id ? updatedDriver : driver
        )
      );
      setEditingDriver(null);
    }
  };

  return (
    <>
      <Header />
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
          open={openForm || Boolean(editingDriver)}
          handleClose={() => {
            setOpenForm(false);
            setEditingDriver(null);
          }}
          handleAddDriver={handleAddDriver}
          handleUpdateDriver={handleUpdateDriver}
          editingDriver={editingDriver}
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
                  onClick={() => setEditingDriver(driver)}
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
    </>
  );
}
