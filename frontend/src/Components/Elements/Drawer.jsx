import React, { useState } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MuiDrawer from "@mui/material/Drawer";
import DrawerHeader from "./DrawerHeader";
import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button, Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import HomeIcon from '@mui/icons-material/Home';
import ListItemIcon from "@mui/material/ListItemIcon";
import FeedIcon from "@mui/icons-material/Feed";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SchoolIcon from "@mui/icons-material/School";
import { useEffect } from "react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  position: "relative",
  zIndex: 1099,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideBar = (props) => {
  const location = useLocation();
  const [pathName, setPathName] = useState()

  useEffect(() => {
    setPathName(location.pathname)
    console.log(location.pathname);
  }, [location.pathname])

  const handleIconClick = (e) => {
    if (props.open) {
      props.onClose();
    } else {
      props.onOpen();
    }
  };
  const listClass = ["class1", "class2"];

  const ListClass = () => {
    return (
      <Box style={{ display: "flex", flexDirection: "column" }}>
        {listClass.map((classOj) => {
          return <Button sx={{ width: "100%" }}>{classOj + "1"}</Button>;
        })}
      </Box>
    );
  };

  return (
    <Drawer variant="permanent" open={props.open}>
      <DrawerHeader></DrawerHeader>
      <IconWrapper>
        <IconButton onClick={handleIconClick}>
          {props.open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </IconWrapper>

      <Divider />
      <List>
      <ListItem
          key={"Home"}
          disablePadding
          sx={{
            display: "block",
          }}
          style={{
            backgroundColor: pathName === "/" ? "rgba(0, 0, 0, 0.2)" : "transparent",
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem
          key={"Posts"}
          disablePadding
          sx={{
            display: "block",
          }}
          style={{
            backgroundColor: pathName === "/posts" ? "rgba(0, 0, 0, 0.2)" : "transparent",
          }}
        >
          <Link to="/posts" style={{ textDecoration: "none", color: "black" }}>
            <ListItemButton>
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemText primary={"Posts"} />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem
          key={"Questions"}
          disablePadding
          sx={{ display: "block", backgroundColor: pathName === "/questions" ? "rbga(0, 0, 0, 0.2)" : "transparent", }}
          style={{
            backgroundColor: pathName === "/questions" ? "rgba(0, 0, 0, 0.2)" : "transparent",
          }}
        >
          <Link
            to="/questions"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <QuestionAnswerIcon />
              </ListItemIcon>
              <ListItemText primary={"Questions"} />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem
          key={"Class"}
          disablePadding
          sx={{ display: "block", backgroundColor: pathName === "/group-class" ? "rbga(0, 0, 0, 0.02)" : "transparent", }}
          style={{
            backgroundColor: pathName === "/group-class" ? "rgba(0, 0, 0, 0.2)" : "transparent",
          }}
        >
          <Link
            to="/group-class"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>

              <ListItemText primary={"Class"} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Drawer>
  );
};

const IconWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "100px",
  right: "10px",
}));

const IconButton = styled("div")(({ theme }) => ({
  position: "fixed",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#ededed",
  boxShadow: `rgb(0 0 0 / 30%) 0px 1px 2px, rgb(0 0 0 / 15%) 0px 1px 3px 1px`,
  zIndex: "1000000",
  color: "gray",
  "&:hover": {
    color: "black",
    cursor: "pointer",
  },
}));

export default SideBar;
