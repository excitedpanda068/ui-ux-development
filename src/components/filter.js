import { useState } from "react";

// Material Imports
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  Slider
} from "@mui/material";
import { Stack } from "@mui/system";
import { Green } from "../Constants";

// Apply padding to dialog
const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));


// Use custom title for the dialog
function CustomDialogTitle(props) {
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

// Filter component
export default function Filter(props) {

  // Open and close dialog
  const [open, setOpen] = useState(false);

  // Maintain filter values state to allow the user to reset the filters
  const [marketVal, setMarketVal] = useState(2500);
  const [employeeVal, setEmployeeVal] = useState(2000);


  // Open and close the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/**
       * Dialog button
       */}
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          color: "green",
          backgroundColor: "black",
          border: "1px solid green",
          "&:hover": {
            backgroundColor: "green",
            boxShadow: "none",
            color: "black",
            border: "none",
          },
        }}
      >
        Filter
      </Button>
      {/**
       * Displayed when dialog button is pressed
       */}
      <CustomDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        {/**
         * Title of dialog
         */}
        <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Filter
        </CustomDialogTitle>

        {/**
         * Filter options
         */}
        <DialogContent dividers>
          <Stack width="20vw">
            <Typography>Market Cap (Billions)</Typography>
            <Slider
              sx={{ color: "green", width: "100%" }}
              defaultValue={props.filterMarketCap}
              step={10}
              min={10}
              max={2500}
              value={marketVal}
              onChange={(e, val) => setMarketVal(val)}
              disableSwap
              valueLabelDisplay="auto"
              onChangeCommitted={(e, val) => props.setFilterMarketCap(val)}
            />

            <Typography>Employees (Thousands)</Typography>

            <Slider
              sx={{ color: "green", width: "100%" }}
              defaultValue={props.filterEmployees}
              step={10}
              min={0}
              max={2000}
              value={employeeVal}
              onChange={(e, val) => setEmployeeVal(val)}
              disableSwap
              valueLabelDisplay="auto"
              onChangeCommitted={(e, val) => props.setFilterEmployees(val)}
            />
          </Stack>
        </DialogContent>

        {/**
         * Resets the filter values
         */}
        <DialogActions>
          <Button
          sx = {{color: Green}}
            autoFocus
            onClick={() => {
              props.setFilterEmployees(2000);
              props.setFilterMarketCap(2500);
              setMarketVal(2500);
              setEmployeeVal(2000);
            }}
          >
            Clear
          </Button>
        </DialogActions>
      </CustomDialog>
    </div>
  );
}
