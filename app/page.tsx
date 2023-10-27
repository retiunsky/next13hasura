"use client";

import styles from "./page.module.css";
import { Box, Container } from "@mui/material";
import Carousel from "./components/SwiperCarousel";
import { useTheme } from "@mui/material";

export default function Home() {
  const theme = useTheme();
  
  return (
      // <Container maxWidth={false} sx={{  p:0, maxWidth:'1550px',  pt:10}}>
      // <Carousel/>
      // </Container>
      <Box sx={{ height: "100vh", display:"flex", overflow:"auto",
      background:theme.palette.background.default,
     pt: 10 }} >
      <Carousel/>
     </Box>
  );
}
