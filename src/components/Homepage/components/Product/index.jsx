import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import buyButton from "../../../Header/img/shopping-cart.png";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function Product({ data, addToCart, userLogIn }) {
  const user = useSelector((store) => store.user);
  const [color, setColor] = useState("#d73a3d");

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
    <Box
      value={data.category}
      sx={{
        width: "250px",
        height: "305px",
        marginTop: "24px",
        marginLeft: "17px",
        borderRadius: "5px",
        background: "white",
        padding: "0 11px 0 11px",
        boxShadow: "0 0 1.7px 1.7px rgba(0, 0, 0, 0.2)",
        ":hover" : {
          boxShadow: "0 0 3.8px 3.8px rgba(0, 0, 0, 0.2)",
        }
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          width: "220px",
          height: "137px",
          margin: "0 auto 0 auto",
        }}
      >
        <img
          src={require(`./products/${data.image.toLowerCase()}.png`)}
          width={"140px"}
          style={{ marginTop: "17px" }}
          alt="Product"
        />
      </Box>
      <Typography
        className="bootstrap-font-class"
        variant="h2"
        sx={{
          fontSize: "23px",
          fontWeight: "700",
          marginTop: "50px"
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
        <Box
          sx={{
            marginTop: "15px",
            display: "flex",
            WebkitBoxPack: "justify",
            msFlexPack: "justify",
            justifyContent: "space-between",
          }}
        >
          <Typography
            className="bootstrap-font-class"
            variant="h1"
            sx={{
              fontSize: "32px",
              fontWeight: 700,
            }}
          >
            {Math.floor(data.price - (data.price * parseFloat(data.salePercent)) / 100)}₴
          </Typography>
          <Box
            onClick={() => {
              addToCart(data);
              if (userLogIn) {
                setColor("#66ab59");
              }
            }}
            sx={{
              textAlign: "center",
              width: "57px",
              height: "33px",
              borderRadius: "5px",
              backgroundColor: color,
              cursor: "pointer",
            }}
          >
            <img src={buyButton} width={"25px"} alt="Buy" />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: "42px",
            display: "flex",
            WebkitBoxPack: "justify",
            msFlexPack: "justify",
            justifyContent: "space-between",
          }}
        >
          <Typography
            className="bootstrap-font-class"
            variant="h1"
            sx={{
              fontSize: "32px",
              fontWeight: 700,
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
              textAlign: "center",
              width: "57px",
              height: "33px",
              borderRadius: "5px",
              backgroundColor: color,
              cursor: "pointer",
            }}
          >
            <img src={buyButton} width={"25px"} alt="Buy" />
          </Box>
        </Box>
      )}
    </Box>
  );
}
