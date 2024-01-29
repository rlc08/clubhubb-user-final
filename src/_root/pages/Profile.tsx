import {  Outlet} from "react-router-dom";

 import GridPostList from "../../components/shared/GridPostList";
import { useUserContext } from "@/context/useUserContext";
import { useGetEventByIdsMutation } from "@/store/api/eventApi";
import { useEffect, useState } from "react";
type Post={
  imageUrl:string;
  eventName:string;
  eventId:string;
}

type EventType = {
  eventPoster: {
    secureUrl: string;
    // Add other properties if necessary
  };
  eventName: string;
  _id:string;
  // Add other properties if necessary
};
  
const Profile = () => {
  const { user } = useUserContext();
  const [GetEventByIds] = useGetEventByIdsMutation();
  const [posts, setPosts] = useState<Post[]>([]);


 
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Error: Token not found");
      } else {
        const events = await GetEventByIds({ token });
        if ('data' in events) {
          console.log(events.data);
  
          // Update post state based on fetched data
          const updatedPosts = events.data.map((event:EventType)=> ({
            imageUrl: event.eventPoster.secureUrl,
            eventName: event.eventName,
            eventId:event._id,
          }));
  
          setPosts(updatedPosts); // Pass the array directly, not wrapped in an object
        }
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  

  // Call the fetchData function when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures it runs only once

  console.log(posts);


    return (
        <div className="profile-container">
            <div className="profile-inner_container">
                <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
                    <img
                        src={"/public/assets/images/profile.png"}
                        alt="profile"
                        className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
                    />
                    <div className="flex flex-col flex-1 justify-between md:mt-2">
                        <div className="flex flex-col w-full">
                            <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                                {user.name}
                            </h1>
                            <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                                @{user.username}
                            </p>
                        </div>

                      

                        <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
                            {user.collegeName}
                        </p>
                    </div>

                     
                </div>
            </div>
            <div className="m-5 md:flex gap-7">

            {posts.map(post => (
              <GridPostList key={post.imageUrl} posts={[post]} />
              ))}
              </div>
 
             <Outlet />
        </div>
    );
};

export default Profile;
