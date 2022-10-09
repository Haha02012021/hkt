import { useState } from "react";
import * as actions from "../../Store/Actions/index";
import dayjs from "dayjs";

import { Badge, List, ListItem, ListItemButton, ListItemText, Popover } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { handleGetNotifications, handleUpdateNoti } from "../../Services/app";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import socketClient from "../../Socket/client";
import { toast } from "react-toastify";

const styles = {
  notificationContainer: {
    width: "300px",
    padding: "10px",
  },
};

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const notifications = useSelector((state) => state.app.notifications)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const getNotifications = async () => {
      const res = await handleGetNotifications()

      console.log(res);
      if (res.statusCode === 0) {
        console.log(res.data);
        const dispatchRes = dispatch(actions.receiveNotification(res.data))

        if (dispatchRes) {

        } else {

        }
      } else {

      }
    }

    getNotifications()

    socketClient.on("getNotification", data => {
      dispatch(actions.receiveNotification([data]))
      toast.info(data.sender.username + " " + data.content, {
        onClick: () => {
          navigate(data.link)
        }
      })
    })

    return () => {
      socketClient.off("getNotification")
    }
  }, [])

  const handleNotificationClick = async (event) => {
    setAnchorEl(event.currentTarget);
    const res = await handleUpdateNoti()
    console.log(res);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const handleClickNoti = (noti) => {
    navigate(noti.link)
  }

  const notificationOpen = Boolean(anchorEl);
  const id = notificationOpen ? "simple-popover" : undefined;
  const now = new Date();

  return (
    <>
      <Tooltip title="Notification" sx={{ marginRight: "10px" }}>
        <IconButton
          size="large"
          color="inherit"
          onClick={handleNotificationClick}
        >
          <Badge badgeContent={ notifications.filter(notification => notification.pivot.status === 0).length} color="error">
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
            <List
              sx={{
                overflow: "auto",
                maxHeight: "64vh",
              }}
            >
              {notifications.map(notification => {
                return (
                  <ListItem disablePadding key={notification.id}>
                    <ListItemButton onClick={() => handleClickNoti(notification)}>
                      <ListItemText primary={
                        <>
                          <b>{notification.sender?.username} </b> {notification.content}
                          <i style={{ color: "rgba(0, 0, 0, 0.2)", fontSize: "14px", }}> {dayjs(notification.updated_at).fromNow()}</i>
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
