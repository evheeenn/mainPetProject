import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import deleteImg from "../../../../../../../../img/images/delete.png";
import { API } from "../../../../../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromShoppingCartThunk,
  updateCountAction,
} from "../../../../../../../../store/actions";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  main: {
    display: "flex",
    width: "100%",
    height: "137px",
    borderBottom: "3px solid #dbdbdb",
    "@media (max-width: 1020px)": {
      height: "70px",
    },
  },

  image: {
    width: "107px",
    marginTop: "3px",
    "@media (max-width: 1020px)": {
      width: "50px",
      marginBottom: "17px",
    },
  },

  productTD: {
    height: "137px",
    padding: "0",
    alignItems: "center",
    display: "flex",
    "@media (max-width: 1020px)": {
      height: "80px",
    },
  },

  title: {
    fontSize: "15.3px",
    fontWeight: 700,
    marginLeft: "17px",
    "@media (max-width: 1020px)": {
      fontSize: "10px",
      marginLeft: "3px",
    },
  },

  price: {
    fontWeight: "700",
    "@media (max-width: 1020px)": {
      fontSize: "10px",
    },
  },

  sale: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "45px",
    height: "25px",
    borderRadius: "4px",
    fontSize: "15px",
    fontWeight: "500",
    backgroundColor: "#AE69DD",
    color: "white",
    fontWeight: 700,
    "@media (max-width: 1020px)": {
      width: "25px",
      height: "15px",
      fontSize: "10px",
    },
  },

  total: {
    fontSize: "17px",
    fontWeight: 700,
    "@media (max-width: 1020px)": {
      fontSize: "10px",
    },
  },

  counter: {
    width: "100%",
    height: "35px",
    border: "1.7px solid #9e9e9e",
    borderRadius: "5px",
    "@media (max-width: 1020px)": {
      width: "45px",
    },
  },
});

export default function ProductRow({ data }) {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [count, setCount] = useState(data.count);

  const styles = useStyles();

  const counterChanging = (e) => {
    setCount(e.target.value);
    dispatch(updateCountAction(data.id, e.target.value));
  };

  const deleteProductDispatch = (user, product) => {
    dispatch(deleteFromShoppingCartThunk(user, product));
  };

  const total = data.sale
    ? data.count * (data.price - (data.price * data.salePercent) / 100)
    : data.price * data.count;

  return (
    <Box className={styles.main}>
      <Box width={"30%"} className={styles.productTD}>
        <img
          src={require(`../../../../../../../Homepage/components/Product/products/${data.image.toLowerCase()}.png`)}
          width={"107"}
          className={styles.image}
          alt="Product"
        />
        <Typography variant="body1" className={styles.title}>
          {data.title}
        </Typography>
      </Box>
      <Box width={"10%"} justifyContent={"center"} className={styles.productTD}>
        <Typography variant="body1" className={styles.price}>
          {data.sale
            ? `${Math.floor(
                data.price - (data.price * data.salePercent) / 100
              )}₴`
            : `${Math.floor(data.price)}₴`}
        </Typography>
      </Box>
      <Box width={"10%"} justifyContent={"center"} className={styles.productTD}>
        <Typography className={data.sale ? styles.sale : null}>
          {data.sale ? `-${data.salePercent}%` : "-"}
        </Typography>
      </Box>
      <Box width={"20%"} justifyContent={"center"} className={styles.productTD}>
        <input
          type="number"
          value={count}
          className={styles.counter}
          onChange={counterChanging}
          min={1}
        />
      </Box>
      <Box width={"15%"} justifyContent={"center"} className={styles.productTD}>
        <Typography variant="body1" className={styles.total}>
          {Math.floor(
            data.sale
              ? data.count *
                  (data.price - (data.price * data.salePercent) / 100)
              : data.price * data.count
          )}
          ₴
        </Typography>
      </Box>
      <Box width={"15%"} justifyContent={"center"} className={styles.productTD}>
        <img
          src={deleteImg}
          width={"27"}
          style={{ cursor: "pointer" }}
          onClick={() => deleteProductDispatch(user, data)}
        ></img>
      </Box>
    </Box>
  );
}
