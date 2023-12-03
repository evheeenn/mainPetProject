import React from "react";
import { Box } from "@mui/material";
import RegistrationForm from "./components/Registration Form";
import Header from "../Header";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  main: {
    width: "40%",
    height: "100%",
    paddingLeft: "37px",
    margin: "57px auto 0 auto",
    "@media (max-width: 1020px)": {
      width: "50%",
    },
    "@media (max-width: 700px)": {
      width: "100%",
    },
  },
});

export default function Registration() {
  const classes = useStyles();

  return (
    <Box>
      <Header />
      <Box className={classes.main}>
        <RegistrationForm h1={"Quick Registration"} h4={"For new customers"} />
      </Box>
    </Box>
  );
}
