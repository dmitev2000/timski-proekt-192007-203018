/* eslint-disable react-hooks/exhaustive-deps */
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import PageBreadcrumbs from "../layout/PageBreadcrumbs";
import { FireErrorNotification } from "../../shared/ShowNotification";
import CartItemsList from "../../components/ui/cart/CartItemsList";
import CartFooter from "../../components/ui/cart/CartFooter";
import ReloadCart from "../ui/cart/ReloadCartContext";
import { AuthContext } from "../../shared/AuthContext";
import EmptyCart from "../../components/ui/cart/EmptyCart";
import { useState, useEffect, useContext } from "react";
import LoadingComponent from "../ui/LoadingComponent";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../shared/URLs";
import Swal from "sweetalert2";
import axios from "axios";
import PageWrapper from "../layout/PageWrapper";

const Cart = () => {
  const navigate = useNavigate();
  const AuthCtx = useContext(AuthContext);
  const ReloadCartCtx = useContext(ReloadCart);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  const links = [
    { name: "Home", path: "/" },
    { name: "Cart", path: "/cart" },
  ];

  const emptyCart = () => {
    Swal.fire({
      title: "You are about to empty your cart. Are you sure?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "crimson",
      cancelButtonColor: "#1976d2",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_BASE_URL}/cart/empty-cart/${AuthCtx.user.user.id}`, {
            headers: {
              Authorization: `Bearer ${AuthCtx.user.token}`,
            },
          })
          .then((res) => {
            ReloadCartCtx.updateReload();
            FireErrorNotification(res.data);
          })
          .catch((err) => console.error(err));
      }
    });
  };

  useEffect(() => {
    if (!AuthCtx.user) {
      navigate("/login");
    } else {
      setError(null);
      axios
        .get(`${API_BASE_URL}/cart/cart-items/${AuthCtx.user.user.id}`, {
          headers: {
            Authorization: `Bearer ${AuthCtx.user.token}`,
          },
        })
        .then((res) => {
          setCartItems(res.data);
          //console.log(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.response.data);
        });
    }
  }, [ReloadCartCtx.reload]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <PageWrapper>
      <div className="px-5">
        {error ? (
          <h4 className="text-danger text-center">{error}</h4>
        ) : (
          <div>
            {cartItems.length === 0 ? (
              <EmptyCart />
            ) : (
              <div className="pt-4">
                <div className="d-flex justify-content-between align-items-center">
                  <PageBreadcrumbs links={links} />
                  <button
                    onClick={emptyCart}
                    className="cart-buttons cart-buttons-danger rounded"
                  >
                    <span>Empty cart</span>
                    <RemoveShoppingCartIcon />
                  </button>
                </div>
                <CartItemsList cartItems={cartItems} />
                <CartFooter
                  subtotal={cartItems.reduce((acc, item) => {
                    return acc + item.quantity * item.price;
                  }, 0)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Cart;
