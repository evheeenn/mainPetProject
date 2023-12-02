import React, { useEffect, useState, useCallback } from "react";
import Header from "../Header";
import Product from "./components/Product";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  updateShoppingCartThunk,
  updateStatusWhenLogoutThunk,
} from "../../store/actions";
import DarkVariantExample from "./components/Carousel";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  main: {
    marginTop: "17px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#EEE3F6",
    justifyContent: "center",
    minHeight: "100vh",
  },

  categoryContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "450px",
    margin: "25px 0 0 0",
    paddingLeft: 0,
    paddingBottom: "30px",
    "@media (max-width: 450px)": {
      paddingLeft: "20px",
    },
    "@media (max-width: 420px)": {
      paddingLeft: "0px",
    },
  },

  productsWrapper: {
    display: "flex",
    flexWrap: "wrap",
  },
});

export default function Homepage() {
  const [userLogIn, setUserLogin] = useState(false);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);

  const classes = useStyles();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (user) {
      setUserLogin(true);
      setCount(user.shoppingCart.length);
    }
  }, [user]);

  const logOut = async (user) => {
    await dispatch(updateStatusWhenLogoutThunk(user));
    localStorage.removeItem("user");
    await setUserLogin(false);
  };

  const addToCart = useCallback(
    async (data) => {
      if (!userLogIn) {
        navigate("/login");
      } else {
        await dispatch(updateShoppingCartThunk(user, data));
      }
    },
    [userLogIn, navigate, user]
  );

  return (
    <>
      <Header
        count={count}
        action={logOut}
        isLogin={userLogIn}
        setUserLogin={setUserLogin}
      />
      <Box className={classes.main}>
        <DarkVariantExample />
        {Object.keys(products).map((category) => (
          <Container key={category} className={classes.categoryContainer}>
            <Typography
              variant="h2"
              className="bootstrap-font-class"
              sx={{
                fontSize: "31px",
                fontWeight: "700",
                marginLeft: "1%",
              }}
            >
              {category}
            </Typography>
            <Box className={classes.productsWrapper}>
              {products[category].map((el) => (
                <Product
                  key={el.id}
                  data={el}
                  addToCart={addToCart}
                  user={userLogIn}
                  userLogIn={userLogIn}
                />
              ))}
            </Box>
          </Container>
        ))}
      </Box>
    </>
  );
}
