import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../shared/AuthContext";

const UserLinks = () => {
  const AuthCtx = useContext(AuthContext);

  const links = [
    { name: AuthCtx.user.user.username, path: "/" },
    { name: "My Cart", path: "/cart" },
    { name: "My Orders", path: "/orders" },
  ];
  const navigate = useNavigate();

  const getIcon = (index) => {
    switch (index) {
      case 0:
        return <AccountCircle color="primary" />;
      case 1:
        return <ShoppingCartIcon color="primary" />;
      default:
        return <ChecklistIcon color="primary" />;
    }
  };

  return (
    <List>
      {links.map((link, index) => {
        return (
          <ListItem
            key={link.name}
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate(link.path);
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {getIcon(index)}
              </ListItemIcon>
              <ListItemText
                primary={link.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default UserLinks;
