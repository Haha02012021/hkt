import React from "react";
import { Box, Container, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect } from "react";
import Axios from "../../config/axios";
import { useSelector } from "react-redux";

const styles = {
    classSelector: {
        width: "14rem",
        justifySelf: "left"
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
        <Container maxWidth="md">
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
        </Container>
    );
};

export default NotTurnedIn;
