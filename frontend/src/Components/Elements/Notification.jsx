import { useState } from "react";

import { Badge, List, ListItem, ListItemButton, ListItemText, Popover } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { handleGetNotifications } from "../../Services/app";

const styles = {
  notificationContainer: {
    width: "300px",
    padding: "10px",
  },
};

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      const res = await handleGetNotifications()

      if (res.statusCode === 0) {
        setNotifications(res.data);
      } else {

      }
    }

    getNotifications()
  }, [])

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const notificationOpen = Boolean(anchorEl);
  const id = notificationOpen ? "simple-popover" : undefined;

  return (
    <>
      <Tooltip title="Notification" sx={{ marginRight: "10px" }}>
        <IconButton
          size="large"
          color="inherit"
          onClick={handleNotificationClick}
        >
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={notificationOpen}
        anchorEl={anchorEl}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={styles.notificationContainer}>
          {notifications.length < 1 ? (
            <>Không có thông báo nào!</>
          ) : (
            <List>
                {notifications.map(notification => {
                  return (
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary={
                          <>
                            <b>{notification.sender.username} </b> {notification.content}
                          </>
                        } />
                      </ListItemButton>
                    </ListItem>
                  )
                })}
            </List>
          )}
          {/* Notification Card */}
        </Box>
      </Popover>
    </>
  );
};

export default Notification;
