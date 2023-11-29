import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Button from "../../../Login/components/Button";
import { completeOrderThunk } from "../../../../store/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function CompleteOrder({ cart }) {
  const [sum, setSum] = useState(0);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let total = 0;

    if (cart) {
      if (cart.length !== 0) {
        cart.forEach((data) => {
          setSum(
            (total += data.sale
              ? data.count *
                (data.price - (data.price * data.salePercent) / 100)
              : data.price * data.count)
          );

          setSum(total);
        });
      } else {
        setSum(0);
      }
    }
  }, [cart]);
  const styles = {
    wrapper: {
      width: "27%",
      marginTop: "73px",
      marginLeft: "27px",
    },

    h1: {
      fontSize: "23px",
      color: "#66ab59",
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
      justifyContent: "center",
      width: "100%",
      marginTop: "23px",
    },

    button: {
      width: "65%",
      borderRadius: "25px",
      fontWeight: 700,
      background: "#d73a3d",
    },
  };

  const completeOrder = async (user) => {
    await dispatch(completeOrderThunk(user));
    navigate("/account");
  };
  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h1" sx={styles.h1}>
        My order summary
      </Typography>
      <Box sx={styles.sum}>
        <Typography variant="body1" sx={{ fontWeight: 700 }}>
          Order Total
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 700 }}>
          ${Math.floor(sum)}
        </Typography>
      </Box>
      <Box sx={styles.buttonWrapper}>
        <Button
          text={"Complete Order"}
          style={styles.button}
          action={() => completeOrder(user)}
        />
      </Box>
    </Box>
  );
}
