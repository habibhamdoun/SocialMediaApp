import pfp1 from "../../testData/pfp icon.jpg"
import "../../styles/content.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"
import { faComment } from "@fortawesome/free-regular-svg-icons"
import { useState } from "react"

export default function Content ({posts,updatePost}){
    const [selectedPost, setSelectedPost] = useState(null)

    const handleComment = (event , postId)=>{
        event.preventDefault()
        const form = event.target
        const comment = form.elements["added-comments"].value.trim()

        if(!comment) return

        postId = Number(postId)
        updatePost(prevPost =>
            prevPost.map(post =>
                post.id === postId? {...post , comments: [...post.comments , {
                    username: "Test",
                    profilePic: pfp1 ,
                    comment : comment , 
                    likes : 0,
                    reply: []
                }]} : post
            )
        ) 
        form.reset()
        comment.blur()
    }


    function handleClick (event){
        if(event.currentTarget.dataset.like){
           const postId = Number (event.currentTarget.dataset.like)
           updatePost(prevPost =>
            prevPost.map(post =>
                post.id === postId ? {
                    ...post, 
                    isLiked: !post.isLiked,
                    likes: post.isLiked? post.likes-1 : post.likes+1 
                }: post
            )
           )
            
        }
        if(event.currentTarget.dataset.comment){
            const postId = Number (event.currentTarget.dataset.comment)
            setSelectedPost(postId)
        }
    }

    function closeCommentWindow(){
        setSelectedPost(null)
    }

    
    const display = posts.map(post => {
        return (
            <section key={post.id}>
                <img src={post.imageUrl} alt={`${post.username}'s post`} />
                <div className="buttons">
                    <button  alt="like button" className="post-button"  data-like ={post.id} onClick={handleClick}>
                        <FontAwesomeIcon className="icon" icon = {!post.isLiked? faHeartRegular : faHeartSolid} />
                    </button>

                    <button  alt="like button" className="post-button"  data-comment ={post.id} onClick={handleClick}>
                        <FontAwesomeIcon className="icon" icon={faComment} />
                    </button>
                </div>
                <p>{post.likes} {post.likes === 1? "like": "likes"}</p>
                <p><span>{post.username}</span> {post.caption}</p>
                <p>View all {post.comments.length} {post.comments.length ===1 ? "comment": "comments"}</p>

                <form onSubmit={event => handleComment(event, post.id)}>
                    <input className="comment" type="text" name="added-comments" placeholder="Add a comment..." />
                </form>
                
            </section>
        )
    })
    return (
        <main>
            {display}
            {selectedPost !== null && (
                <section className="comment-window">
                    <article className="comment-content">
                        <button className="close-button" onClick={closeCommentWindow}>×</button>
                        <h3>Comments</h3>
                        {posts.find(post => post.id === selectedPost)?.comments.map((comment, index) => (
                            <div key={index} className="comment-item">
                                <img src={comment.profilePic} alt="Profile" className="comment-pic" />
                                <div>
                                    <p><strong>{comment.username}</strong></p>
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                        ))}
                    </article>
                </section>
            )}
        </main>
    )
}