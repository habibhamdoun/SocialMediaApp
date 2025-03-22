import getTimeAgo from "./getTime"

export default function PostHeader(props) {
    const posts = props.posts
    const display = posts.map(post => {
        return (
            <header key={post.id} className="flex items-center gap-4 mb-5">
                <img 
                    className="w-10 h-10 rounded-full" 
                    src={post.profilePic} 
                    alt={`${post.username}'s profile picture`} 
                />
                <div className="flex items-center gap-1">
                    <p>{post.username}</p>
                    <small>{getTimeAgo(post.timestamp)}</small>
                </div>  
            </header>
        )
    })
    return (
        <>
        {display}
        </>
    )
}