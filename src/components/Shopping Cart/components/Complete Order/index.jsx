import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Button from "../../../Login/components/Button";
import { completeOrderThunk } from "../../../../store/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

  sumWrap: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "27px",
  },

  sum: {
    fontWeight: 700,
    "@media (max-width: 1020px)": {
      fontSize: "24px",
    },
  },

  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: "23px",
  },
});

export default function CompleteOrder({ cart }) {
  const [sum, setSum] = useState(0);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const classes = useStyles();

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

  const completeOrder = async (user) => {
    await dispatch(completeOrderThunk(user));
    navigate("/account");
  };
  return (
    <Box className={classes.main}>
      <Typography variant="h1" className={classes.h1}>
        My order summary
      </Typography>
      <Box className={classes.sumWrap}>
        <Typography variant="body1" className={classes.sum}>
          Order Total
        </Typography>
        <Typography variant="body1" className={classes.sum}>
          {Math.floor(sum)}₴
        </Typography>
      </Box>
      <Box className={classes.buttonWrapper}>
        <Button
          style={{
            width: "65%",
            borderRadius: "25px",
            fontWeight: 700,
            background: "#d73a3d",
          }}
          text={"Complete Order"}
          action={() => completeOrder(user)}
        />
      </Box>
    </Box>
  );
}
