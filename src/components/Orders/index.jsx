import React, { useState, useEffect } from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusWhenLogoutThunk } from "../../store/actions";
import { Box } from "@mui/material";
import Table from "./components/Table";
import AccountData from "./Account Data";

export default function Orders() {
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

  return (
    <>
      <Header count={count} action={logOut} isLogin={userLogIn} />
      <Box sx={{ display: "flex" }} className={"container"}>
        <Table />
        <AccountData />
      </Box>
    </>
  );
}
