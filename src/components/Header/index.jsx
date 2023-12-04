import React from "react";
import logo from "./img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { createUseStyles } from "react-jss";
import PersonOffIcon from "@mui/icons-material/PersonOff";

const useStyles = createUseStyles({
  main: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 83,
    backgroundColor: "white",
    "@media (max-width: 850px)": {
      height: 70,
    },
  },

  logo: {
    width: "250px",
    height: "73px",
    cursor: "pointer",
    backgroundImage: `url('${logo}')`,
    backgroundSize: "100%",
    backgroundPosition: "center",
    "@media (max-width: 850px)": {
      width: "200px",
    },
  },

  menuWrapper: {
    display: "flex",
    height: "50%",
    marginTop: "20px",
    marginRight: "11%",
  },

  accountButtonWrapper: {
    color: "#AE69DD",
    paddingRight: "15px",
    borderRight: "2px solid #AE69DD",
    "@media (max-width: 850px)": {
      paddingRight: "none",
      borderRight: "none",
    },
  },

  accountLink: {
    color: "#AE69DD",
    textDecoration: "none",
    paddingBottom: "5px",
    borderBottom: "1px dashed #AE69DD",
  },

  logInLink: {
    color: "#AE69DD",
    textDecoration: "none",
    paddingBottom: "1px",
    borderBottom: "1px dashed #AE69DD",
  },

  accountButtonOrLogIn: {
    marginTop: "7px",
    "@media (max-width: 850px)": {
      display: "none",
    },
  },

  mobileAccountIcon: {
    display: "none",
    "@media (max-width: 850px)": {
      display: "block",
      fontSize: "30px",
      color: "#AE69DD",
    },
  },

  shoppingCartButtonWrapper: {
    width: "17px",
    height: "17px",
    marginTop: "5px",
    marginLeft: "11px",
    "@media (max-width: 850px)": {
      marginTop: "1px",
      marginLeft: "0px",
    },
  },

  shoppingCartButton: {
    color: "#AE69DD",
    fontSize: 25,
  },

  productCounter: {
    display: "flex",
    justifyContent: "center",
    width: "21px",
    height: "21px",
    zIndex: 2,
    marginTop: "-199%",
    marginLeft: "110%",
    borderRadius: "50%",
    backgroundColor: "#AE69DD",
  },

  productCounterText: {
    marginTop: "auto",
    marginBottom: "auto",
    color: "white",
    fontSize: "12px",
  },

  logOutButton: {
    marginTop: "7px",
    color: "#AE69DD",
    cursor: "pointer",
    textDecoration: "none",
    marginLeft: "37px",
    borderBottom: "1px dashed #AE69DD",
    "@media (max-width: 850px)": {
      display: "none",
    },
  },
});

export default function Header({ count, action }) {
  const user = useSelector((state) => state.user);

  const classes = useStyles();

  const navigate = useNavigate();

  const logoAction = () => {
    navigate("/");
  };

  return (
    <Box className={classes.main}>
      <Box className={classes.logo} onClick={logoAction} />
      <Box className={classes.menuWrapper}>
        <Box className={classes.accountButtonWrapper}>
          <Link to={user ? "/account" : "/login"}>
            {user ? (
              <AccountCircleIcon
                width="25"
                className={classes.mobileAccountIcon}
              />
            ) : (
              <PersonOffIcon width="25" className={classes.mobileAccountIcon} />
            )}
          </Link>
          <Typography variant="body1" className={classes.accountButtonOrLogIn}>
            Hi,{" "}
            {user ? (
              <Link to="/account" className={classes.accountLink}>
                {user.name}
              </Link>
            ) : (
              <Link to="/login" className={classes.logInLink}>
                Log in
              </Link>
            )}
          </Typography>
        </Box>
        <Box className={classes.shoppingCartButtonWrapper}>
          <Box>
            <Link to={user ? "/shoppingCart" : "/login"}>
              <ShoppingCartIcon
                width="25"
                className={classes.shoppingCartButton}
              />
            </Link>
          </Box>
          <Box className={classes.productCounter}>
            <Typography variant="body1" className={classes.productCounterText}>
              {user ? count : 0}
            </Typography>
          </Box>
        </Box>
        {user ? (
          <Box>
            <Typography
              variant="body1"
              className={classes.logOutButton}
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
