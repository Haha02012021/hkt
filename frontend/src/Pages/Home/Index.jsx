import React from "react";
import { Routes, Route } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Section1 from "./Section1";
import Question from "./Question";

import PostSection from "./PostSection";

import Navbar from "../../Components/Elements/Navbar";
import DrawerHeader from "../../Components/Elements/DrawerHeader";
import Drawer from "../../Components/Elements/Drawer";
import GroupClass from "./GroupClass";
<<<<<<< Updated upstream
import ClassRoom from "./ClassRoom";
=======
import NotTurnedIn from "./NotTurnedIn";
>>>>>>> Stashed changes

const Home = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f0f2f5",
      }}
    >
      <CssBaseline />
      <Navbar open={open} onOpen={handleDrawerOpen} />
      <Drawer
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      />
      <Main open={open} sx={{ maxWidth: "1200px" }}>
        <DrawerHeader></DrawerHeader>
        <Routes>
          <Route path="/section1" element={<Section1 />} />
          <Route path="/posts" element={<PostSection />} />
          <Route path="/questions" element={<Question />} />
          <Route path="/group-class" element={<GroupClass />} />
<<<<<<< Updated upstream
          <Route path="/group-class/:id" element={<ClassRoom />} />
=======
          <Route path="/not-turned-in" element={<NotTurnedIn />} />
>>>>>>> Stashed changes
        </Routes>
      </Main>
    </Box>
  );
};

// const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
);

export default Home;
