import post from "../../src/testData/post.js";
import {useState} from "react";
import "../styles/post.css"
import PostHeader from "../components/Posts/PostHeader.jsx";
import Content from "../components/Posts/Content.jsx";
import { Container } from "@mui/material";

export default function Post (){
    
     const [postData , setPostData] = useState([...post]);
    return(
        <Container className="container">
            <div>
                <PostHeader posts = {postData}/>
                <Content posts = {postData} updatePost = {setPostData}/>
            </div>
        </Container>
    )
}