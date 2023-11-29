import React from "react";
import { Box } from "@mui/material";

export default function TableHeadline({ text, width }) {
  const styles = {
    headline: {
      width: width,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
      background: "#dbdbdb",
      fontWeight: 500,
    },
  };

  return <Box sx={styles.headline}>{text}</Box>;
}
