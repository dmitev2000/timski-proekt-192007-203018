import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SendIcon from "@mui/icons-material/Send";
import InsightsIcon from "@mui/icons-material/Insights";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
import { useNavigate } from "react-router-dom";

const AdminDrawerLinksList = () => {
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Orders", path: "/admin/dashboard/orders" },
    { name: "Insights", path: "/admin/dashboard/insights" },
    { name: "Manage Devices", path: "/admin/dashboard/devices" },
    { name: "Accounts", path: "/admin/dashboard/accounts" },
  ];

  const getIcon = (index) => {
    switch (index) {
      case 0:
        return <DashboardIcon color="primary" />;
      case 1:
        return <SendIcon color="primary" />;
      case 2:
        return <InsightsIcon color="primary" />;
      case 3:
        return <AppSettingsAltIcon color="primary" />;
      default:
        return <ManageAccountsIcon color="primary" />;
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

export default AdminDrawerLinksList;
