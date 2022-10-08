import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Select from "react-select";
import { SELECTTAGS } from "../../config/constants";
import { handleSearchApi } from "../../Services/app";
import SearchCard from "../../Components/Page/SearchCard";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    position: "relative",
    zIndex: "1",
    overflow: "visible!important",
  },
};
const Search = () => {
  const [tagIds, setTagIds] = useState([]);
  const [script, setScript] = useState();
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState(0);

  const handleChange = (selected, name) => {
    const ids = selected.map((s) => s.value);
    setTagIds(ids);
  };

  const handleSearch = async () => {
    const data = { tagId: tagIds, searchValue: script, type: 1, page: page };
    const res = await handleSearchApi(data);
    if (res && res.statusCode === 0) {
      setResults(res.data.data);
      const count =
        res.data.total % 10 === 0
          ? parseInt(res.data.total / 10)
          : parseInt(res.data.total / 10) + 1;
      setCountPage(count);
    }
  };

  const changePage = (e, page) => { };

  useEffect(() => {
    handleSearch();
  }, [page]);

  return (
    <Box sx={styles.container}>
      <Card
        sx={{
          position: "relative",
          marginBottom: "20px",
          padding: "0px",
          width: "100%",
          overflow: "visible!important",
        }}
      >
        <Typography
          component="h2"
          variant="h5"
          style={{ textAlign: "left", padding: "20px 0 0 20px" }}
        >
          Tìm kiếm các vấn đề tại đây
        </Typography>

        <Grid container sx={{ marginLeft: "20px" }}>
          <Box sx={{ marginRight: "10px", minWidth: "140px" }}>
            <Select
              defaultValue={[]}
              isMulti
              name="colors"
              id="tags"
              options={SELECTTAGS}
              className="basic-multi-select"
              onChange={handleChange}
              classNamePrefix="select"
            />
          </Box>
          <Grid
            item
            xs={4}
            sx={{
              height: "40px",
              border: "1px solid #cccccc",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              marginRight: "20px",
            }}
          >
            <SearchIcon sx={{ marginLeft: "10px", color: "#cccccc" }} />
            <input
              type="text"
              style={{
                border: "none",
                outline: "none",
                height: "100%",
                width: "80%",
              }}
              onChange={(e) => setScript(e.target.value)}
            />
          </Grid>
        </Grid>

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
            onClick={() => handleSearch()}
          >
            Tìm kiếm
          </Box>
        </CardContent>
      </Card>

      <Card
        sx={{
          position: "relative",
          marginBottom: "20px",
          padding: "0px",
          width: "100%",
          overflow: "visible!important",
        }}
      >
        <Box sx={{ fontSize: "26px", fontWeight: "bold", padding: "5px 0" }}>
          Kết quả tìm kiếm
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginLeft: "20px",
            marginBottom: "20px",
          }}
        >
          {results.length > 0
            ? results.map((result) => {
              console.log(result.content);
              return <SearchCard item={result} />;
            })
            : null}
        </Box>

        {countPage && countPage > 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Pagination
              count={countPage}
              page={page}
              onChange={(event, page) => setPage(page)}
            />
          </Box>
        ) : null}
      </Card>
    </Box>
  );
};

export default Search;
