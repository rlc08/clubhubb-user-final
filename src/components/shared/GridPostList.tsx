// GridPostList.tsx
 import React from 'react';
import { Link } from 'react-router-dom';

type Post = {
  imageUrl: string;
  eventName: string;
  eventId:string;
};

type GridPostListProps = {
  posts: Post[];
  
};

const GridPostList: React.FC<GridPostListProps> = ({ posts}) => {
  console.log(posts)
  console.log("posts")
  return (
    <div className="mb-10" style={{textAlign:"center"}}>
      {posts.map(post => (
        
        <div key={post.imageUrl} className="relative min-w-full h-full  md:h-80 "  >
                <Link
                 to={`/posts/${post.eventId}`}>

          <img src={post.imageUrl} alt={post.eventName} className='h-full w-full object-cover rounded-2xl' />
          </Link>
          <p style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '10px' }}>{post.eventName}</p>
        </div>
      ))}
    </div>
  );
};

export default GridPostList;
