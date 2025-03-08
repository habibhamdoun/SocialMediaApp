import getTimeAgo from "./getTime"
import "../../styles/post-header.css"

export default function PostHeader (props){
    const posts = props.posts
    const display = posts.map(post => {
        return (
            <header key={post.id}>
                <img className="pfp" src={post.profilePic} alt={`${post.username}'s profile picture`} />
                <div className="details">
                    <p>{post.username}</p>
                    <small>{getTimeAgo(post.timestamp)}</small>
                </div>   
            </header>
        )
    })
    return(
        <>
        {display}
        </>
    )
}