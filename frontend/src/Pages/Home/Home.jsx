import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Welcom() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={5} style={{ display: "flex", alignItems: "center" }}>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: "800" }}>
              U APP
            </Typography>
            <Typography variant="subtitle1">
              Trang web hỏi đáp tiếng Nhật!
            </Typography>
            <Typography variant="subtitle1">
              Chúc mừng bạn đã trở thành một thành viên của chúng tôi!
            </Typography>
            <div
              style={{
                display: "flex",
                cursor: "pointer",
                justifyContent: "center",
                fontSize: "16px",
                alignItems: "center",
                color: "blue",
              }}
              onClick={() => navigate("/group-class")}
            >
              <Typography variant="subtitle1">
                Vào nhóm học của mình nào
              </Typography>
              <ArrowForwardIosIcon fontSize="16px" />
            </div>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <img
            style={{ display: "block", objectFit: "cover", width: "480px" }}
            src="https://images.shiksha.ws/mediadata/images/articles/126932253.jpg"
          />
        </Grid>
      </Grid>
    </div>
  );
}
