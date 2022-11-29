
import { useState } from "react";
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
} from "@mui/material";

import { Slider } from "@mui/material";
import { Stack } from "@mui/system";

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

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);

  const [marketVal, setMarketVal] = React.useState(2500);

  const [employeeVal, setEmployeeVal] = React.useState(2000);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
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
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Filter
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {/* <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography> */}

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

        <DialogActions>
          <Button
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
      </BootstrapDialog>
    </div>
  );
}
