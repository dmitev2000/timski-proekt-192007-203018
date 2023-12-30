import PropTypes from "prop-types";
import { API_BASE_URL, IMAGES_URL } from "../../../shared/URLs";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import Badge from "@mui/material/Badge";
import { Tooltip } from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import React, { useState } from "react";
import ProductInStore from "./ProductInStore";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductAvailabilityElement = ({ element }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleClickOpen = async (phone_id, shop_id) => {
    const d = await axios.get(
      `${API_BASE_URL}/phones/available/by/store?phone_id=${phone_id}&shop_id=${shop_id}`
    );
    console.log(d.data);
    setData(d.data);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <div className="w-100 my-3 d-flex justify-content-between align-items-center">
        <img
          style={{ width: "100px" }}
          src={`${IMAGES_URL}/shop/${element.shop_logo}`}
        />
        <span>{element.shop_name}</span>
        <span>{parseFloat(element.price).toFixed(2)} MKD</span>
        <span>
          {element.total_qty !== 0 ? (
            <Tooltip title="In stock">
              <Badge badgeContent={element.total_qty} color="success">
                <SmartphoneIcon />
              </Badge>
            </Tooltip>
          ) : (
            <Tooltip title="Out of stock">
              <Badge badgeContent={0} color="error" showZero>
                <SmartphoneIcon />
              </Badge>
            </Tooltip>
          )}
        </span>
        <button
          onClick={() => {
            handleClickOpen(element.phone_id, element.shop_id);
          }}
          className="btn border-1 border-light text-light"
          title="Add to cart"
        >
          <AddShoppingCartIcon />
        </button>
      </div>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {element.shop_name}
            </Typography>
            <Button onClick={() => navigate("/cart")} autoFocus color="inherit">
              My Cart
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {data.map((e, i) => {
            return (
              <ProductInStore
                key={i}
                element={e}
                brand={element.brand_name}
                phone={element.phone_name}
                phone_id={element.phone_id}
                shop={element.shop_id}
              />
            );
          })}
        </List>
      </Dialog>
    </>
  );
};

ProductAvailabilityElement.propTypes = {
  element: PropTypes.any.isRequired,
};

export default ProductAvailabilityElement;
