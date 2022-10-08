import React from "react";
import { Avatar, Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import Axios from "../../config/axios";
import { useSelector } from "react-redux";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        position: "relative",
    },
    classSelector: {
        width: "14rem",
        justifySelf: "left"
    },
    excerciseContainer: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "800px",
        width: "100%",
    },
    excercise: {
        padding: "5px",
        display: "flex",
        ":not(:last-child)": {
            borderBottom: "0.5px solid rgb(0,0,0,0.2)"
        },
        margin: "0 21px",
        ":hover": {
            boxShadow: "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
            borderRadius: "0.5rem",
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            overflow: "hidden",
            cursor: "pointer"
        }
    },
    excerciseIcon: {
        marginRight: "10px"
    },
    excerciseAvatar: {},
    excerciseContent: {
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        fontWeight: 400
    }
}

const NotTurnedIn = () => {
    const [selectedClass, setSelectedClass] = React.useState('');
    const userInfo = useSelector((state) => state.user.infoUser);

    useEffect(() => {
        const init = async () => {
            try {
                const res = await Axios.get(`/api/class/get-by-user-id/${userInfo.id}`);
                console.log(res);
            } catch (error) {
                console.log("GET class by id ERROR", error)
            }
        }
        init()
    }, [])

    const handleSelectChange = (event) => {
        setSelectedClass(event.target.value);
    };
    return (
        <Box sx={styles.container}>
            <FormControl sx={styles.classSelector}>
                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedClass}
                    label="Class"
                    onChange={handleSelectChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>

            <Box sx={styles.excerciseContainer} >
                <Stack spacing={0}>
                    {[1, 2, 3, 4].map((excercise, index) =>
                        <Box sx={styles.excercise}>
                            <Box sx={styles.excerciseIcon}>
                                <Avatar src="https://www.w3schools.com/howto/img_avatar.png" sx={styles.excerciseAvatar}></Avatar>
                            </Box>
                            <Box sx={styles.excerciseContent}>
                                <Typography>The excercise title</Typography>
                                <Typography variant="body2" sx={{ mb: "10px" }}>Classroom Name</Typography>
                                <Typography variant="body2" sx={{ letterSpacing: 0.6 }}>Posted Wed, 20 july, 2018</Typography>
                                <Box
                                    sx={{
                                        marginTop: "10px",
                                        border: "1px solid gray",
                                        width: "200px",
                                        height: "50px",
                                        borderRadius: "10px",
                                        marginBottom: "10px",
                                        "&:hover": {
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                                    <Box sx={{ display: "flex", gap: "5px", padding: "5px 0 0 10px" }}>
                                        <TextSnippetIcon sx={{ fontSize: "40px", color: "gray" }} />
                                        <Box sx={{ fontWeight: "bold", fontSize: "14px" }}>Name</Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Stack>
            </Box>
        </Box>
    );
};

export default NotTurnedIn;
