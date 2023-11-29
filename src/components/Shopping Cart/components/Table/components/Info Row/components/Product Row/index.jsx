import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import deleteImg from '../../../../../../../../img/images/delete.png'
import { API } from "../../../../../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromShoppingCartThunk, updateCountAction } from "../../../../../../../../store/actions";

export default function ProductRow({ data }) {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const [count, setCount] = useState(data.count)

  const styles = {
    main: {
      display: "flex",
      width: "100%",
      height: "137px",
      borderBottom: "3px solid #dbdbdb",
    },

    productTD: {
      height: "137px",
      padding: "0",
      alignItems: "center",
      display: "flex",
    },

    title: {
      fontSize: "15.3px",
      fontWeight: 700,
      marginLeft: "17px",
    },

    price: {
      fontWeight: "700",
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
      backgroundColor: "#66ab59",
      color: "white",
      fontWeight: 700,
    },

    total: {
      fontSize: "17px",
      fontWeight: 700,
    },

    counter: {
      height: "35px",
      border: "1.7px solid #9e9e9e",
      borderRadius: "5px",
    },
  };

  const counterChanging = (e) => {
    setCount(e.target.value)
    dispatch(updateCountAction(data.id, e.target.value))
  }

  const deleteProductDispatch = (user, product) => {
    dispatch(deleteFromShoppingCartThunk(user, product))
  }

  const total = data.sale
    ? data.count * (data.price - (data.price * data.salePercent) / 100)
    : data.price * data.count

  return (
    <Box sx={styles.main} className={""}>
      <Box width={"30%"} sx={styles.productTD}>
        <img
          src={require(`../../../../../../../Homepage/components/Product/products/${data.image.toLowerCase()}.png`)}
          width={"107"}
          style={{ marginTop: "3px" }}
          alt="Product"
        />
        <Typography variant="body1" sx={styles.title}>
          {data.title}
        </Typography>
      </Box>
      <Box width={"10%"} justifyContent={"center"} sx={styles.productTD}>
        <Typography variant="body1" sx={styles.price}>
          {data.sale
            ? `$${Math.floor(data.price - (data.price * data.salePercent) / 100)}`
            : `$${Math.floor(data.price)}`}
        </Typography>
      </Box>
      <Box width={"10%"} justifyContent={"center"} sx={styles.productTD}>
        <Typography sx={data.sale ? styles.sale : null}>
          {data.sale ? `-${data.salePercent}%` : "-"}
        </Typography>
      </Box>
      <Box width={"30%"} justifyContent={"center"} sx={styles.productTD}>
        <input type="number" value={count} style={styles.counter} onChange={counterChanging} min={1}/>
      </Box>
      <Box width={"10%"} justifyContent={"center"} sx={styles.productTD}>
        <Typography variant="body1" sx={styles.total}>
          $
          {Math.floor(data.sale
            ? data.count * (data.price - (data.price * data.salePercent) / 100)
            : data.price * data.count)}
        </Typography>
      </Box>
      <Box width={"10%"} justifyContent={"center"} sx={styles.productTD}>
        <img src={deleteImg} width={'27'} style={{cursor: 'pointer'}} onClick={() => deleteProductDispatch(user, data)}></img>
      </Box>
    </Box>
  );
}
