import pfp1 from "./pfp icon.jpg"
import Image from "./Image.png"
import pfp2 from "./pfp2.jpg"
import pfp3 from "./pfp3.jpg"

const post = [
    {
      id: 1,
      username: "travel_junkie",
      profilePic: pfp1,
      imageUrl: Image,
      caption: "Exploring the mountains! #adventure #hiking",
      likes: 1024,
      isLiked: false,
      comments: [
        { 
          username: "nature_lover", 
          profilePic: pfp2 , 
          comment: "Wow! Looks amazing!" , 
          likes: 82, 
          reply:[
            {username: "hiker101", profilePic: pfp3, comment: "Where is this?", likes: 15, isLiked: false, timestamp: "2025-03-03T14:00:00Z"}
          ], 
          timestamp: "2025-03-03T12:45:00Z" 
        },
        { 
          username: "outdoor_fan", 
          profilePic: pfp3 , 
          comment: "I want to go there!", 
          likes: 59, 
          isLiked: false,
          reply:[],
          timestamp: "2025-03-03T13:10:00Z" 
        }
      ],
      timestamp: "2025-03-03T12:30:00Z"
    }
  ]
  
  export default post;