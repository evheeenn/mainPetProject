import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import buyButton from "../../../Header/img/shopping-cart.png";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  main: {
    width: "250px",
    height: "305px",
    marginTop: "24px",
    marginLeft: "17px",
    borderRadius: "5px",
    background: "white",
    padding: "0 11px 0 11px",
    boxShadow: "0 0 1.7px 1.7px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      boxShadow: "0 0 3.8px 3.8px rgba(0, 0, 0, 0.2)",
    },
    "@media (max-width: 1020px)": {
      width: "230px",
    },
    "@media (max-width: 580px)": {
      width: "170px",
      height: "285px",
    },
    "@media (max-width: 378px)": {
      width: "150px",
    },
    "@media (max-width: 284px)": {
      width: "250px",
    },
  },

  imageWrapper: {
    textAlign: "center",
    width: "120px",
    height: "137px",
    margin: "0 auto 0 auto",
  },

  priceAndBuyButtonWrapper: {
    marginTop: "15px",
    display: "flex",
    WebkitBoxPack: "justify",
    msFlexPack: "justify",
    justifyContent: "space-between",
  },

  buyButton: {
    textAlign: "center",
    width: "57px",
    height: "33px",
    borderRadius: "5px",
    cursor: "pointer",
  },
});

export default function Product({ data, addToCart, userLogIn }) {
  const user = useSelector((store) => store.user);
  const [color, setColor] = useState("#d73a3d");

  const classes = useStyles();

  console.log(`./products/${data.image}.png`);

  useEffect(() => {
    if (userLogIn) {
      if (user.shoppingCart.find((item) => item.id === data.id)) {
        setColor("#66ab59");
      }
    } else {
      setColor("#d73a3d");
    }
  }, [userLogIn]);

  return (
    <Box value={data.category} className={classes.main}>
      <Box className={classes.imageWrapper}>
        <img
          src={require(`./products/${data.image.toLowerCase()}.png`)}
          width={"120px"}
          style={{ margin: "17px auto 0 auto" }}
          alt="Product"
        />
      </Box>
      <Typography
        className="bootstrap-font-class"
        variant="h2"
        sx={{
          fontSize: "23px",
          fontWeight: "700",
          marginTop: "50px",
          "@media (max-width: 450px)": {
            fontSize: "17px",
            fontWeight: "700",
            marginTop: "38px",
          },
        }}
      >
        {data.title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          // marginTop: data.sale ? '48px' : null
        }}
      >
        {data.sale ? (
          <Typography
            className="bootstrap-font-class"
            variant="body1"
            sx={{
              fontSize: "19px",
              fontWeight: "400",
              color: "#a2a2a2",
              textDecoration: "line-through",
            }}
          >
            {data.price}₴
          </Typography>
        ) : null}
        {data.sale ? (
          <Typography
            className="bootstrap-font-class"
            variant="body1"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "3px",
              marginLeft: "17px",
              width: "45px",
              height: "25px",
              borderRadius: "4px",
              fontSize: "15px",
              fontWeight: 500,
              backgroundColor: "#AE69DD",
              color: "white",
            }}
          >
            -{data.salePercent}%
          </Typography>
        ) : null}
      </Box>
      {data.sale ? (
        <Box className={classes.priceAndBuyButtonWrapper}>
          <Typography
            className="bootstrap-font-class"
            variant="h1"
            sx={{
              fontSize: "32px",
              fontWeight: 700,
              "@media (max-width: 450px)": {
                marginTop: "3px",
                fontSize: "23px",
              },
            }}
          >
            {Math.floor(
              data.price - (data.price * parseFloat(data.salePercent)) / 100
            )}
            ₴
          </Typography>
          <Box
            onClick={() => {
              addToCart(data);
              if (userLogIn) {
                setColor("#66ab59");
              }
            }}
            sx={{
              backgroundColor: color,
            }}
            className={classes.buyButton}
          >
            <img src={buyButton} width={"25px"} alt="Buy" />
          </Box>
        </Box>
      ) : (
        <Box className={classes.priceAndBuyButtonWrapper}>
          <Typography
            className="bootstrap-font-class"
            variant="h1"
            sx={{
              fontSize: "32px",
              fontWeight: 700,
              "@media (max-width: 500px)": {
                fontSize: "12px",
              },
            }}
          >
            {data.price} + ₴
          </Typography>
          <Box
            onClick={() => {
              addToCart(data);
              if (userLogIn) {
                setColor("#66ab59");
              }
            }}
            sx={{
              backgroundColor: color,
            }}
            className={classes.buyButton}
          >
            <img src={buyButton} width={"25px"} alt="Buy" />
          </Box>
        </Box>
      )}
    </Box>
  );
}
