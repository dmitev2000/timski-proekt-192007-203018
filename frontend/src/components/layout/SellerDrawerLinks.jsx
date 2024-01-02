import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import PhonelinkRingIcon from "@mui/icons-material/PhonelinkRing";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

const SellerDrawerLinks = () => {
  const navigate = useNavigate();
  const links = [
    { name: "Add device", path: "/add-device" },
    { name: "Our devices", path: "/our-catalogue" },
  ];

  const getIcon = (index) => {
    switch (index) {
      case 0:
        return <AddIcCallIcon color="primary" />;
      case 1:
        return <PhonelinkRingIcon color="primary" />;
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

export default SellerDrawerLinks;
