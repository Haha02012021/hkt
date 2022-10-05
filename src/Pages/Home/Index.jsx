import React from "react";
import { Routes, Route } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Section1 from "./Section1";
import Navbar from "../../Components/Elements/Navbar";
import DrawerHeader from "../../Components/Elements/DrawerHeader";
import Drawer from "../../Components/Elements/Drawer";
import { Button } from "@mui/material";

import { toast } from "react-toastify";

const Home = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

    const notifySuccess = () => toast.success("🦄 Wow so easy!");
    const notifyError = () => toast.error("💥 ERROR!");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar open={open} onOpen={handleDrawerOpen} />
      <Drawer
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      />
      <Main open={open}>
        <DrawerHeader></DrawerHeader>
        <Button variant="contained" onClick={notifySuccess}>
          Success
        </Button>
        <Button variant="contained" color="warning" onClick={notifyError}>
          Error
        </Button>
        <Routes>
          <Route path="/section1" element={<Section1 />} />
        </Routes>
      </Main>
    </Box>
  );
};

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

export default Home;
