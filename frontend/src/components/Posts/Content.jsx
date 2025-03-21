import pfp1 from "../../testData/pfp icon.jpg"
import { useState } from "react"
import { Favorite, FavoriteBorder, ChatBubbleOutline } from "@mui/icons-material"

export default function Content({posts, updatePost}){
    const [selectedPost, setSelectedPost] = useState(null)

    const handleComment = (event, postId) => {
        event.preventDefault()
        const form = event.target
        const comment = form.elements["added-comments"].value.trim()

        if(!comment) return

        postId = Number(postId)
        updatePost(prevPost =>
            prevPost.map(post =>
                post.id === postId ? {...post, comments: [...post.comments, {
                    username: "Test",
                    profilePic: pfp1,
                    comment: comment, 
                    likes: 0,
                    reply: []
                }]} : post
            )
        ) 
        form.reset()
        comment.blur()
    }

    function handleClick(event){
        if(event.currentTarget.dataset.like){
           const postId = Number(event.currentTarget.dataset.like)
           updatePost(prevPost =>
            prevPost.map(post =>
                post.id === postId ? {
                    ...post, 
                    isLiked: !post.isLiked,
                    likes: post.isLiked ? post.likes-1 : post.likes+1 
                } : post
            )
           )
        }
        if(event.currentTarget.dataset.comment){
            const postId = Number(event.currentTarget.dataset.comment)
            setSelectedPost(postId)
        }
    }

    function closeCommentWindow(){
        setSelectedPost(null)
    }

    const display = posts.map(post => {
        return (
            <section key={post.id} className="mb-8">
                <img src={post.imageUrl} alt={`${post.username}'s post`} className="w-full" />
                <div className="flex items-center gap-3 mt-3 mb-4">
                    <div className="mt-3 hover: cursor-pointer" onClick={handleClick} data-like={post.id}>
                        {post.isLiked ? 
                            <Favorite className="text-red-500" fontSize="medium" /> : 
                            <FavoriteBorder fontSize="medium" />
                        }
                    </div>
                        
                    
                    <ChatBubbleOutline fontSize="medium"className="mt-3 hover: cursor-pointer" onClick={handleClick} data-comment={post.id}/>
                    
                </div>
                <p>{post.likes} {post.likes === 1 ? "like" : "likes"}</p>
                <p><span className="font-bold">{post.username}</span> {post.caption}</p>
                <p onClick={handleClick} data-comment = {post.id}
                   className="hover: cursor-pointer"
                >View all {post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}</p>

                <form onSubmit={event => handleComment(event, post.id)} className="w-full">
                    <input 
                        className="w-full outline-none border-none bg-transparent" 
                        type="text" 
                        name="added-comments" 
                        placeholder="Add a comment..." 
                    />
                </form>
            </section>
        )
    })
    
    return (
        <main>
            {display}
            {selectedPost !== null && (
                <section className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-3/5 bg-black shadow-lg rounded-lg p-4 overflow-y-auto z-10">
                    <article className="flex flex-col">
                        <div onClick={closeCommentWindow} className="hover: cursor-pointer self-end">
                            ×
                        </div>
                        <h3 className="text-lg font-bold mb-4">Comments</h3>
                        {posts.find(post => post.id === selectedPost)?.comments.map((comment, index) => (
                            <div key={index} className="flex gap-3 mb-3 p-3 border-b border-gray-700">
                                <img 
                                    src={comment.profilePic} 
                                    alt="Profile" 
                                    className="w-10 h-10 rounded-full" 
                                />
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