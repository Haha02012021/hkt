import { useState } from "react";

import { Badge, Popover } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const styles = {
  notificationContainer: {
    width: "300px",
    padding: "10px",
  },
};

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);

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
          <Badge badgeContent={69} color="error">
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
          Notifications
          {/* Notification Card */}
        </Box>
      </Popover>
    </>
  );
};

export default Notification;
