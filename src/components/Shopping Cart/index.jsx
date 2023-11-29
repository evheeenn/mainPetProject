import { useState, useEffect, React } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusWhenLogoutThunk } from "../../store/actions";
import Header from "../Header";
import { Box } from "@mui/material";
import Table from "./components/Table";
import CompleteOrder from "./components/Complete Order";

export default function ShoppingCart() {
  const [count, setCount] = useState(0);
  const [userLogIn, setUserLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setUserLogin(true);
      setCount(user.shoppingCart.length);
    }
  }, [user]);

  const logOut = async (user) => {
    navigate("/");
    await dispatch(updateStatusWhenLogoutThunk(user));
    localStorage.removeItem("user");
    await setUserLogin(false);
  };

  const styles = {
    cartWrapper: {
      display: "flex",
    },
  };

  return (
    <>
      <Header count={count} action={logOut} isLogin={userLogIn} />
      <Box sx={styles.cartWrapper} className={"container"}>
        <Table />
        <CompleteOrder cart={user.shoppingCart} />
      </Box>
    </>
  );
}
