import { Box, Typography } from "@mui/material";
import React from "react";
import HeadlineRow from "./components/Info Row";
import ProductRow from "./components/Info Row/components/Product Row";
import { useSelector } from "react-redux";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  main: {
    width: "73%",
    height: "100%",
    marginTop: "57px",
    "@media (max-width: 1020px)": {
      width: "100%"
    },
  },

  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: "23px",
  },

  tableH1: {
    fontSize: "23px",
    color: "#AE69DD",
    fontWeight: "700",
  },
})

export default function Table() {
  const user = useSelector((store) => store.user);

  const classes = useStyles()

  return (
    <>
      <Box className={classes.main}>
        <Typography variant="h1" className={classes.tableH1}>
          Items in Shopping Cart
        </Typography>
        <Box className={classes.table}>
          <HeadlineRow />
          {user == false
            ? null
            : user.shoppingCart.length == 0
            ? null
            : user.shoppingCart.map((el, index) => (
                <ProductRow data={el} key={index} />
              ))}
        </Box>
      </Box>
    </>
  );
}
