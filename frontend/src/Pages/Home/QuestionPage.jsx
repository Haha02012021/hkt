import {
  Box,
  Card,
  CardContent,
  Typography,
  CardHeader,
  CircularProgress,
  Grid,
  Button,
  Avatar,
  Divider,
  IconButton,
  CardActions,
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";

import ModalPostQuestion from "../../Components/Page/ModalPostQuestion";
import { useState } from "react";
import {
  handleGetPostByIdApi,
  handleLikePostApi,
  handleCompleteQuestionApi,
} from "../../Services/app";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "react-toastify";
import CommentModal from "../../Components/Page/CommentModal";

import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckIcon from "@mui/icons-material/Check";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import CommentIcon from "@mui/icons-material/Comment";
import { useSelector } from "react-redux";
import QuestionCard from "../../Components/Page/QuestionCard";
import Axios from "../../config/axios"

dayjs.extend(relativeTime);
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
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
    padding: "5px",
  },
  image: {
    width: "2rem",
    height: "2rem",
  },
  content: {
    padding: "20px 7px",
    textAlign: "left",
    "&:hover": { cursor: "pointer" },
  },
  actions: {
    padding: "10px",
    textAlign: "left",
    display: "flex",
  },
  header: {
    textAlign: "left",
    fontSize: "30px!important",
    fontWeight: "bold!important",
    position: "relative",
  },
  tag: {
    cursor: "pointer",
    color: "gray",
    wordWrap: "none",
    backgroundColor: "#e1ecf4",
    borderRadius: "4px",
    padding: "4px",
    height: "32px",
    "&:hover": {
      backgroundColor: "#bfdff7",
    },
  },
};

const QuestionPage = () => {
  const [loading, setLoading] = useState(false);
  const [createQuestionModalOpen, setCreateQuestionModalOpen] = useState(false);
  const [blog, setBlog] = useState({});
  const [newBlob, setNewBlob] = useState(false);
  const { id } = useParams();
  const userInfo = useSelector((state) => state.user.infoUser);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const openCommentModal = () => setCommentModalOpen(true);
  const closeCommentModal = () => setCommentModalOpen(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const setNewBlobHandle = () => {
    setNewBlob(!newBlob);
  };

  const toggleCompleteQuestion = async () => {
    try {
      setLoadingComplete(true);
      const res = await handleCompleteQuestionApi(blog.id);
      if (res && res.statusCode === 0) {
        setBlog({ ...blog, completed: res.data.completed });
        toast.success("Success!");
      } else {
        throw new Error("Res not found");
      }
    } catch (error) {
      console.log("TOGGLE COMPLETE QUESTION CARD", error);
      toast.error(error.message);
    } finally {
      setLoadingComplete(false);
    }
  };

  useEffect(() => {
    const getQuestion = async () => {
      try {
        setLoading(true);
        // Get The Post using post id from params
        const res = await handleGetPostByIdApi(0, id);
        if (res && res.statusCode === 0) {
          setBlog(res.data);
        }
        console.log("BLOG", res);

        // Get suggestion for the post type and tags
        if (res.data.has_tags.length > 0) {
          const params = {
            type: res.data.type,
            tagId: res.data.has_tags.map((tag) => tag.id),
          }
          const resSuggestion = await Axios.get(`/api/post/related/`, {
            params
          });
          console.log("RES SUGGESTION", resSuggestion);
          if (resSuggestion && resSuggestion.statusCode === 0) {
            setRelatedPosts(resSuggestion.data.data);
          }
        }

      } catch (error) {
        console.log("GetQuestionsError", error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getQuestion();
  }, [id]);

  const likePost = async () => {
    const value = blog.isLike ? -1 : 1;
    const res = await handleLikePostApi(blog.id, value);

    if (res && res.statusCode === 0) {
      if (blog.isLike === true) setBlog({ ...blog, like: blog.like-- });
      else {
        setBlog({ ...blog, like: blog.like++ });
      }
      setBlog({ ...blog, isLike: !blog.isLike });
    }
  };

  return (
    <Box sx={styles.postContainer}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={2} sm={4} md={8}>
          <Box>
            {blog ? (
              <Card
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "20px",
                  padding: "5px",
                  borderBottom: `5px solid ${blog.completed ? "green" : "red"}`,
                }}
              >
                <CardHeader
                  avatar={<Avatar sx={styles.image} />}
                  title={
                    blog && blog.user && blog.user.username
                      ? blog.user.username
                      : null
                  }
                  subheader={`${dayjs(blog.updated_at).fromNow()}`}
                  sx={styles.header}
                ></CardHeader>
                <Divider />
                <CardContent sx={styles.content}>
                  <Typography variant="body2" sx={{ wordWrap: "break-word" }}>
                    {blog.content}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      gap: "5px",
                    }}
                  >
                    {blog && blog.has_tags && blog.has_tags.length > 0
                      ? blog.has_tags.map((tag, i) => {
                        return (
                          <Box sx={styles.tag} key={i}>
                            {`${tag.name}`}
                          </Box>
                        );
                      })
                      : null}
                  </Box>
                  <Box
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Carousel
                      indicators={false}
                      autoPlay={false}
                      animation="slide"
                      navButtonsAlwaysVisible={true}
                      sx={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      {blog && blog.images && blog.images.length > 0
                        ? blog.images.map((image, i) => (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                            key={i}
                          >
                            <img
                              src={image.link}
                              style={{
                                height: "400px",
                              }}
                            ></img>
                          </div>
                        ))
                        : null}
                    </Carousel>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions disableSpacing sx={styles.actions}>
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => likePost()}
                  >
                    <FavoriteIcon
                      sx={{ color: `${blog.isLike === true ? "red" : null}` }}
                    />
                  </IconButton>
                  <Typography>{blog.like}</Typography>
                  <IconButton aria-label="comment" onClick={openCommentModal}>
                    <CommentIcon />
                  </IconButton>
                  <Typography>{blog.commentCount}</Typography>
                  {blog.completed ? (
                    <IconButton aria-label="completed">
                      <CheckIcon />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton aria-label="uncompleted">
                        <SentimentVeryDissatisfiedIcon />
                      </IconButton>
                    </>
                  )}
                  {userInfo.id === blog.user_id && (
                    <Button
                      onClick={toggleCompleteQuestion}
                      color={blog.completed ? "error" : "success"}
                      sx={{ marginLeft: "auto", fontWeight: 600 }}
                    >
                      {loadingComplete ? (
                        <CircularProgress
                          thickness={5}
                          size={25}
                          sx={{
                            color: blog.completed ? "red" : "green",
                            height: "20px",
                            width: "20px",
                          }}
                        />
                      ) : !blog.completed ? (
                        "Complete"
                      ) : (
                        "Undo"
                      )}
                    </Button>
                  )}
                </CardActions>

                <CommentModal
                  open={commentModalOpen}
                  onClose={closeCommentModal}
                  post={blog}
                />
              </Card>
            ) : null}
          </Box>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Stack spacing={2}>
            <Typography variant="h5">Suggestions</Typography>
            {relatedPosts.map((post, i) => (<QuestionCard item={post} key={i} P />))}
          </Stack>
        </Grid>
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

      <ModalPostQuestion
        open={createQuestionModalOpen}
        onClose={setCreateQuestionModalOpen}
        handleClose={() => setCreateQuestionModalOpen(false)}
        setNewBlob={setNewBlobHandle}
      />
    </Box>
  );
};

export default QuestionPage;
