import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import Logout from "@mui/icons-material/Logout";
import { useState, useContext } from "react";
import { AuthContext } from "../../shared/AuthContext";
import { useNavigate } from "react-router-dom";
import { FireSuccessNotification } from "../../shared/ShowNotification";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChecklistIcon from "@mui/icons-material/Checklist";

const AccountMenu = () => {
  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleNavigate = (link) => {
    navigate(link);
  };

  const handleLogout = () => {
    AuthCtx.dispatch({ type: "LOGOUT" });
    FireSuccessNotification("You are now logged out.");
    navigate("/logout");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              color: "white",
              backgroundColor: "#1976d2",
              border: "solid 2px white",
            }}
          >
            {AuthCtx.user.user.username[0].toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem style={{ width: "200px" }} onClick={handleClose}>
          <Avatar /> {AuthCtx.user.user.username}
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleNavigate("cart")}>
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          My Cart
        </MenuItem>
        <MenuItem onClick={() => handleNavigate("orders")}>
          <ListItemIcon>
            <ChecklistIcon fontSize="small" />
          </ListItemIcon>
          My Orders
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <CloseIcon fontSize="small" />
          </ListItemIcon>
          Close
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
