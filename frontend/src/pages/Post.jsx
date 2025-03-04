import post from "../../src/testData/post.js";
import React from "react";

export default function Post (){
    console.log(post)
    const [postData , setPostData] = React.useState(post);
    console.log(postData)
    return(
        <h1>Test</h1>
    )
}