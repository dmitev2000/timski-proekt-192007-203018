import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { API_BASE_URL } from "../../../shared/URLs";
import { AuthContext } from "../../../shared/AuthContext";
import { FireSuccessNotification } from "../../../shared/ShowNotification";

const ProductInStore = ({ element, brand, phone, phone_id, shop }) => {
  const AuthCtx = useContext(AuthContext);
  const [quantity, setQuantity] = useState(0);
  //console.log(element);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    setQuantity((prev) => prev - 1);
  };

  const addToCart = () => {
    axios
      .post(
        `${API_BASE_URL}/cart/add/${AuthCtx.user.user.id}`,
        {
          phone_id: phone_id,
          shop_id: shop,
          color: element.color,
          quantityToAdd: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${AuthCtx.user.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        FireSuccessNotification(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ListItem button disabled={element.quantity === 0}>
        <ListItemText
          primary={brand.concat(" ", phone)}
          secondary={"Color: ".concat(element.color)}
        />
        <>
          <SmartphoneIcon />
          <ListItemText
            sx={{ mx: 1 }}
            primary="In stock:"
            secondary={element.quantity.toString().concat(" items.")}
          />
        </>
        <div className="h-100 d-flex justify-content-center align-items-center">
          <Button
            disabled={quantity === 0}
            variant="outlined"
            onClick={decrement}
          >
            -
          </Button>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              type="number"
              value={quantity}
              disabled={element.quantity === 0}
              endAdornment={
                <InputAdornment position="end">Quantity</InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
            />
          </FormControl>
          <Button
            disabled={quantity === element.quantity}
            variant="outlined"
            onClick={increment}
          >
            +
          </Button>
          <Button
            disabled={quantity === 0}
            onClick={addToCart}
            sx={{ mx: 2 }}
            title="Add to cart"
          >
            <AddShoppingCartIcon />
          </Button>
        </div>
      </ListItem>
      <Divider />
    </>
  );
};

ProductInStore.propTypes = {
  element: PropTypes.object.isRequired,
  brand: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  phone_id: PropTypes.number.isRequired,
  shop: PropTypes.number.isRequired,
};

export default ProductInStore;
