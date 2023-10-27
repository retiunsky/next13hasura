import { Card, CardMedia, Typography, useTheme } from "@mui/material";
import Link from "next/link";

export default function CategoryItem(props:any ) {
  const theme = useTheme();

  return (
    <Link
      href={`/products/${props.category.id}`}
      style={{ textDecoration: "none", cursor: "pointer" }}
    >
      <Card sx={{ "&:hover": { cursor: "pointer" } }}>
        <CardMedia
          sx={{
            "&:hover, &.Mui-focusVisible": {
              transform: "scale3d(1.05, 1.05, 1)",
            },
            height: "450px",
            width: 350,
            transition: "transform 0.15s ease-in-out",
          }}
          component="img"
           src={props.category.img}
        />
        <Typography
          gutterBottom
          variant="h5"
          component="h1"
          sx={{
            textShadow: "1px 1px 1px #fff",
            position: "absolute",
            top: "42%",
            width: "100%",
            textAlign: "center",
            backgroundColor: "none",
            fontFamily: "Dm-Sans, monospace",
            color: theme.palette.primary.main,
          }}
        >
          {props.category.title}
        </Typography>
      </Card>
    </Link>
  );
}
