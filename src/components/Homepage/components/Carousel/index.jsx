import { Box } from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import banner1 from "./img/banner1.png";
import banner2 from "./img/banner2.png";
import banner3 from "./img/banner3.png";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  firstSlide: {
    width: "100%",
    height: "350px",
    background: `url('${banner1}')`,
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    "@media (max-width: 850px)": {
      height: "250px",
    },
    "@media (max-width: 500px)": {
      height: "150px",
    },
    "@media (max-width: 380px)": {
      height: "120px",
    },
  },
  secondSlide: {
    width: "100%",
    height: "350px",
    background: `url('${banner2}')`,
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    "@media (max-width: 850px)": {
      height: "250px",
    },
    "@media (max-width: 500px)": {
      height: "150px",
    },
    "@media (max-width: 380px)": {
      height: "120px",
    },
  },
  thirdSlide: {
    width: "100%",
    height: "350px",
    background: `url('${banner3}')`,
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "-100px",
    "@media (max-width: 1030px)": {
      backgroundPositionY: "0px",
    },
    "@media (max-width: 850px)": {
      height: "250px",
      backgroundPositionY: "0px",
    },
    "@media (max-width: 500px)": {
      height: "150px",
      backgroundPositionY: "0px",
    },
    "@media (max-width: 380px)": {
      height: "120px",
    },
  },
});

function DarkVariantExample() {
  const classes = useStyles();

  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <Box className={classes.firstSlide} />
      </Carousel.Item>
      <Carousel.Item>
        <Box className={classes.secondSlide} />
      </Carousel.Item>
      <Carousel.Item>
        <Box className={classes.thirdSlide} />
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;
