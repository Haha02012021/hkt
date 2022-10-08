import React from "react";
import { Box, Button } from "@mui/material";
import CardClass from "../../Components/Page/CardClass";
import FactCheckIcon from "@mui/icons-material/FactCheck";

const GroupClass = () => {
  const classes = [
    { name: "Bong chuyen hoi", nameTeacher: "nameTeacher" },
    { name: "Tieng Nhat", nameTeacher: "nameTeacher" },
  ];
  return (
    <Box sx={{ minHeight: "85vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Button>
          <FactCheckIcon sx={{ marginRight: "5px" }} />
          Việc cần làm
        </Button>
      </Box>
      <Box sx={{ marginTop: "20px", display: "flex", gap: "20px" }}>
        {classes.map((classItem) => {
          return <CardClass item={classItem} />;
        })}
      </Box>
    </Box>
  );
};

export default GroupClass;
