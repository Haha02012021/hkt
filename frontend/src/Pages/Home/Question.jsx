import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Pagination,
  CircularProgress,
  Grid,
} from "@mui/material";
import React, { useEffect } from "react";

import QuestionCard from "../../Components/Page/QuestionCard";
import ModalPostQuestion from "../../Components/Page/ModalPostQuestion";
import { useState } from "react";
import { handleGetPostApi } from "../../Services/app";
import { toast } from "react-toastify";

const styles = {
  postContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    position: "relative",
  },
  addButtonContainer: {
    position: "absolute",
    right: "20px",
    height: "100%",
  },
  createModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  },
};

const Question = () => {
  const [loading, setLoading] = useState(false);
  const [createQuestionModalOpen, setCreateQuestionModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countPage, setCountPage] = useState(10);
  const [listQuestions, setListQuestions] = useState([]);
  const [newBlob, setNewBlob] = useState(false);

  const setNewBlobHandle = () => {
    setNewBlob(!newBlob);
  };

  useEffect(() => {
    const getQuestions = async () => {
      try {
        setLoading(true);
        const res = await handleGetPostApi(1, currentPage);
        if (res && res.statusCode === 0) {
          const data = res.data.data;
          data.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });
          setListQuestions(data);
          const count =
            res.data.total % 10 === 0
              ? parseInt(res.data.total / 10)
              : parseInt(res.data.total / 10) + 1;
          setCountPage(count);
        }
      } catch (error) {
        console.log("GetQuestionsError", error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getQuestions();
  }, [currentPage, newBlob]);

  return (
    <Box sx={styles.postContainer}>
      <Card
        sx={{
          position: "relative",
          marginBottom: "20px",
          padding: "0px",
          width: "100%",
        }}
      >
        <Typography
          component="h2"
          variant="h5"
          style={{ textAlign: "left", padding: "20px 0 0 20px" }}
        >
          Đặt câu hỏi để nhận được sự giúp đỡ
        </Typography>

        <CardContent
          sx={{
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            width: "140px",
          }}
        >
          <Box
            sx={{
              padding: "5px",
              flexGrow: 1,
              paddingLeft: "10px",
              transition: "all 0.1s ease-in-out",
              backgroundColor: "#0a95ff",
              color: "white",
              width: "120px",
              "&:hover": {
                backgroundColor: "#0074cc",
                cursor: "pointer",
              },
            }}
            onClick={() => setCreateQuestionModalOpen(true)}
          >
            Tạo câu hỏi
          </Box>
        </CardContent>
      </Card>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {listQuestions && listQuestions.length > 0
          ? listQuestions.map((item, index) => {
              return (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <QuestionCard item={item} />
                </Grid>
              );
            })
          : null}
      </Grid>

      {loading && (
        <CircularProgress
          thickness={5}
          size={25}
          color="primary"
          sx={{
            height: "20px",
            width: "20px",
            marginTop: "20px",
          }}
        />
      )}

      {listQuestions && listQuestions.length ? (
        <Pagination
          count={countPage}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
        />
      ) : null}

      <ModalPostQuestion
        open={createQuestionModalOpen}
        onClose={setCreateQuestionModalOpen}
        handleClose={() => setCreateQuestionModalOpen(false)}
        setNewBlob={setNewBlobHandle}
      />
    </Box>
  );
};

export default Question;
