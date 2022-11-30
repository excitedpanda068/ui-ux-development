
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
          color: props.displayLib ? Green : "black",
          bgcolor: props.displayLib ? "black" : Green,
          "&:hover": {
            backgroundColor: props.displayLib ? Green : "black",
            color: props.displayLib ? "black" : Green,
            justifyContent: "center",
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
          color: props.displayLib ? "black" : Green,
          bgcolor: props.displayLib ? Green : "black",
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
