import * as React from "react";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";

import { Box, Stack } from "@mui/system";

// React Icons
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
// Constants
import { Green, Blue, FontFamily } from "../Constants";


// Card that display stock info
export default function MediaCard(props) {

    // Number of lines to display for description
  const [lines, setLines] = React.useState(3);

  // Either add or remove stock from library
  function HandleAdd() {
    if (props.displayLib) {
      props.setLibrary(
        props.library.filter((stock) => stock.ticker !== props.ticker)
      );
    } else {
      props.setLibrary((old) => [
        ...old,
        {
          name: props.name,
          ticker: props.ticker,
          percentChange: props.percentChange,
          description: props.description,
          marketcap: props.marketcap,
          employees: props.employees,
          img: props.img,
        },
      ]);
    }
  }

  return (
    <Card sx={{ maxWidth: 345, margin: 3, bgcolor: "#2e2e2e" }}>
      <CardContent sx={{ bgcolor: "#2e2e2e" }}>
        {/**
         * Container for card header
         */}
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems="center"
          marginBottom={2}
        >
          {/**
           * Profile picture for stock
           */}
          <Avatar
            src={props.img}
            alt="Avatar"
            sx={{
              objectFit: "contain",
              bgcolor: "white",
              height: 50,
              width: 50,
            }}
            variant={"circle"}
          ></Avatar>

          {/**
           * Name and ticker
           */}
          <Stack>
            <Typography
              sx={{ color: "white" }}
              fontFamily={FontFamily[0]}
              variant="body1"
              component="div"
            >
              {props.name}
            </Typography>
            <Typography
              sx={{ color: "white" }}
              fontFamily={FontFamily[0]}
              variant="caption"
              component="div"
            >
              {props.ticker}
            </Typography>
          </Stack>

          {/**
           * Daily percent change
           */}
          <Box sx={{ margin: "2px" }}>
            <Typography
              sx={{ color: props.percentChange > 0 ? Green : Blue }}
              fontFamily={FontFamily[0]}
            >
              {props.percentChange?.toFixed(2)}%
            </Typography>
          </Box>
        </Stack>
        
        {/**
         * Description
         */}
        <Typography
          onClick={() => (lines == 3 ? setLines(100) : setLines(3))}
          variant="body2"
          color="white"
          fontFamily={FontFamily[0]}
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: lines,
            cursor: "pointer",
          }}
        >
          {props.description}
        </Typography>

          {/**
           * Market cap
           */}
        <Typography
          variant="body1"
          color="text.secondary"
          fontFamily={FontFamily[0]}
          sx={{
            borderTop: `2px solid ${Green}`,
            color: "white",
            paddingY: 1,
            marginY: 1,
          }}
        >
          {`Market Cap: ${props.marketcap.toFixed(2)}B`}
        </Typography>

        {/**
         * Employees
         */}
        <Typography
          fontFamily={FontFamily[0]}
          variant="body1"
          color="text.secondary"
          sx={{
            borderTop: `2px solid ${Green}`,
            color: "white",
            paddingTop: 1,
            marginTop: 1,
          }}
        >
          {`Employees: ${props.employees}K`}
        </Typography>
      </CardContent>

      {/**
       * Add button
       */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => HandleAdd()}>
          {props.displayLib ? (
            <AiOutlineClose color="red" />
          ) : (
            <AiOutlinePlus color={Green} />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
}
