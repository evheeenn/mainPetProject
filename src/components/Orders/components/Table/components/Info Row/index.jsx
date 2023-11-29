import { Box } from "@mui/material";
import React from "react";
import TableHeadline from "./components/Table Headline";

export default function HeadlineRow({ h1, h2, h3, h4, h5, h6 }) {
  const styles = {
    row: {
      display: "flex",
      width: "100%",
      height: "34.3px",
    },
  };
  return (
    <Box sx={styles.row}>
      <TableHeadline text={"Item description"} width={"40%"} />
      <TableHeadline text={"Price"} width={"10%"} />
      <TableHeadline text={"Sale"} width={"10%"} />
      <TableHeadline text={"Quantity"} width={"30%"} />
      <TableHeadline text={"Total"} width={"10%"} />
    </Box>
  );
}
