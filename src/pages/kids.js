// pages/kids.js
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
import KidForm from "../components/KidForm";
import Header from "@/components/Header";
export default function Kids() {
  const [kids, setKids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editingKid, setEditingKid] = useState(null);

  const fetchKids = async () => {
    const { data, error } = await supabase.from("Kids").select("*");
    if (error) {
      console.error("Error fetching kids:", error);
    } else {
      setKids(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKids();
  }, []);

  const handleEditClick = (kid) => {
    setEditingKid(kid);
    setOpenForm(true);
  };

  const handleAddKid = async (newKid) => {
    const { data, error } = await supabase.from("Kids").insert([newKid]);
    if (error) {
      console.error("Error adding kid:", error);
    } else if (data) {
      setKids([...kids, data[0]]);
    }
  };

  const handleUpdateKid = async (updatedKid) => {
    const { error } = await supabase
      .from("Kids")
      .update(updatedKid)
      .eq("id", editingKid.id);

    if (error) {
      console.error("Error updating kid:", error);
    } else {
      setKids(kids.map((kid) => (kid.id === editingKid.id ? updatedKid : kid)));
      setEditingKid(null); // Reset the editing kid
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h4" gutterBottom marginTop={5}>
          Manage Kids
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: 20 }}
          onClick={() => setOpenForm(true)}
        >
          Add New Kid
        </Button>
        <KidForm
          open={openForm}
          handleClose={() => setOpenForm(false)}
          handleAddKid={handleAddKid}
          handleUpdateKid={handleUpdateKid}
          editingKid={editingKid}
        />
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <List>
            {kids.map((kid) => (
              <ListItem key={kid.id} divider>
                <ListItemText
                  primary={kid.name}
                  secondary={`Location: ${kid.location}`}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginRight: 10 }}
                  onClick={() => handleEditClick(kid)}
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
