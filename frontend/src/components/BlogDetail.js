import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const BlogDetail = () => {
  const navigate = useNavigate()
  const id = useParams().id;
  console.log(id);
  const [blog, setBlog] = useState();
  const [input, setInput] = useState();

  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:8000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
     sendRequest().then((data) => console.log(data)).then(()=>navigate('/myBlogs/'))
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInput({
        title: data.blog.title,
        description: data.blog.description,
        // imageURL: data.blog.image,
      });
    });
  }, [id]);
  // console.log(blog);

  const sendRequest = async () => {
    const res = axios
      .put(`http://localhost:8000/api/blog/update/${id}`, {
        title: input.title,
        description: input.description,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  return (
    <div>
      {input && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"auto"}
            marginTop={3}
            display="flex"
            flexDirection={"column"}
            width={"80%"}
          >
            <Typography
              fontWeight={"bold"}
              padding={3}
              color="grey"
              variant="h2"
              textAlign={"center"}
            >
              Post Your Blog
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              value={input.title}
              name="title"
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              value={input.description}
              name="description"
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            {/* <InputLabel sx={labelStyles}>ImageURL</InputLabel>
            <TextField
              value={input.imageURL}
              name="imageURL"
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            /> */}
            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
