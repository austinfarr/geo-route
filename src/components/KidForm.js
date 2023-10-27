// components/KidForm.js
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

function KidForm({
  open,
  handleClose,
  handleAddKid,
  handleUpdateKid,
  editingKid,
}) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (editingKid) {
      handleUpdateKid({ ...editingKid, ...formData });
    } else {
      handleAddKid(formData);
    }
    handleClose();
  };

  useEffect(() => {
    if (editingKid) {
      setFormData({
        name: editingKid.name,
        location: editingKid.location,
      });
    } else {
      setFormData({
        name: "",
        location: "",
      });
    }
  }, [editingKid]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{editingKid ? "Edit Kid" : "Add New Kid"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="location"
          label="Location"
          type="text"
          fullWidth
          variant="standard"
          value={formData.location}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>{editingKid ? "Update" : "Add"}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default KidForm;
