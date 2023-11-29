import { Box } from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import banner1 from "./img/banner1.png";
import banner2 from "./img/banner2.png";
import banner3 from "./img/banner3.png";

function DarkVariantExample() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <Box
          sx={{
            width: "100%",
            height: "350px",
            background: "white",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "350px",
              background: `url('${banner1}')`,
              backgroundSize: "80%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></Box>
        </Box>
      </Carousel.Item>
      <Carousel.Item>
      <Box
            sx={{
              width: "100%",
              height: "350px",
              background: `url('${banner2}')`,
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
            }}
          ></Box>
      </Carousel.Item>
      <Carousel.Item>
         <Box
            sx={{
              width: "100%",
              height: "350px",
              background: `url('${banner3}')`,
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
              backgroundPositionY: "-100px",
            }}
          ></Box>
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;
