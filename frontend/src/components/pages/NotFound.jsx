import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const NotFound = () => {
  return (
    <div className="container mt-5 pt-5 px-5">
      <Card sx={{ minWidth: 275, px: 3 }}>
      <h3 className="fw-bold my-4 mx-3 text-danger">404 Error: Page Not Found</h3>
        <CardContent>
          <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
            Whoops! It seems like your digital compass got a bit carried away
            and led you to a place that doesn't exist. The digital landscape can
            be quite the labyrinth, and it appears you've taken a turn down a
            path that hasn't been paved yet. The page you're looking for has
            gone on a little adventure and can't be found at the moment.
          </Typography>
        </CardContent>
        <CardActions>
          <Link className="btn" to="/">Home</Link>
        </CardActions>
      </Card>
    </div>
  );
};

export default NotFound;
