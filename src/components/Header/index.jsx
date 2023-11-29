import React, { useEffect } from "react";
import logo from "./img/logo.png";
import cart from "./img/shopping-cart.png";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Header({ count, action }) {
  const user = useSelector((state) => state.user);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 83,
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          width: "59px",
          heigth: "100%",
          marginTop: "3px",
          marginLeft: "7.5%",
        }}
      >
        <Box 
          sx={{
            width: '250px',
            height: '73px',
            marginLeft: '-90px',
            backgroundImage: `url('${logo}')`,
            backgroundSize: '100%',
            backgroundPosition: 'center'
          }}></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "50%",
          marginTop: "20px",
          marginRight: "11%",
        }}
      >
        <Box
          sx={{
            color: "#AE69DD",
            paddingRight: "15px",
            borderRight: "2px solid #AE69DD",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              marginTop: "7px",
            }}
          >
            Hi,{" "}
            {user ? (
              <Link
                to="/account"
                style={{
                  color: "#AE69DD",
                  textDecoration: "none",
                  paddingBottom: "5px",
                  borderBottom: "1px dashed #AE69DD",
                }}
              >
                {user.name}
              </Link>
            ) : (
              <Link
                to="/login"
                style={{
                  color: "#AE69DD",
                  textDecoration: "none",
                  paddingBottom: "1px",
                  borderBottom: "1px dashed #AE69DD",
                }}
              >
                Log in
              </Link>
            )}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "17px",
            height: "17px",
            marginTop: "5px",
            marginLeft: "11px",
          }}
        >
          <Box>
            <Link to={user ? "/shoppingCart" : "/login"}>
              <ShoppingCartIcon width="25" sx={{color : "#AE69DD"}}/>
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "21px",
              height: "21px",
              zIndex: 2,
              marginTop: "-199%",
              marginLeft: "110%",
              borderRadius: "50%",
              backgroundColor: "#AE69DD",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                marginTop: "auto",
                marginBottom: "auto",
                color: "white",
                fontSize: "12px",
              }}
            >
              {user ? count : 0}
            </Typography>
          </Box>
        </Box>
        {user ? (
          <Box>
            <Typography
              variant="body1"
              sx={{
                marginTop: "7px",
                color: "#AE69DD",
                cursor: "pointer",
                textDecoration: "none",
                marginLeft: "37px",
                borderBottom: "1px dashed #AE69DD",
              }}
              onClick={() => action(user)}
            >
              Log out
            </Typography>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
