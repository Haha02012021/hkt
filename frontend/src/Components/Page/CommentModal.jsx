import { useRef } from "react";

import {
  Avatar,
  Button,
  Divider,
  FormControl,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

const styles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    overflowY: "scroll",
    overflowX: "hidden",
    display: "block",
    maxHeight: "70vh",
    borderRadius: "7px",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  image: {
    width: "2rem",
    height: "2rem",
    marginRight: "10px",
  },
  modalHeader: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    position: "sticky",
    top: "0",
    width: "100%",
    zIndex: "10000",
    borderBottom: "1px solid rgb(239,239,239)",
  },
  commentsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  comment: {
    width: "100%",
    padding: "10px",
    display: "flex",
  },
  commentDetail: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  modalFooter: {
    backgroundColor: "white",
    borderTop: "1px solid rgb(239,239,239)",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    position: "sticky",
    bottom: "-1px",
  },
  form: {
    width: "100%",
    display: "relative",
  },
  submitButton: {
    position: "absolute",
    right: "5px",
    top: "15px",
    fontWeight: "600",
  },
};

const CommentModal = ({ open, onClose, post_id }) => {
  const input = useRef(null);

  const data = [
    {
      id: 1,
      user_id: 1,
      post_id: 1,
      content: "111111111",
      parent_id: null,
      created_at: "2022-10-07T17:06:48.000000Z",
      updated_at: "2022-10-07T17:06:48.000000Z",
      all_childs: [
        {
          id: 2,
          user_id: 1,
          post_id: 1,
          content: "2222222222222",
          parent_id: 1,
          created_at: "2022-10-07T17:07:06.000000Z",
          updated_at: "2022-10-07T17:07:06.000000Z",
          all_childs: [
            {
              id: 3,
              user_id: 1,
              post_id: 1,
              content: "333333333",
              parent_id: 2,
              created_at: "2022-10-07T17:07:20.000000Z",
              updated_at: "2022-10-07T17:07:20.000000Z",
              all_childs: [],
              user: {
                id: 1,
                username: "bach",
                email: "123@gmail.com",
                email_verified_at: null,
                school: "vnu",
                role: 0,
                avatar: null,
                level_id: 3,
                class_id: null,
                created_at: "2022-10-07T10:05:44.000000Z",
                updated_at: "2022-10-07T10:05:44.000000Z",
              },
            },
          ],
          user: {
            id: 1,
            username: "bach",
            email: "123@gmail.com",
            email_verified_at: null,
            school: "vnu",
            role: 0,
            avatar: null,
            level_id: 3,
            class_id: null,
            created_at: "2022-10-07T10:05:44.000000Z",
            updated_at: "2022-10-07T10:05:44.000000Z",
          },
        },
        {
          id: 2,
          user_id: 1,
          post_id: 1,
          content: "2222222222222",
          parent_id: 1,
          created_at: "2022-10-07T17:07:06.000000Z",
          updated_at: "2022-10-07T17:07:06.000000Z",
          all_childs: [
            {
              id: 3,
              user_id: 1,
              post_id: 1,
              content: "333333333",
              parent_id: 2,
              created_at: "2022-10-07T17:07:20.000000Z",
              updated_at: "2022-10-07T17:07:20.000000Z",
              all_childs: [],
              user: {
                id: 1,
                username: "bach",
                email: "123@gmail.com",
                email_verified_at: null,
                school: "vnu",
                role: 0,
                avatar: null,
                level_id: 3,
                class_id: null,
                created_at: "2022-10-07T10:05:44.000000Z",
                updated_at: "2022-10-07T10:05:44.000000Z",
              },
            },
          ],
          user: {
            id: 1,
            username: "bach",
            email: "123@gmail.com",
            email_verified_at: null,
            school: "vnu",
            role: 0,
            avatar: null,
            level_id: 3,
            class_id: null,
            created_at: "2022-10-07T10:05:44.000000Z",
            updated_at: "2022-10-07T10:05:44.000000Z",
          },
        },
      ],
      user: {
        id: 1,
        username: "bach",
        email: "123@gmail.com",
        email_verified_at: null,
        school: "vnu",
        role: 0,
        avatar: null,
        level_id: 3,
        class_id: null,
        created_at: "2022-10-07T10:05:44.000000Z",
        updated_at: "2022-10-07T10:05:44.000000Z",
      },
    },
    {
      id: 3,
      user_id: 1,
      post_id: 1,
      content: "333333333",
      parent_id: 2,
      created_at: "2022-10-07T17:07:20.000000Z",
      updated_at: "2022-10-07T17:07:20.000000Z",
      all_childs: [
        {
          id: 3,
          user_id: 1,
          post_id: 1,
          content:
            "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
          parent_id: 2,
          created_at: "2022-10-07T17:07:20.000000Z",
          updated_at: "2022-10-07T17:07:20.000000Z",
          all_childs: [],
          user: {
            id: 1,
            username: "bach",
            email: "123@gmail.com",
            email_verified_at: null,
            school: "vnu",
            role: 0,
            avatar: null,
            level_id: 3,
            class_id: null,
            created_at: "2022-10-07T10:05:44.000000Z",
            updated_at: "2022-10-07T10:05:44.000000Z",
          },
        },
      ],
      user: {
        id: 1,
        username: "bach",
        email: "123@gmail.com",
        email_verified_at: null,
        school: "vnu",
        role: 0,
        avatar: null,
        level_id: 3,
        class_id: null,
        created_at: "2022-10-07T10:05:44.000000Z",
        updated_at: "2022-10-07T10:05:44.000000Z",
      },
    },
    {
      id: 3,
      user_id: 1,
      post_id: 1,
      content:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
      parent_id: 2,
      created_at: "2022-10-07T17:07:20.000000Z",
      updated_at: "2022-10-07T17:07:20.000000Z",
      all_childs: [],
      user: {
        id: 1,
        username: "bach",
        email: "123@gmail.com",
        email_verified_at: null,
        school: "vnu",
        role: 0,
        avatar: null,
        level_id: 3,
        class_id: null,
        created_at: "2022-10-07T10:05:44.000000Z",
        updated_at: "2022-10-07T10:05:44.000000Z",
      },
    },
    {
      id: 3,
      user_id: 1,
      post_id: 1,
      content:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
      parent_id: 2,
      created_at: "2022-10-07T17:07:20.000000Z",
      updated_at: "2022-10-07T17:07:20.000000Z",
      all_childs: [],
      user: {
        id: 1,
        username: "bach",
        email: "123@gmail.com",
        email_verified_at: null,
        school: "vnu",
        role: 0,
        avatar: null,
        level_id: 3,
        class_id: null,
        created_at: "2022-10-07T10:05:44.000000Z",
        updated_at: "2022-10-07T10:05:44.000000Z",
      },
    },
    {
      id: 3,
      user_id: 1,
      post_id: 1,
      content:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
      parent_id: 2,
      created_at: "2022-10-07T17:07:20.000000Z",
      updated_at: "2022-10-07T17:07:20.000000Z",
      all_childs: [],
      user: {
        id: 1,
        username: "bach",
        email: "123@gmail.com",
        email_verified_at: null,
        school: "vnu",
        role: 0,
        avatar: null,
        level_id: 3,
        class_id: null,
        created_at: "2022-10-07T10:05:44.000000Z",
        updated_at: "2022-10-07T10:05:44.000000Z",
      },
    },
    {
      id: 3,
      user_id: 1,
      post_id: 1,
      content:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
      parent_id: 2,
      created_at: "2022-10-07T17:07:20.000000Z",
      updated_at: "2022-10-07T17:07:20.000000Z",
      all_childs: [],
      user: {
        id: 1,
        username: "bach",
        email: "123@gmail.com",
        email_verified_at: null,
        school: "vnu",
        role: 0,
        avatar: null,
        level_id: 3,
        class_id: null,
        created_at: "2022-10-07T10:05:44.000000Z",
        updated_at: "2022-10-07T10:05:44.000000Z",
      },
    },
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modal}>
        <Box sx={styles.modalHeader}>
          <Avatar sx={styles.image} />
          <Typography variant="body2">
            <b>username</b> ・ {"September 2022"}
          </Typography>
        </Box>
        <Box sx={styles.commentsContainer}>
          {data.map(({ content, updated_at, all_childs, user }, i) => (
            <Comment
              key={i}
              content={content}
              updated_at={updated_at}
              all_childs={all_childs}
              user={user}
            />
          ))}
        </Box>
        <Box sx={styles.modalFooter}>
          <Box>
            <IconButton>
              <FavoriteBorderIcon fontSize="medium" />
            </IconButton>
            <IconButton>
              <FavoriteIcon fontSize="medium" color="error" />
            </IconButton>
            <IconButton
              onClick={() => {
                console.log(input);
                input.current.focus();
              }}
            >
              <CommentIcon fontSize="medium" />
            </IconButton>
          </Box>
          <Divider sx={{ marginBottom: "1px solid gray" }} />
          <FormControl sx={styles.form}>
            <TextField
              ref={input}
              variant="standard"
              label="Add a comment..."
              multiline
              inputProps={{ style: { fontSize: "0.9rem" } }}
              sx={{
                height: "3rem",
                paddingRight: "70px",
                overflowY: "scroll",
                marginTop: "10px",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            />
            <Button sx={styles.submitButton}>Post</Button>
          </FormControl>
        </Box>
      </Box>
    </Modal>
  );
};

const Comment = ({
  id,
  user_id,
  post_id,
  content,
  parent_id,
  created_at,
  updated_at,
  all_childs,
  user,
}) => {
  return (
    <Box sx={styles.comment}>
      <Avatar sx={styles.image} />
      <Box sx={styles.commentDetail}>
        <Typography variant="body2">
          <b>{user.username}</b> &nbsp;{" "}
          <i sx={{ color: "rgb(142, 142, 142)" }}>
            {new Date(updated_at).toUTCString()}
          </i>
        </Typography>
        <Typography variant="body2"> {content}</Typography>
        {all_childs.map((item, i) => {
          return (
            <Comment
              key={i}
              content={item.content}
              updated_at={item.updated_at}
              all_childs={item.all_childs}
              user={item.user}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default CommentModal;
