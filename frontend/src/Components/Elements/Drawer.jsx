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
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button, Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import ListItemIcon from "@mui/material/ListItemIcon";
import FeedIcon from "@mui/icons-material/Feed";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SchoolIcon from "@mui/icons-material/School";

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
  const handleIconClick = (e) => {
    if (props.open) {
      props.onClose();
    } else {
      props.onOpen();
    }
  };
  const listClass = ["class1", "class2"];
  const [openClass, setOpenClass] = useState(false);

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
        <ListItem key={"Posts"} disablePadding sx={{ display: "block" }}>
          <Link to="/posts" style={{ textDecoration: "none", color: "black" }}>
            <ListItemButton>
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemText primary={"Posts"} />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem key={"Questions"} disablePadding sx={{ display: "block" }}>
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
          sx={{ display: "block" }}
          onClick={() => setOpenClass(!openClass)}
        >
          <Link to="/class" style={{ textDecoration: "none", color: "black" }}>
            <ListItemButton>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>

              <ListItemText primary={"Class"} />
              <ListItemIcon style={{ right: "20px", marginLeft: "40px" }}>
                {openClass ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </ListItemIcon>
            </ListItemButton>
          </Link>
        </ListItem>
        {openClass && props.open ? <ListClass /> : null}
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
