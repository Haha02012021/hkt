import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import CardClass from "../../Components/Page/CardClass";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { useSelector } from "react-redux";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ModalPostBlog from "../../Components/Page/ModalAddClass";
import { handleGetAllClassApi } from "../../Services/app";

const GroupClass = () => {
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const infoUser = useSelector((state) => state.user.infoUser);

  useEffect(() => {
    const getOptions = async () => {
      const res = await handleGetAllClassApi();
      if (res && res.successCode === 0) {
        setClasses(res.data);
      }
    };
    getOptions();
  }, []);

  return (
    <>
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

          {infoUser.role === 1 ? (
            <Button onClick={() => setCreatePostModalOpen(true)}>
              <ControlPointIcon sx={{ marginRight: "2px" }} />
              Thêm lớp học
            </Button>
          ) : null}
        </Box>
        <Box sx={{ marginTop: "20px", display: "flex", gap: "20px" }}>
          {classes.length > 0
            ? classes.map((classItem) => {
                return <CardClass item={classItem} />;
              })
            : null}
        </Box>
        <ModalPostBlog
          open={createPostModalOpen}
          onClose={setCreatePostModalOpen}
        />
      </Box>
    </>
  );
};

export default GroupClass;
