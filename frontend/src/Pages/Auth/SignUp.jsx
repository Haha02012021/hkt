import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as actions from "../../Store/Actions/index";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { ROLES, SCHOOLS, LEVELS } from "../../config/constants";

const theme = createTheme();

export default function SignUp() {
  const [selectedRole, setSelectedRole] = useState(ROLES[0].id);
  const [selectedSchool, setSelectedSchool] = useState(SCHOOLS[0].id);
  const [selectedLevel, setSelectedLevel] = useState(LEVELS[0].id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("password") + " " + data.get("confirmPassword"));
    if (data.get("password") === data.get("confirmPassword")) {
      const res = await dispatch(
        actions.userSignUp({
          email: data.get("email"),
          password: data.get("password"),
          username: data.get("username"),
          school: selectedSchool,
          level_id: selectedLevel,
          role: selectedRole,
        })
      );
      if (res === true) navigate("/");
    } else {
      toast.error("Sign Up error");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <FormControl sx={{ mt: 1, textAlign: "left", minWidth: 182 }}>
                <InputLabel id="role">Role</InputLabel>
                <Select
                  fullWidth
                  required
                  labelId="role"
                  id="role"
                  value={selectedRole}
                  label="Role"
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  {ROLES.map((role) => (
                    <MenuItem value={role.id}>{role.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                sx={{
                  mt: 1,
                  textAlign: "left",
                  minWidth: 182,
                  maxWidth: 300,
                }}
              >
                <InputLabel id="level">Levels</InputLabel>
                <Select
                  fullWidth
                  required
                  labelId="level"
                  id="school"
                  value={selectedLevel}
                  label="Role"
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  {LEVELS.map((role) => (
                    <MenuItem value={role.id}>{role.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <FormControl
              fullWidth
              sx={{
                mt: 1,
                textAlign: "left",
              }}
            >
              <InputLabel id="school">School</InputLabel>
              <Select
                fullWidth
                required
                labelId="school"
                id="school"
                value={selectedSchool}
                label="Role"
                onChange={(e) => setSelectedSchool(e.target.value)}
              >
                {SCHOOLS.map((role) => (
                  <MenuItem value={role.id}>{role.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Box
              sx={{ display: "flex" }}
              justifyContent={"space-between"}
              flexDirection="row"
            >
              <Link href="#" variant="body2">
                Forgot password?
              </Link>

              <Link to="/login" variant="body2">
                {"You have an account? Login"}
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
