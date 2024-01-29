import { Link } from "react-router-dom";
 

type EventPoster = {
  publicId: string;
  secureUrl: string;
};

type  Timings={
  startTime:string,
  endTime:string,
}
type Document = {
   eventName: string;
  timings:Timings;
   _id: string;
  eventPoster: EventPoster;
};

type PostCardProps = {
  post: Document;
};

type DateTimeFormatOptions = {
  weekday?: 'short' | 'long' | 'narrow';
  day?: 'numeric' | '2-digit';
  month?: 'short' | 'long' | 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  hour12?: boolean;
};


const PostCard = (props: PostCardProps) => {
  const { post } = props;
  console.log(post)
  console.log(post.timings.startTime)
  
  const formatDateTime = (dateTimeString?: string) => {
    if (!dateTimeString) {
      return ''; // or some default value if needed
    }
    const options:DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const dateTime = new Date(dateTimeString);
    const formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(dateTime);

    return formattedDateTime;
  };

  return (
    <div className="post-card">
     <Link to={`/posts/${post._id}`}>
        <img
          src={post.eventPoster.secureUrl}
          className="post-card_img"
          alt="post image"
        />
      </Link>
      <div className="flex-between">
        <div className="flex items-center pl-3">
          <div className="text-left w-full">
            <div className="h3-bold">
              <h3>{post.eventName}</h3>
 
            </div>
            <div>
              <p>On {formatDateTime(post.timings.startTime)}</p>
            </div>
          </div>
        </div>
         
      </div>
    </div>
  );
};

export default PostCard;
