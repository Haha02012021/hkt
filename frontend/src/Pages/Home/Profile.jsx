import React, { useState, useEffect } from "react";
import { Box, Card, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { SCHOOLS, ROLES } from "../../config/constants";
import { handleGetInfoUserApi } from "../../Services/app";
import QuestionCard from "../../Components/Page/QuestionCard";

const Profile = () => {
  const infoUser = useSelector((state) => state.user.infoUser);
  const school = SCHOOLS.filter((sc) => sc.id === infoUser.school_id);
  const role = ROLES.filter((r) => r.id === infoUser.role);
  const [info, setInfo] = useState();

  useEffect(() => {
    const getInfo = async () => {
      const res = await handleGetInfoUserApi();
      if (res && res.statusCode === 0) {
        setInfo(res.data);
      }
    };
    getInfo();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          padding: "20px",
        }}
      >
        <Box sx={{ fontSize: "20px", fontWeight: "bold" }}>
          Thông tin cơ bản
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}
        >
          <Box>{"Họ và tên: " + infoUser.username}</Box>
          <Box>{"Vị trí: " + role[0].name}</Box>
          <Box>{"Trường: " + school[0].name}</Box>
        </Box>
      </Card>

      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          padding: "20px",
        }}
      >
        <Box
          sx={{ fontSize: "20px", fontWeight: "bold", paddingBottom: "20px" }}
        >
          Các câu hỏi đã lưu
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {info && info.bookmark && info.bookmark.length > 0
            ? info.bookmark.map((item, index) => {
                return (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <QuestionCard item={item} />
                  </Grid>
                );
              })
            : null}
        </Grid>
      </Card>

      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          padding: "20px",
        }}
      >
        <Box
          sx={{ fontSize: "20px", fontWeight: "bold", paddingBottom: "20px" }}
        >
          Các câu hỏi và bài viết đã đăng
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {info && info.posts && info.posts.length > 0
            ? info.posts.map((item, index) => {
                console.log(info.posts);
                return (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <QuestionCard item={item} />
                  </Grid>
                );
              })
            : null}
        </Grid>
      </Card>
    </Box>
  );
};

export default Profile;
