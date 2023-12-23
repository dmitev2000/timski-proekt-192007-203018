import SmartphoneIcon from "@mui/icons-material/Smartphone";
import HomeIcon from "@mui/icons-material/Home";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

const DefaultLinks = () => {
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ];

  const getIcon = (index) => {
    return index === 0 ? (
      <HomeIcon color="primary" />
    ) : (
      <SmartphoneIcon color="primary" />
    );
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

export default DefaultLinks;
