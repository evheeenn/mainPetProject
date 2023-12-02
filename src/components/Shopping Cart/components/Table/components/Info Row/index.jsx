import { Box } from "@mui/material";
import React from "react";
import TableHeadline from "./components/Table Headline";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  main: {
    display: "flex",
    width: "100%",
    height: "34.3px",
  },
});

export default function HeadlineRow({ h1, h2, h3, h4, h5, h6 }) {
  
  const classes = useStyles();

  return (
    <Box className={classes.main}>
      <TableHeadline text={"Item description"} width={"30%"} />
      <TableHeadline text={"Price"} width={"10%"} />
      <TableHeadline text={"Sale"} width={"10%"} />
      <TableHeadline text={"Quantity"} width={"20%"} />
      <TableHeadline text={"Total"} width={"15%"} />
      <TableHeadline text={"Action"} width={"15%"} />
    </Box>
  );
}
