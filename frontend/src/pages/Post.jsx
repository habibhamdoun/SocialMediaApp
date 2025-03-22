import PostHeader from "../components/Posts/PostHeader.jsx";
import Content from "../components/Posts/Content.jsx";
import { useState } from "react";
import post from "../../src/testData/post.js";
import { Container, Box } from "@mui/material";

export default function Post() {
  const [postData, setPostData] = useState([...post]);

  return (
    <Box
      sx={{
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
      }}
    >
      <Container maxWidth="sm" className="max-w-xl  border border-white bg-black text-white p-4">
        <PostHeader posts={postData} />
        <Content posts={postData} updatePost={setPostData} />
      </Container>
    </Box>
  );
}