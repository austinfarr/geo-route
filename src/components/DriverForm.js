import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

function DriverForm({
  open,
  handleClose,
  handleAddDriver,
  handleUpdateDriver,
  editingDriver,
}) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
  });

  useEffect(() => {
    if (editingDriver) {
      setFormData(editingDriver);
    }
  }, [editingDriver]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (editingDriver) {
      handleUpdateDriver(formData);
    } else {
      handleAddDriver(formData);
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {editingDriver ? "Edit Driver" : "Add New Driver"}
      </DialogTitle>
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
        <TextField
          margin="dense"
          name="capacity"
          label="Capacity"
          type="number"
          fullWidth
          variant="standard"
          value={formData.capacity}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>
          {editingDriver ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DriverForm;
