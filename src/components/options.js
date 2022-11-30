
// Mui imports
import {
    Button,
    Typography
} from '@mui/material'


// Constants
import {
    FontFamily,
    Green
} from '../Constants'

export default function Options(props) {
  return (
    <section className="options">
        {/**
         * Update display lib to be false if user presses the stocks button
         */}
      <Button
        onClick={() => props.setDisplayLib(false)}
        sx={{
            // Change color if selected
          color: Green,
          borderBottom: props.displayLib ? "none" : "2px solid green",
          "&:hover": {
            color: "black",
            justifyContent: "center",
            backgroundColor: Green
          },
        }}
      >
        <Typography variant="body2" fontFamily={FontFamily[3]}>
          Stocks
        </Typography>
      </Button>

        {/**
         * Update display lib to display the user library
         */}
      <Button
        onClick={() => props.setDisplayLib(true)}
        sx={{
            // Change color is selected
          color: Green,
          borderBottom: props.displayLib ? "2px solid green" : "none",
          "&:hover": {
            backgroundColor: Green,
            color: "black",
            justifyContent: "center",
          },
        }}
      >
        <Typography variant="body2" fontFamily={FontFamily[3]}>
          Library
        </Typography>
      </Button>
    </section>
  );
}
