import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { default as api } from "../store/apiSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  MenuItem,
  Box,
  Select,
  FormControl,
  InputLabel,
  Input,
  Grid,
} from "@mui/material";

const titleSx = {
  fontSize: "25px",
  color: "white",
  fontFamily: "Arvo",
  fontWeight: "bold",
  marginTop: "4px",
};

const formSX = {
  width: "100%",
  padding: "25px 20px",
  marginTop: "10px",
};

const label = {
  color: "#26bb3a",
  fontSize: "20px",
  fontFamily: "Arvo",
};

const boxSX = {
  bgcolor: "#FFFFFF",
  width: "550px",
  boxShadow: "#",
  boxSizing: "border-box",
  borderRadius: "25px",
  textAlign: "center",
  px: "10px",
  padding: "5px 18px",
};

const inputSx = {
  color: "#000000",
  fontSize: "16px",
  fontFamily: "Arvo",
  height:"40px",
  marginTop:"10px"
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function EditMachine({ open, setOpen, matirialData }) {
  const { register } = useForm();
  const [addMatirial] = api.useAddMachineMutation();
  const [editMatirial] = api.useEditMachineMutation();

  const [formData, setFormData] = useState({
    name: "",
    materialtype: "",
    servicedate: "",
    nextservicedate: "",
    description: "",
    Cost: "",
  });

  const formatDate = (dateString) => {
    return dateString ? dateString.split("T")[0] : "";
  };

  React.useEffect(() => {
    if (matirialData) {
      setFormData({
        name: matirialData.name || "",
        materialtype: matirialData.materialtype || "",
        servicedate: formatDate(matirialData.servicedate),
        nextservicedate: formatDate(matirialData.nextservicedate),
        description: matirialData.description || "",
        Cost: matirialData.Cost || "",
      });
    }
  }, [matirialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (matirialData) {
      // Update existing record
      await editMatirial({
        _id: matirialData.id,
        data: formData,
      });
    } else {
      // Create new record
      await addMatirial(formData).unwrap();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form id="form" onSubmit={handleSubmit}>
          <h1 className="text-3xl justify-center items-center text-center font-semibold mt-5">
            Update Machine
          </h1>
          <Box sx={boxSX}>
            <Typography sx={titleSx}>Update Machine details</Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl sx={formSX}>
                  <InputLabel style={label}>Update name</InputLabel>
                  <Input
                    style={inputSx}
                    name="name"
                    {...register("name")}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </FormControl>

                <FormControl sx={formSX}>
                  <InputLabel style={label}>Update material type</InputLabel>
                  <Select
                    style={inputSx}
                  
                    name="materialtype"
                    {...register("materialtype")}
                    value={formData.materialtype}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="">Select here</MenuItem>
                    <MenuItem value="HDPE">HDPE</MenuItem>
                    <MenuItem value="PVC">PVC</MenuItem>
                    <MenuItem value="Polypropylene">Polypropylene</MenuItem>
                    <MenuItem value="Polystyrene">Polystyrene</MenuItem>
                    <MenuItem value="Acrylic">Acrylic</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={formSX}>
                  <InputLabel style={label}>Update service date</InputLabel>
                  <Input
                    style={inputSx}
                    name="servicedate"
                    type="date"
                    {...register("servicedate")}
                    value={formData.servicedate}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl sx={formSX}>
                  <InputLabel style={label}>Update next service date</InputLabel>
                  <Input
                    style={inputSx}
                    name="nextservicedate"
                    type="date"
                    {...register("nextservicedate")}
                    value={formData.nextservicedate}
                    onChange={handleChange}
                    required
                  />
                </FormControl>

                <FormControl sx={formSX}>
                  <InputLabel style={label}>Update description</InputLabel>
                  <Input
                    style={inputSx}
                    name="description"
                    {...register("description")}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl sx={formSX}>
                  <InputLabel style={label}>Update Cost</InputLabel>
                  <Input
                    style={inputSx}
                    name="Cost"
                    type="number"
                    {...register("Cost")}
                    value={formData.Cost}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                size="medium"
                sx={{ fontSize: "12px", bgcolor: "red", fontWeight: "bold", width: '150px',height:'40px',marginBottom:"30px" }}
                variant="contained"
                onClick={handleClose}
              >
                Cancel
              </Button>

              <Button
                size="medium"
                sx={{ fontSize: "12px", bgcolor: "green", fontWeight: "bold", width: '150px',height:'40px',marginBottom:"30px" }}
                variant="contained"
                type="submit"
              >
                UPDATE DETAILS
              </Button>
            </Box>
          </Box>
        </form>
      </BootstrapDialog>
    </div>
  );
}
