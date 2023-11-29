import { Box, Typography } from "@mui/material";
import React from "react";
import HeadlineRow from "./components/Info Row";
import ProductRow from "./components/Info Row/components/Product Row";
import { useSelector } from "react-redux";

export default function Table() {
  const user = useSelector((store) => store.user);

  const styles = {
    tableWrapper: {
      width: "73%",
      height: "100%",
      marginTop: "57px",
    },

    table: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      marginTop: "23px",
    },

    tableH1: {
      fontSize: "23px",
      color: "#66ab59",
      fontWeight: "700",
    },
  };
  return (
    <>
      <Box sx={styles.tableWrapper}>
        <Typography variant="h1" sx={styles.tableH1}>
          Items in Shopping Cart
        </Typography>
        <Box sx={styles.table}>
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
