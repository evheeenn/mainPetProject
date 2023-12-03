import React from "react";
import { useEffect } from "react";
import Header from "./../Header";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { getUsersForValidationThunk } from "../../store/actions";
import LoginForm from "./components/Login Form";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  main: {
    marginTop: "57px",
    height: "57.5vh",
    display: "flex",
  },

  formWrapper: {
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

export default function Login() {
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(getUsersForValidationThunk());
  }, []);

  return (
    <Box>
      <Header />
      <Box className={classes.main}>
        <Box className={classes.formWrapper}>
          <LoginForm h1={"Secure Sign In"} h4={"For current customers"} />
        </Box>
      </Box>
    </Box>
  );
}
