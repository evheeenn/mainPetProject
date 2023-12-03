import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Button from "../../../Login/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccountThunk } from "../../../../store/actions";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  main: {
    width: "27%",
    marginTop: "73px",
    marginLeft: "27px",
    "@media (max-width: 1020px)": {
      width: "100%",
      marginLeft: "0px",
    },
  },

  h1: {
    fontSize: "23px",
    color: "#AE69DD",
    fontWeight: 700,
  },

  sum: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "27px",
  },

  buttonWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: "23px",
  },
});

export default function AccountData({ action }) {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const classes = useStyles();

  const deleteAccount = async (user) => {
    await dispatch(deleteAccountThunk(user));
    navigate("/");
    localStorage.removeItem("user");
  };

  return (
    <Box className={classes.main}>
      <Typography variant="h1" className={classes.h1}>
        My info
      </Typography>
      <Box className={classes.sum}>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Name:
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {user && user.name}
        </Typography>
      </Box>
      <Box className={classes.sum}>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Email:
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {user && user.email}
        </Typography>
      </Box>
      <Box className={classes.buttonWrapper}>
      <Button
          text={"Log Out"}
          style={{
            width: "55%",
            height: "53px",
            marginTop: "3px",
            borderRadius: "25px",
            fontSize: "18px",
            fontWeight: 700,
            color: "white",
            background: "rgb(215, 58, 61)",
            border: "none",
            margin: "0 auto 0 auto",
          }}
          action={() => deleteAccount(user)}
        />
        <Button
          text={"Delete account"}
          style={{
            width: "55%",
            height: "53px",
            marginTop: "3px",
            borderRadius: "25px",
            fontSize: "18px",
            fontWeight: 700,
            color: "#9d4946",
            background: "#e6ccd0",
            border: "none",
            margin: "15px auto 0 auto"
          }}
          action={() => action(user)}
        />
      </Box>
    </Box>
  );
}
