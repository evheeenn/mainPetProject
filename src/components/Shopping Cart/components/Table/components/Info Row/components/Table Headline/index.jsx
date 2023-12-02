import React from "react";
import { Box } from "@mui/material";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  headline: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    background: "#dbdbdb",
    fontWeight: 500,
    "@media (max-width: 850px)": {
      fontSize: "12px",
    },
  },
});

export default function TableHeadline({ text, width }) {
  const classes = useStyles();

  return (
    <Box width={width} className={classes.headline}>
      {text}
    </Box>
  );
}
